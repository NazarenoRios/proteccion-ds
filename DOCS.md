# Essence UI - Documentación

Sistema de diseño de componentes React con Tailwind CSS.

## Instalación

### Desde NPM

```bash
npm install @proteccionsa/essence-ui
```

### Desde Build Local

1. Clona y construye el proyecto:

```bash
git clone <repo-url>
cd design-system-library
npm install
npm run build
```

2. En tu proyecto, instala desde la carpeta `dist`:

```bash
npm install ../path/to/design-system-library
```

O importa directamente el bundle:

```javascript
import { Button } from '../path/to/design-system-library/dist/essence-ui.es.js';
```

## Uso Básico

### Importar Componentes

```javascript
import { Button, Input, Alert, Modal } from '@proteccionsa/essence-ui';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Input placeholder="Enter text" />
      <Alert type="success">Success message</Alert>
    </div>
  );
}
```

### Configuración de Estilos

Los estilos están incluidos en el bundle. Asegúrate que tu proyecto tenga configurado Tailwind CSS o importa los estilos directamente:

```javascript
import '@proteccionsa/essence-ui/dist/style.css';
```

## Dependencias Peer

Instala las dependencias necesarias en tu proyecto:

```bash
npm install react react-dom
```

## Componentes Disponibles

### Atoms

- `Alert` - Alertas y notificaciones
- `Badge` - Insignias y etiquetas
- `Button` - Botones
- `Checkbox` - Casillas de verificación
- `Icon` - Iconos
- `Input` - Campos de entrada
- `Pills` - Pills de filtro
- `RadioButton` - Botones de radio
- `Switch` - Interruptores
- `Tag` - Etiquetas
- `Tooltip` - Tooltips

### Molecules

- `Modal` - Modales
- `Pagination` - Paginación
- `Tabs` - Pestañas
- `Toast` - Notificaciones toast

### Organisms

- `Stepper` - Stepper de pasos

## Desarrollo

### Setup Inicial

```bash
npm install
```

### Comandos Útiles

```bash
# Desarrollo con Storybook
npm run storybook

# Build de producción
npm run build

# Tests
npm test
npm run test:watch
npm run test:coverage

# Linting y type checking
npm run lint
npm run type-check
```

### Crear un Nuevo Componente

1. Crea la carpeta en `src/components/atoms|molecules|organisms/ComponentName/`
2. Archivos necesarios:

   - `ComponentName.tsx` - Componente
   - `ComponentName.stories.tsx` - Historias de Storybook
   - `index.ts` - Export
   - `types.ts` (opcional) - Tipos

3. Exporta en `src/index.ts`:

```typescript
export { ComponentName } from './components/atoms/ComponentName';
```

### Estructura del Componente

```typescript
// ComponentName.tsx
import React from 'react'

interface ComponentNameProps {
  // props
}

export const ComponentName: React.FC<ComponentNameProps> = (props) => {
  return <div>{/* JSX */}</div>
}
```

```typescript
// index.ts
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

### Storybook

```bash
# Desarrollo
npm run storybook

# Build
npm run build-storybook
```

### Tests

```bash
# Run tests
npm test

# Con coverage
npm run test:coverage

# Storybook tests
npm run test-storybook
```

## Build y Distribución

### Build Local

```bash
npm run build
```

Genera:

- `dist/essence-ui.es.js` - ES Module
- `dist/essence-ui.umd.js` - UMD Module
- `dist/index.d.ts` - TypeScript definitions
- `dist/style.css` - Estilos compilados

### Publicar a NPM

```bash
# Actualiza versión en package.json
npm version patch|minor|major

# Publica
npm publish --access public
```

## Design Tokens

### Generar Tokens

```bash
npm run tokens
```

Transforma tokens desde Figma y genera CSS/JS.

### Archivos

- `src/styles/tokens/` - Tokens generados
- `scripts/transform-tokens.js` - Transformación
- `scripts/build-tokens.js` - Build

## Configuración

### Vite Config

- Build como librería
- Externals: React, ReactDOM
- Tailwind CSS integrado
- TypeScript definitions automáticas

### TypeScript

- Strict mode habilitado
- Paths configurados (`@/` apunta a `src/`)

## Troubleshooting

### Estilos no se aplican

- Verifica que Tailwind esté configurado en tu proyecto
- Importa `@proteccionsa/essence-ui/dist/style.css`

### Errores de TypeScript

- Asegúrate de tener `@types/react` y `@types/react-dom`
- Verifica que el tsconfig incluya node_modules

### Build falla

```bash
# Limpia y reinstala
rm -rf node_modules package-lock.json
npm install
npm run build
```
