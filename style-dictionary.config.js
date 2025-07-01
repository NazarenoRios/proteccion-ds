/**
 * Style Dictionary Config
 *
 * Este archivo configura la transformación de los tokens de diseño
 * desde el formato JSON exportado de Figma a diferentes plataformas.
 */

const StyleDictionary = require('style-dictionary');
const path = require('path');

// Registrar un formato personalizado para las sombras en CSS
StyleDictionary.registerFormat({
  name: 'css/variables',
  formatter: function (dictionary, config) {
    return `/**
 * Do not edit directly
 * Generated on ${new Date().toUTCString()}
 */

:root {
${dictionary.allProperties
  .map(prop => {
    // Manejar específicamente las sombras
    if (prop.type === 'boxShadow') {
      const shadow = prop.value;
      if (Array.isArray(shadow)) {
        // Formatear múltiples sombras
        const shadowValues = shadow
          .map(s => `${s.x}px ${s.y}px ${s.blur}px ${s.spread || '0'}px ${s.color}`)
          .join(', ');
        return `  --${prop.name}: ${shadowValues};`;
      } else if (shadow && typeof shadow === 'object') {
        // Formatear la sombra como una propiedad CSS box-shadow
        return `  --${prop.name}: ${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread || '0'}px ${shadow.color};`;
      }
    }
    return `  --${prop.name}: ${prop.value};`;
  })
  .join('\n')}
}
`;
  },
});

// Registrar un formato personalizado para las sombras en SCSS
StyleDictionary.registerFormat({
  name: 'scss/variables',
  formatter: function (dictionary, config) {
    return `/**
 * Do not edit directly
 * Generated on ${new Date().toUTCString()}
 */

${dictionary.allProperties
  .map(prop => {
    // Manejar específicamente las sombras
    if (prop.type === 'boxShadow') {
      const shadow = prop.value;
      if (Array.isArray(shadow)) {
        // Formatear múltiples sombras
        const shadowValues = shadow
          .map(s => `${s.x}px ${s.y}px ${s.blur}px ${s.spread || '0'}px ${s.color}`)
          .join(', ');
        return `$${prop.name}: ${shadowValues};`;
      } else if (shadow && typeof shadow === 'object') {
        // Formatear la sombra como una propiedad SCSS box-shadow
        return `$${prop.name}: ${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread || '0'}px ${shadow.color};`;
      }
    }
    return `$${prop.name}: ${prop.value};`;
  })
  .join('\n')}
`;
  },
});

// Registrar un formato personalizado para las sombras en JavaScript
StyleDictionary.registerFormat({
  name: 'javascript/es6',
  formatter: function (dictionary, config) {
    return `/**
 * Do not edit directly
 * Generated on ${new Date().toUTCString()}
 */

${dictionary.allProperties
  .map(prop => {
    // Manejar específicamente las sombras
    if (prop.type === 'boxShadow') {
      const shadow = prop.value;
      if (Array.isArray(shadow)) {
        // Formatear múltiples sombras
        const shadowValues = shadow
          .map(s => `${s.x}px ${s.y}px ${s.blur}px ${s.spread || '0'}px ${s.color}`)
          .join(', ');
        return `export const ${prop.name.charAt(0).toUpperCase() + prop.name.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase())} = "${shadowValues}";`;
      } else if (shadow && typeof shadow === 'object') {
        // Formatear la sombra como un string para JavaScript
        return `export const ${prop.name.charAt(0).toUpperCase() + prop.name.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase())} = "${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread || '0'}px ${shadow.color}";`;
      }
    }
    return `export const ${prop.name.charAt(0).toUpperCase() + prop.name.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase())} = ${JSON.stringify(prop.value)};`;
  })
  .join('\n')}
`;
  },
});

// Configuración principal de Style Dictionary
const StyleDictionaryConfig = {
  source: [path.resolve(__dirname, 'tokens/transformed/**/*.json')],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'dist/scss/',
      files: [
        {
          destination: '_variables.scss',
          format: 'scss/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations',
        },
      ],
    },
    // Puedes añadir más plataformas según necesites (iOS, Android, etc.)
  },
};

module.exports = StyleDictionaryConfig;
