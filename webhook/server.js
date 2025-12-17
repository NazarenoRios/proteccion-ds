/**
 * Servidor webhook para recibir eventos de Chromatic en tiempo real
 * Actualiza automáticamente el estado del último build
 */

import { createServer } from 'http';
import { writeFileSync, readFileSync, existsSync } from 'fs';

const PORT = process.env.PORT || 3333;
const BUILD_FILE = '.chromatic-last-build.json';

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
  else if (req.method === 'GET' && req.url === '/last-build') {
    try {
      if (existsSync(BUILD_FILE)) {
        const buildData = JSON.parse(readFileSync(BUILD_FILE, 'utf8'));
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({
          success: true,
          build: buildData
        }));
      } else {
        res.writeHead(404, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({
          success: false,
          message: 'No build data available yet'
        }));
      }
    } catch (error) {
      console.error('❌ Error leyendo build data:', error.message);
      res.writeHead(500, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify({
        success: false,
        message: 'Error reading build data'
      }));
    }
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
            .info { background: #f0f0f0; padding: 15px; border-radius: 5px; }
            code { background: #e0e0e0; padding: 2px 6px; border-radius: 3px; }
          </style>
        </head>
        <body>
          <h1>🎨 Chromatic Webhook Server</h1>
          <div class="info">
            <p><strong>Estado:</strong> ✅ Funcionando</p>
            <p><strong>Puerto:</strong> ${PORT}</p>
            <p><strong>Webhook URL:</strong> <code>http://localhost:${PORT}/webhook</code></p>
            <p><strong>Health Check:</strong> <code>http://localhost:${PORT}/health</code></p>
            <p><strong>Last Build:</strong> <code>http://localhost:${PORT}/last-build</code></p>
          </div>
          <h2>Configuración en Chromatic</h2>
          <ol>
            <li>Ve a tu proyecto en Chromatic</li>
            <li>Busca la sección de Webhooks o Integrations</li>
            <li>Agrega esta URL: <code>http://localhost:${PORT}/webhook</code></li>
            <li>Selecciona los eventos: Build Status Changed</li>
          </ol>
          <p><em>Nota: Para producción, usa ngrok o expón este puerto públicamente.</em></p>
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
  console.log(`📡 Webhook endpoint: http://localhost:${PORT}/webhook`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
  console.log(`📊 Last build: http://localhost:${PORT}/last-build`);
  console.log('\n💡 Configuración:');
  console.log(`   1. Abre: https://www.chromatic.com/manage?appId=690b6ad8f793d5704c221f28`);
  console.log(`   2. Busca "Webhooks" o "Integrations"`);
  console.log(`   3. Agrega URL: http://localhost:${PORT}/webhook`);
  console.log(`   4. O usa ngrok para exponer públicamente\n`);
  console.log('⏳ Esperando eventos de Chromatic...\n');
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
