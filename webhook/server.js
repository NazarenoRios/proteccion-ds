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
 * Lee el último build del archivo JSON local
 * NOTA: No ejecuta el CLI porque --dry-run crea builds fantasma en Chromatic
 * Para actualizar los datos, ejecuta: npm run chromatic:check
 */
function getLastBuildFromCache() {
  try {
    if (!existsSync(BUILD_FILE)) {
      console.log('📭 No hay archivo de build local');
      return null;
    }

    const data = readFileSync(BUILD_FILE, 'utf-8');
    const buildInfo = JSON.parse(data);

    console.log(`✅ Build #${buildInfo.buildNumber} leído del cache local`);
    return buildInfo;
  } catch (error) {
    console.error('❌ Error leyendo cache:', error.message);
    return null;
  }
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
        // Siempre lee del cache local (no ejecuta CLI porque crea builds fantasma)
        console.log('📂 Leyendo último build desde cache local...');
        const buildData = getLastBuildFromCache();

        if (!buildData) {
          res.writeHead(404, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(JSON.stringify({
            success: false,
            message: 'No hay datos de build disponibles. Ejecuta "npm run chromatic:check" primero para generar el build.',
            hint: 'O configura el webhook POST en Chromatic para recibir eventos automáticos'
          }));
          return;
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
            <p><strong>GET /last-build</strong> - Obtiene el último build desde cache local</p>
            <p><code>http://localhost:${PORT}/last-build</code></p>
            <ul>
              <li>Lee los datos del archivo <code>.chromatic-last-build.json</code></li>
              <li>Para actualizar: ejecuta <code>npm run chromatic:check</code></li>
              <li>No crea builds nuevos en Chromatic (solo lectura)</li>
            </ul>
          </div>
          <div class="success">
            <p><strong>GET /health</strong> - Health check</p>
            <p><code>http://localhost:${PORT}/health</code></p>
          </div>

          <h2>🔧 Modos de Operación</h2>
          <ol>
            <li><strong>Modo Push (Webhook):</strong> Chromatic envía eventos POST cuando hay builds nuevos</li>
            <li><strong>Modo Pull (Cache):</strong> El servidor lee del archivo local generado por <code>npm run chromatic:check</code></li>
          </ol>

          <h2>💡 Flujo de Trabajo Recomendado</h2>
          <ol>
            <li>Ejecuta <code>npm run chromatic:webhook</code> para iniciar este servidor</li>
            <li>En otra terminal, ejecuta <code>npm run chromatic:check</code> para crear/actualizar un build</li>
            <li>El endpoint /last-build servirá los datos del build desde el cache local</li>
          </ol>

          <h2>⚙️ Configuración en Chromatic (Opcional)</h2>
          <ol>
            <li>Ve a tu proyecto en Chromatic</li>
            <li>Busca la sección de Webhooks o Integrations</li>
            <li>Agrega esta URL: <code>http://localhost:${PORT}/webhook</code></li>
            <li>Selecciona los eventos: Build Status Changed</li>
          </ol>
          <p><em>Nota: Esto permite recibir notificaciones automáticas cuando hay nuevos builds.</em></p>
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
  console.log(`   GET  /last-build      - Obtener último build (desde cache local)`);
  console.log(`   GET  /health          - Health check`);
  console.log(`   GET  /                - Documentación`);
  console.log('\n🔧 Modos de operación:');
  console.log(`   • Modo Push: Chromatic envía POST a /webhook`);
  console.log(`   • Modo Pull: Lee datos del archivo .chromatic-last-build.json`);
  console.log('\n💡 Uso recomendado:');
  console.log(`   1. Ejecuta este servidor: npm run chromatic:webhook`);
  console.log(`   2. En otra terminal: npm run chromatic:check`);
  console.log(`   3. El endpoint /last-build servirá los datos desde el cache`);
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
