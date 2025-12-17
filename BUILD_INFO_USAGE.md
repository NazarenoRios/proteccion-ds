# Build Info - Sistema de Versionamiento

Este proyecto incluye un sistema automático de versionamiento de builds usando Jenkins.

## Cómo funciona

En cada build de Jenkins, se genera automáticamente un archivo `build-info.json` que contiene:

```json
{
  "name": "@proteccionsa/essence-ui",
  "version": "0.0.1",
  "buildNumber": "123",
  "buildId": "2025-11-25_12-34-56",
  "buildUrl": "https://jenkins.example.com/job/design-system/123/",
  "gitBranch": "developer",
  "gitCommit": "abc123def456...",
  "timestamp": "2025-11-25T12:34:56.789Z",
  "fullVersion": "0.0.1+build.123",
  "jenkinsJobName": "design-system"
}
```

## Ubicación del archivo

- En el proyecto: `build-info.json` (raíz)
- En el paquete compilado: `dist/build-info.json`

## Uso en aplicaciones

### Opción 1: Leer el archivo directamente

```typescript
import buildInfo from '@proteccionsa/essence-ui/build-info.json';

console.log(`Versión del Design System: ${buildInfo.fullVersion}`);
console.log(`Build Number: ${buildInfo.buildNumber}`);
```

### Opción 2: Mostrar en footer de la aplicación

```tsx
import buildInfo from '@proteccionsa/essence-ui/build-info.json';

export function AppFooter() {
  return (
    <footer>
      <small>
        Design System v{buildInfo.fullVersion}
        (Build #{buildInfo.buildNumber})
      </small>
    </footer>
  );
}
```

### Opción 3: Logging y diagnóstico

```typescript
import buildInfo from '@proteccionsa/essence-ui/build-info.json';

// Enviar a analytics o logging
analytics.track('app_loaded', {
  designSystemVersion: buildInfo.fullVersion,
  buildNumber: buildInfo.buildNumber,
  gitCommit: buildInfo.gitCommit,
});
```

## Pipeline de Jenkins

El pipeline ejecuta estos pasos en orden:

1. **Obtener fuentes** - Clona el repositorio
2. **Instalar dependencias** - `npm ci`
3. **Extraer info versión** - Lee `package.json`
4. **Generar metadata del build** - Crea `build-info.json` con BUILD_NUMBER
5. **Compilar fuentes** - `npm run build` (incluye `build-info.json` en `dist/`)

## Desarrollo local

Para generar el archivo localmente (sin Jenkins):

```bash
node scripts/generate-build-info.js
```

Esto creará un `build-info.json` con valores locales:
- `buildNumber`: "local"
- `buildId`: timestamp actual
- Otras variables de Git disponibles

## Variables de Jenkins utilizadas

- `BUILD_NUMBER` - Número único incremental del build
- `BUILD_ID` - ID del build (timestamp)
- `BUILD_URL` - URL del build en Jenkins
- `JOB_NAME` - Nombre del job de Jenkins
- `GIT_COMMIT` - SHA del commit (obtenido con `git rev-parse HEAD`)
- `GIT_BRANCH` - Nombre de la rama (obtenido con `git rev-parse --abbrev-ref HEAD`)

## Beneficios

- **Trazabilidad**: Saber exactamente qué versión está desplegada
- **Debug**: Identificar qué build introdujo un bug
- **Rollback**: Volver a un build específico conociendo su número
- **Auditoría**: Registrar qué builds se desplegaron en cada ambiente
- **No invasivo**: No modifica `package.json` ni requiere commits
