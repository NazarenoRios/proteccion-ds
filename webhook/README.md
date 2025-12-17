# Chromatic Webhook Server

Este servidor recibe eventos de Chromatic en tiempo real y actualiza el estado del último build.

## Por qué está en una carpeta separada

La carpeta `scripts/` está en `.gitignore` y no se sube al repositorio. Para poder deployar el webhook a servicios como Railway o Render, necesitamos que el código esté en una carpeta que SÍ se suba a Git.

## Archivos

- `server.js` - El servidor webhook principal
- `package.json` - Configuración para que Node.js use módulos ES

## Uso Local

```bash
npm run chromatic:webhook
```

Esto iniciará el servidor en `http://localhost:3333`

## Deployment

### Opción Recomendada: Render (soporta GitLab)

1. Ve a https://render.com y conéctate con GitLab
2. Crea un nuevo Web Service desde tu repositorio
3. Render detectará automáticamente el archivo `render.yaml`
4. O configura manualmente:
   - Build Command: `npm install`
   - Start Command: `node webhook/server.js`
5. Una vez deployado, copia la URL (ej: `https://essence-ui-webhook.onrender.com`)
6. Crea un archivo `.env` en la raíz del proyecto:
   ```
   CHROMATIC_WEBHOOK_URL=https://essence-ui-webhook.onrender.com
   ```
7. Configura el webhook en Chromatic con esa URL + `/webhook`

Ver el archivo `DEPLOYMENT.md` en la raíz del proyecto para instrucciones completas de deployment en Railway, Render u otros servicios.

## Endpoints

- `POST /webhook` - Recibe eventos de Chromatic
- `GET /health` - Health check
- `GET /` - Página de información

## Variables de Entorno

- `PORT` - Puerto del servidor (por defecto: 3333)
