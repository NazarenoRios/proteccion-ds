/**
 * Chromatic Webhook Server
 * Recibe eventos de Chromatic en tiempo real y sirve la información del último build
 */

import express from 'express';
import cors from 'cors';
import { writeFileSync, readFileSync, existsSync } from 'fs';

const app = express();
const PORT = process.env.PORT || 3333;
const STORAGE_FILE = '.chromatic-build-data.json';

// Middleware
app.use(cors());
app.use(express.json());

// Almacenamiento en memoria del último build
let lastBuildData = loadFromDisk();

/**
 * Carga datos del disco si existen
 */
function loadFromDisk() {
  try {
    if (existsSync(STORAGE_FILE)) {
      const data = readFileSync(STORAGE_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error cargando datos del disco:', error.message);
  }
  return null;
}

/**
 * Guarda datos en disco
 */
function saveToDisk(data) {
  try {
    writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2));
    console.log('✅ Datos guardados en disco');
  } catch (error) {
    console.error('❌ Error guardando en disco:', error.message);
  }
}

/**
 * POST /webhook
 * Recibe eventos de Chromatic con información del build
 */
app.post('/webhook', (req, res) => {
  console.log('\n📨 Webhook recibido de Chromatic');
  console.log('📦 Payload completo:', JSON.stringify(req.body, null, 2));

  const payload = req.body;

  // Extraer toda la información disponible del build
  const buildData = {
    // Información del build
    buildNumber: payload.build?.number || payload.number,
    buildId: payload.build?.id || payload.buildId,
    status: payload.build?.status || payload.status,
    result: payload.build?.result || payload.result,

    // URLs
    webUrl: payload.build?.webUrl || payload.webUrl,
    storybookUrl: payload.build?.storybookUrl || payload.storybookUrl,

    // Contadores
    changeCount: payload.build?.changeCount || 0,
    errorCount: payload.build?.errorCount || 0,
    componentCount: payload.build?.componentCount || 0,
    specCount: payload.build?.specCount || 0,
    testCount: payload.build?.testCount || 0,

    // Estado de revisión
    isAccepted: payload.build?.isAccepted || false,
    autoAcceptChanges: payload.build?.autoAcceptChanges || false,

    // Información del proyecto
    appId: payload.appId,
    appName: payload.app?.name,

    // Información de Git
    branch: payload.build?.branch || payload.branch,
    commit: payload.build?.commit || payload.commit,
    committedAt: payload.build?.committedAt,

    // Timestamps
    createdAt: payload.build?.createdAt || new Date().toISOString(),
    startedAt: payload.build?.startedAt,
    completedAt: payload.build?.completedAt,

    // Metadatos
    eventType: payload.type || payload.event,
    lastUpdated: new Date().toISOString(),

    // Payload completo por si acaso
    _rawPayload: payload
  };

  // Guardar en memoria y disco
  lastBuildData = buildData;
  saveToDisk(buildData);

  console.log(`✅ Build #${buildData.buildNumber} guardado`);
  console.log(`   Status: ${buildData.status}`);
  console.log(`   Changes: ${buildData.changeCount}`);

  res.status(200).json({
    success: true,
    message: 'Build data received and stored',
    buildNumber: buildData.buildNumber
  });
});

/**
 * GET /last-build
 * Devuelve toda la información del último build recibido de Chromatic
 */
app.get('/last-build', (req, res) => {
  console.log('📤 Solicitud de último build');

  if (!lastBuildData) {
    return res.status(404).json({
      success: false,
      message: 'No hay datos de build disponibles. Esperando primer evento de Chromatic.',
      hint: 'Ejecuta npm run chromatic para generar un build y recibir el webhook'
    });
  }

  console.log(`✅ Sirviendo Build #${lastBuildData.buildNumber}`);

  res.status(200).json({
    success: true,
    build: lastBuildData,
    // Información adicional útil
    meta: {
      dataSource: 'chromatic-webhook',
      lastUpdated: lastBuildData.lastUpdated,
      hasChanges: lastBuildData.changeCount > 0,
      needsReview: lastBuildData.changeCount > 0 && !lastBuildData.isAccepted,
      buildAge: calculateBuildAge(lastBuildData.createdAt)
    }
  });
});

/**
 * GET /health
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    server: 'chromatic-webhook',
    port: PORT,
    hasData: !!lastBuildData,
    lastBuildNumber: lastBuildData?.buildNumber || null,
    uptime: process.uptime()
  });
});

/**
 * GET /
 * Documentación del API
 */
app.get('/', (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Chromatic Webhook API</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
        h1 { color: #FC521F; }
        .endpoint { background: #f5f5f5; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .method { display: inline-block; padding: 5px 10px; border-radius: 3px; font-weight: bold; }
        .post { background: #49cc90; color: white; }
        .get { background: #61affe; color: white; }
        code { background: #e0e0e0; padding: 2px 6px; border-radius: 3px; }
        .status { padding: 10px; border-radius: 5px; margin: 20px 0; }
        .ok { background: #d4edda; color: #155724; }
        .waiting { background: #fff3cd; color: #856404; }
      </style>
    </head>
    <body>
      <h1>🎨 Chromatic Webhook API</h1>

      <div class="status ${lastBuildData ? 'ok' : 'waiting'}">
        ${lastBuildData
          ? `✅ Último build: #${lastBuildData.buildNumber} (${lastBuildData.status})`
          : '⏳ Esperando primer evento de Chromatic'
        }
      </div>

      <h2>Endpoints Disponibles</h2>

      <div class="endpoint">
        <span class="method post">POST</span>
        <strong>/webhook</strong>
        <p>Recibe eventos de Chromatic con información de builds</p>
        <p><strong>URL para configurar en Chromatic:</strong></p>
        <code>https://proteccion-ds-1.onrender.com/webhook</code>
      </div>

      <div class="endpoint">
        <span class="method get">GET</span>
        <strong>/last-build</strong>
        <p>Devuelve TODA la información del último build recibido de Chromatic</p>
        <p><strong>Ejemplo:</strong></p>
        <code>curl https://proteccion-ds-1.onrender.com/last-build</code>
      </div>

      <div class="endpoint">
        <span class="method get">GET</span>
        <strong>/health</strong>
        <p>Health check del servidor</p>
      </div>

      <h2>📋 Configuración en Chromatic</h2>
      <ol>
        <li>Ve a <a href="https://www.chromatic.com/manage?appId=690b6ad8f793d5704c221f28" target="_blank">tu proyecto en Chromatic</a></li>
        <li>Busca "Webhooks" o "Integrations"</li>
        <li>Agrega: <code>https://proteccion-ds-1.onrender.com/webhook</code></li>
        <li>Selecciona eventos: Build completed, Build status changed</li>
      </ol>

      <h2>🧪 Probar</h2>
      <ol>
        <li>Ejecuta: <code>npm run chromatic</code></li>
        <li>Chromatic enviará automáticamente los datos aquí</li>
        <li>Consulta: <code>GET /last-build</code></li>
      </ol>
    </body>
    </html>
  `);
});

/**
 * Calcula la edad del build en formato legible
 */
function calculateBuildAge(createdAt) {
  if (!createdAt) return 'unknown';

  const now = new Date();
  const created = new Date(createdAt);
  const diffMs = now - created;
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'menos de 1 minuto';
  if (diffMins === 1) return '1 minuto';
  if (diffMins < 60) return `${diffMins} minutos`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours === 1) return '1 hora';
  if (diffHours < 24) return `${diffHours} horas`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return '1 día';
  return `${diffDays} días`;
}

// Iniciar servidor
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🎨 CHROMATIC WEBHOOK SERVER');
  console.log('='.repeat(60));
  console.log(`\n✅ Servidor corriendo en: http://localhost:${PORT}`);
  console.log(`\n📡 Endpoints:`);
  console.log(`   POST /webhook      - Recibe eventos de Chromatic`);
  console.log(`   GET  /last-build   - Devuelve último build completo`);
  console.log(`   GET  /health       - Health check`);
  console.log(`   GET  /             - Documentación`);

  if (lastBuildData) {
    console.log(`\n📦 Datos cargados desde disco:`);
    console.log(`   Build #${lastBuildData.buildNumber}`);
    console.log(`   Status: ${lastBuildData.status}`);
    console.log(`   Age: ${calculateBuildAge(lastBuildData.createdAt)}`);
  } else {
    console.log(`\n⏳ Sin datos. Esperando eventos de Chromatic...`);
  }

  console.log(`\n🔗 Configurar webhook en Chromatic:`);
  console.log(`   https://www.chromatic.com/manage?appId=690b6ad8f793d5704c221f28`);
  console.log(`   URL: https://proteccion-ds-1.onrender.com/webhook`);
  console.log('\n' + '='.repeat(60) + '\n');
});
