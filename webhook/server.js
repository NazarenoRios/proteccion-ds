/**
 * Servidor webhook para recibir eventos de Chromatic en tiempo real
 * Actualiza automáticamente el estado del último build
 * Consulta la API de Chromatic directamente cuando sea necesario
 */

import { createServer } from 'http';
import { writeFileSync, readFileSync, existsSync } from 'fs';

const PORT = process.env.PORT || 3333;
const BUILD_FILE = '.chromatic-last-build.json';
const PROJECT_TOKEN = 'chpt_1481e1a672f4ca1';
const PROJECT_ID = '690b6ad8f793d5704c221f28';

/**
 * Traduce el estado de Chromatic al formato de nuestro sistema
 */
function mapChromaticStatus(chromaticEvent) {
  const { build } = chromaticEvent;

  let reviewStatus = 'PENDING_REVIEW';

  // Determinar el estado de revisión
  if (build.status === 'ACCEPTED' || build.reviewResult === 'ACCEPTED') {
    reviewStatus = 'ACCEPTED';
  } else if (build.status === 'DENIED' || build.reviewResult === 'DENIED') {
    reviewStatus = 'DENIED';
  } else if (build.changeCount === 0) {
    reviewStatus = 'ACCEPTED'; // Sin cambios = auto-aprobado
  }

  return {
    buildNumber: build.number,
    status: build.buildStatus || 'PASSED',
    result: build.result || 'PASSED',
    reviewStatus: reviewStatus,
    webUrl: build.webUrl,
    changeCount: build.changeCount || 0,
    testCount: build.specCount || 0,
    componentCount: build.componentCount || 0,
    storybookUrl: build.storybookUrl,
    lastUpdated: new Date().toISOString(),
    requiresReview: build.changeCount > 0 && reviewStatus === 'PENDING_REVIEW'
  };
}

/**
 * Guarda la información del build
 */
function saveBuildInfo(buildInfo) {
  try {
    writeFileSync(BUILD_FILE, JSON.stringify(buildInfo, null, 2), 'utf8');

    const statusMap = {
      'ACCEPTED': '🟢 APROBADO',
      'DENIED': '🔴 RECHAZADO',
      'PENDING_REVIEW': '🟡 PENDIENTE'
    };

    console.log('\n✅ Build actualizado:');
    console.log(`   Build #${buildInfo.buildNumber}`);
    console.log(`   Estado: ${statusMap[buildInfo.reviewStatus]}`);
    console.log(`   Cambios: ${buildInfo.changeCount}`);
    console.log(`   Timestamp: ${buildInfo.lastUpdated}\n`);

    return true;
  } catch (error) {
    console.error('❌ Error guardando build:', error.message);
    return false;
  }
}

/**
 * Consulta el último build usando el CLI de Chromatic en modo dry-run
 * Este método funciona sin necesidad de autenticación OAuth
 */
async function getLastBuildFromCLI() {
  return new Promise((resolve) => {
    console.log('🔍 Consultando Chromatic CLI en tiempo real...');

    import('child_process').then(({ exec }) => {
      // Ejecutar chromatic con --dry-run para obtener info sin hacer un build real
      const command = `npx chromatic --project-token=${PROJECT_TOKEN} --dry-run --exit-zero-on-changes`;

      exec(command, { timeout: 60000 }, (error, stdout, stderr) => {
        try {
          const output = stdout + stderr;

          // Extraer información del output del CLI
          const buildMatch = output.match(/Build (\d+)/i);
          const urlMatch = output.match(/(https:\/\/www\.chromatic\.com\/build\?[^\s]+)/);
          const statusMatch = output.match(/(passed|failed|pending|denied|accepted)/i);
          const changesMatch = output.match(/(\d+) component/i);

          if (buildMatch) {
            // Determinar el estado de revisión basado en el output
            let reviewStatus = 'PENDING_REVIEW';
            if (output.includes('accepted') || output.includes('no changes')) {
              reviewStatus = 'ACCEPTED';
            } else if (output.includes('denied')) {
              reviewStatus = 'DENIED';
            }

            const buildInfo = {
              buildNumber: parseInt(buildMatch[1]),
              status: statusMatch ? statusMatch[1].toUpperCase() : 'PASSED',
              result: statusMatch ? statusMatch[1].toUpperCase() : 'SUCCESS',
              reviewStatus: reviewStatus,
              webUrl: urlMatch ? urlMatch[1] : `https://www.chromatic.com/builds?appId=${PROJECT_ID}`,
              changeCount: 0, // El CLI no siempre reporta esto en dry-run
              testCount: 0,
              componentCount: changesMatch ? parseInt(changesMatch[1]) : 0,
              storybookUrl: null,
              lastUpdated: new Date().toISOString(),
              requiresReview: reviewStatus === 'PENDING_REVIEW',
              source: 'cli-realtime'
            };

            console.log(`✅ Build #${buildInfo.buildNumber} obtenido del CLI`);

            // Guardar en archivo para cache
            saveBuildInfo(buildInfo);

            resolve(buildInfo);
          } else {
            console.error('❌ No se pudo extraer información del CLI');
            resolve(null);
          }
        } catch (parseError) {
          console.error('❌ Error parseando output del CLI:', parseError.message);
          resolve(null);
        }
      });
    }).catch(err => {
      console.error('❌ Error ejecutando CLI:', err.message);
      resolve(null);
    });
  });
}

/**
 * Maneja las solicitudes HTTP
 */
const server = createServer((req, res) => {
  // Solo aceptar POST en /webhook
  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const event = JSON.parse(body);

        console.log('\n📨 Webhook recibido de Chromatic:');
        console.log(`   Evento: ${event.type || 'build-update'}`);
        console.log(`   Build: #${event.build?.number || 'N/A'}`);

        // Procesar el evento
        if (event.build) {
          const buildInfo = mapChromaticStatus(event);
          const saved = saveBuildInfo(buildInfo);

          if (saved) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Build actualizado' }));
          } else {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Error guardando' }));
          }
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'Evento inválido' }));
        }
      } catch (error) {
        console.error('❌ Error procesando webhook:', error.message);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'JSON inválido' }));
      }
    });
  }
  // Health check endpoint
  else if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      server: 'chromatic-webhook',
      port: PORT,
      buildFile: BUILD_FILE
    }));
  }
  // Get last build endpoint
  else if (req.method === 'GET' && req.url.startsWith('/last-build')) {
    (async () => {
      try {
        // Verificar si se pide forzar consulta a la API
        const url = new URL(req.url, `http://localhost:${PORT}`);
        const forceAPI = url.searchParams.get('force') === 'true';

        let buildData = null;

        // Si se fuerza API o no existe archivo local, consultar CLI en tiempo real
        if (forceAPI || !existsSync(BUILD_FILE)) {
          console.log(forceAPI ? '🔄 Forzando consulta en tiempo real...' : '📭 No hay datos locales, consultando CLI...');
          buildData = await getLastBuildFromCLI();

          if (!buildData) {
            res.writeHead(500, {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({
              success: false,
              message: 'No se pudo obtener datos del CLI de Chromatic'
            }));
            return;
          }
        } else {
          // Leer datos del archivo local
          buildData = JSON.parse(readFileSync(BUILD_FILE, 'utf8'));
          console.log(`📦 Datos del build #${buildData.buildNumber} servidos desde cache local`);
        }

        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({
          success: true,
          build: buildData
        }));
      } catch (error) {
        console.error('❌ Error en /last-build:', error.message);
        res.writeHead(500, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({
          success: false,
          message: 'Error obteniendo build data'
        }));
      }
    })();
  }
  // Página principal
  else if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Chromatic Webhook Server</title>
          <style>
            body { font-family: Arial; max-width: 800px; margin: 50px auto; padding: 20px; }
            h1 { color: #333; }
            h2 { color: #555; margin-top: 30px; }
            .info { background: #f0f0f0; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
            .success { background: #e8f5e9; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
            code { background: #e0e0e0; padding: 2px 6px; border-radius: 3px; }
            ul { line-height: 1.8; }
          </style>
        </head>
        <body>
          <h1>🎨 Chromatic Webhook Server</h1>
          <div class="info">
            <p><strong>Estado:</strong> ✅ Funcionando</p>
            <p><strong>Puerto:</strong> ${PORT}</p>
          </div>

          <h2>📡 Endpoints Disponibles</h2>
          <div class="success">
            <p><strong>POST /webhook</strong> - Recibe eventos de Chromatic</p>
            <p><code>http://localhost:${PORT}/webhook</code></p>
          </div>
          <div class="success">
            <p><strong>GET /last-build</strong> - Obtiene el último build (consulta en tiempo real)</p>
            <p><code>http://localhost:${PORT}/last-build</code></p>
            <ul>
              <li>Por defecto: devuelve datos del cache local si existen</li>
              <li>Si no hay cache: ejecuta Chromatic CLI en tiempo real</li>
              <li><code>?force=true</code> - Siempre consulta en tiempo real (omite cache)</li>
            </ul>
          </div>
          <div class="success">
            <p><strong>GET /health</strong> - Health check</p>
            <p><code>http://localhost:${PORT}/health</code></p>
          </div>

          <h2>🔧 Modos de Operación</h2>
          <ol>
            <li><strong>Modo Push (Webhook):</strong> Chromatic envía eventos POST cuando hay builds nuevos</li>
            <li><strong>Modo Pull (CLI):</strong> El servidor ejecuta Chromatic CLI en tiempo real para obtener el último build</li>
          </ol>

          <h2>⚙️ Configuración en Chromatic (Opcional)</h2>
          <ol>
            <li>Ve a tu proyecto en Chromatic</li>
            <li>Busca la sección de Webhooks o Integrations</li>
            <li>Agrega esta URL: <code>http://localhost:${PORT}/webhook</code></li>
            <li>Selecciona los eventos: Build Status Changed</li>
          </ol>
          <p><em>Nota: El webhook funciona sin configurar esto, consultando la API directamente.</em></p>
          <p><em>Para producción, usa ngrok o expón este puerto públicamente.</em></p>
        </body>
      </html>
    `);
  }
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

// Iniciar servidor
server.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🎨 CHROMATIC WEBHOOK SERVER');
  console.log('='.repeat(60));
  console.log(`\n✅ Servidor ejecutándose en: http://localhost:${PORT}`);
  console.log(`\n📡 Endpoints disponibles:`);
  console.log(`   POST /webhook         - Recibir eventos de Chromatic`);
  console.log(`   GET  /last-build      - Obtener último build (consulta en tiempo real)`);
  console.log(`   GET  /last-build?force=true - Forzar consulta en tiempo real`);
  console.log(`   GET  /health          - Health check`);
  console.log(`   GET  /                - Documentación`);
  console.log('\n🔧 Modos de operación:');
  console.log(`   • Modo Push: Chromatic envía POST a /webhook`);
  console.log(`   • Modo Pull: Ejecuta Chromatic CLI en tiempo real`);
  console.log('\n💡 Uso recomendado:');
  console.log(`   1. Ejecuta este servidor: npm run chromatic:webhook`);
  console.log(`   2. En otra terminal: npm run chromatic:check`);
  console.log(`   3. El endpoint /last-build ejecutará Chromatic CLI en tiempo real`);
  console.log('\n📌 Configuración webhook (opcional):');
  console.log(`   https://www.chromatic.com/manage?appId=${PROJECT_ID}`);
  console.log('\n⏳ Servidor listo. Esperando peticiones...\n');
  console.log('='.repeat(60) + '\n');
});

// Manejo de errores
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`\n❌ Error: El puerto ${PORT} ya está en uso.`);
    console.error(`   Intenta cerrar otros procesos o cambia el puerto.\n`);
  } else {
    console.error('\n❌ Error del servidor:', error.message, '\n');
  }
  process.exit(1);
});

// Manejo de cierre graceful
process.on('SIGINT', () => {
  console.log('\n\n👋 Cerrando servidor webhook...\n');
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente\n');
    process.exit(0);
  });
});
