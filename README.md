# Design System Tokens

Este proyecto implementa un sistema de tokens de diseño utilizando Figma y Style Dictionary.

## Sistema de Tokens

El sistema de tokens está configurado para:

1. **Definir tokens en Figma**: Los diseñadores definen los tokens visuales (colores, tipografía, sombras, etc.) en Figma.
2. **Exportar tokens desde Figma**: Los tokens se exportan a un formato JSON (`tokens/figma/tokens.json`).
3. **Transformar tokens**: El script `transform-tokens.js` convierte los tokens de Figma a un formato compatible con Style Dictionary.
4. **Generar tokens para plataformas**: Style Dictionary genera los tokens en diferentes formatos (CSS, SCSS, JavaScript) para su uso en diversas plataformas.

## Comandos disponibles

```bash
# Transformar tokens de Figma a formato Style Dictionary
npm run transform-tokens

# Generar tokens para todas las plataformas
npm run build-tokens

# Ejecutar todo el proceso (transformar y generar)
npm run tokens
```

## Estructura de archivos

- `/tokens/figma/`: Tokens exportados desde Figma
- `/tokens/transformed/`: Tokens transformados para Style Dictionary
- `/dist/css/`: Variables CSS generadas
- `/dist/scss/`: Variables SCSS generadas
- `/dist/js/`: Variables JavaScript generadas

## Tokens disponibles

El sistema actualmente soporta:

- **Colores**: Primarios, secundarios y básicos
- **Sombras**: XXS, XS, S, M, L, XL

## Uso de tokens en componentes

### En CSS/Tailwind

Los tokens están disponibles como variables CSS y se han configurado en Tailwind para usarse directamente en las clases:

```jsx
// Ejemplo de Button.tsx usando tokens a través de Tailwind
<button className="bg-primary-500 hover:bg-primary-600 text-white shadow-md">Botón Primario</button>
```

### Mapa de colores en Tailwind

Los tokens de color están disponibles en Tailwind con la siguiente estructura:

```
- primary-{100-900}: Azul principal
- primary-yellow-{100-900}: Amarillo principal
- primary-aqua-{100-900}: Aqua principal
- info-{100-900}: Azul informativo
- success-{100-900}: Verde éxito
- warning-{100-900}: Amarillo advertencia
- danger-{100-900}: Rojo peligro
- neutral-{100-900}: Escala de grises
```

### Sombras en Tailwind

Las sombras están disponibles como:

```
shadow-xxs
shadow-xs
shadow-sm
shadow-md
shadow-lg
shadow-xl
```

### Desde JavaScript

También puedes importar los tokens directamente en JavaScript:

```js
import { ColorPrimaryAzulProtecciN500, ShadowM } from '@/styles/tokens';

const styles = {
  backgroundColor: ColorPrimaryAzulProtecciN500,
  boxShadow: ShadowM,
};
```

# Design System - POC

Este proyecto implementa un sistema de diseño con tokens configurables desde Figma y generados mediante Style Dictionary.

## Configuración de Tokens y Style Dictionary

Este proyecto implementa la HU001 - DSYS - Configuración de tokens y Style Dictionary, que permite:

1. Definir tokens en Figma
2. Exportar tokens desde Figma a formato JSON
3. Transformar tokens usando Style Dictionary para diferentes plataformas

### Estructura del Proyecto

```
├── dist/                  # Tokens generados
│   ├── css/               # Variables CSS
│   ├── scss/              # Variables SCSS
│   └── js/                # Variables JavaScript
├── scripts/               # Scripts para transformar y generar tokens
├── tokens/                # Directorio de tokens
│   ├── figma/             # Tokens exportados desde Figma
│   └── transformed/       # Tokens transformados para Style Dictionary
└── style-dictionary.config.js  # Configuración de Style Dictionary
```

## Flujo de Trabajo con Tokens

### 1. Definición de Tokens en Figma

1. Instala el plugin [Tokens Studio for Figma](https://tokens.studio/) (anteriormente Figma Tokens) en Figma.
2. Define tus tokens en Figma usando este plugin.
3. Organiza tus tokens en conjuntos (sets) para una mejor estructura.

### 2. Exportación de Tokens desde Figma

#### Opción 1: Exportación Manual

1. En el plugin Tokens Studio, haz clic en el botón de exportación.
2. Selecciona formato JSON.
3. Guarda el archivo como `tokens/figma/tokens.json`.

#### Opción 2: Sincronización con GitHub

1. Configura la sincronización con GitHub en el plugin Tokens Studio.
2. Conecta el plugin con tu repositorio.
3. Configura la ruta de sincronización como `tokens/figma/tokens.json`.
4. Sincroniza los cambios cuando hagas actualizaciones en tus tokens.

### 3. Transformación y Generación de Tokens

Una vez que tengas los tokens exportados desde Figma, puedes transformarlos y generar los archivos para diferentes plataformas:

```bash
# Transformar tokens de Figma a formato compatible con Style Dictionary
npm run transform-tokens

# Generar tokens para todas las plataformas (CSS, SCSS, JS, etc.)
npm run build-tokens

# O ejecutar ambos comandos en secuencia
npm run tokens
```

## Uso de Tokens Generados

### CSS

Los tokens CSS están disponibles en `dist/css/variables.css`:

```css
:root {
  --colors-primary-base: #0066cc;
  --spacing-md: 16px;
  /* ... otros tokens ... */
}
```

### SCSS

Los tokens SCSS están disponibles en `dist/scss/_variables.scss`:

```scss
$colors-primary-base: #0066cc;
$spacing-md: 16px;
// ... otros tokens ...
```

### JavaScript

Los tokens JavaScript están disponibles en `dist/js/tokens.js`:

```javascript
export const ColorsPrimaryBase = '#0066CC';
export const SpacingMd = '16px';
// ... otros tokens ...
```

## Personalización

Para personalizar la configuración de Style Dictionary y añadir más formatos de salida, edita el archivo `style-dictionary.config.js` en la raíz del proyecto.

## Scripts Disponibles

- `npm run transform-tokens`: Transforma los tokens de Figma a formato compatible con Style Dictionary.
- `npm run build-tokens`: Genera los tokens para todas las plataformas.
- `npm run tokens`: Ejecuta ambos comandos en secuencia.

## Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Ejecutar Storybook
npm run storybook
```

## Features

- 🎨 Component library with Storybook
- 📝 TypeScript support
- 🚀 Vite for fast development
- 🎯 ESLint and Prettier for code quality
- 🐳 Docker support
- 📱 Responsive design
- 🎭 Chromatic for visual testing
- 🔍 Accessibility support

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd [repository-name]
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Start Storybook:

```bash
npm run storybook
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook
- `npm run chromatic` - Run Chromatic visual testing
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

### Docker

Build and run with Docker:

```bash
docker build -t design-system .
docker run -p 6006:6006 design-system
```

## Project Structure

```
src/
  ├── components/     # React components
  │   ├── atoms/     # Basic building blocks
  │   ├── molecules/ # Combinations of atoms
  │   └── organisms/ # Complex components
  ├── styles/        # Global styles and themes
  ├── utils/         # Utility functions
  └── types/         # TypeScript type definitions
```

## Contributing

1. Create a new branch
2. Make your changes
3. Submit a pull request

## License

MIT
