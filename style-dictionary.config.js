/**
 * Style Dictionary Config
 *
 * Este archivo configura la transformación de los tokens de diseño
 * desde el formato JSON exportado de Figma a diferentes plataformas.
 */

import StyleDictionary from 'style-dictionary';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    // Asegurarse de que los nombres de fuentes con espacios estén entre comillas
    let value = prop.value;
    if (prop.attributes && prop.attributes.category === 'fontFamilies' && typeof value === 'string' && value.includes(' ')) {
      value = `"${value}"`;
    }
    return `  --${prop.name}: ${value};`;
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

// Función para normalizar nombres de tokens
function normalizeTokenName(name) {
  if (typeof name !== 'string') return '';
    if (name.toLowerCase().includes('text.size')) {
    return name.toLowerCase().replace(/\./g, '-');
  }
  
  // Manejar específicamente los nombres de fuentes
  if (name.toLowerCase().includes('fontfamily') || name.toLowerCase().includes('fontfamilies')) {
    name = name.replace(/([a-z])([A-Z])/g, '$1-$2')
               .toLowerCase()
               .replace('fontfamily', 'font-families')
               .replace('fontfamilies', 'font-families');
  }
  
  // Mapear nombres de pesos de fuente a valores numéricos
  if (name.toLowerCase().includes('fontweight') || name.toLowerCase().includes('fontweights')) {
    name = name.replace(/([a-z])([A-Z])/g, '$1-$2')
               .toLowerCase()
               .replace('fontweight', 'font-weights')
               .replace('fontweights', 'font-weights')
               .replace('regular', '400')
               .replace('negrita', '700')
               .replace('seminegrita', '600');
  }
  
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ñ/g, 'n')
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

// Registrar un formato personalizado para las variables de tema en CSS
StyleDictionary.registerFormat({
  name: 'css/theme-variables',
  formatter: function (dictionary, config) {
    // Agrupar propiedades por categoría
    const groupedProps = dictionary.allProperties.reduce((acc, prop) => {
      const category = prop.attributes?.category || 'other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(prop);
      return acc;
    }, {});

    // Orden explícito para tipografía
    const categoryOrder = [
      'color', 'fontFamilies', 'fontWeights', 'fontSizes', 'lineHeights', 'letterSpacing',
      'typography', 'text', 'size', 'spacing', 'border', 'radius', 'shadow', 'opacity', 'breakpoint', 'other'
    ];

    let css = `@import './fonts.css';\n@import 'tailwindcss';\n/**\n * Do not edit directly\n * Generated on ${new Date().toUTCString()}\n */\n\n@theme {\n`;

    categoryOrder.forEach(category => {
      if (!groupedProps[category]) return;
      css += `  /* ${category.replace(/([A-Z])/g, ' $1').replace(/^./, m => m.toUpperCase())} */\n`;
      groupedProps[category].forEach(prop => {
        let value = prop.value;
        let comment = '';
        // Procesar valores de tipografía correctamente para CSS
        switch (prop.type) {
          case 'color':
            break;
          case 'boxShadow':
            if (Array.isArray(value)) {
              value = value.map(shadow => `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread || 0}px ${shadow.color}`).join(', ');
            }
            break;
          case 'fontFamilies':
            if (typeof value === 'string') {
              // Asegurarse de que los nombres de fuentes con espacios estén entre comillas
              value = value.includes(' ') ? `"${value}"` : value;
            }
            break;
          case 'fontWeights':
            // Mapear nombres de pesos a valores numéricos
            if (value === 'Regular') value = '400';
            else if (value === 'Seminegrita') value = '600';
            else if (value === 'Negrita') value = '700';
            break;
          case 'fontSizes':
            // Asegurarse de que los tamaños de fuente tengan unidades
            if (typeof value === 'number' || !isNaN(parseInt(value))) {
              value = `${parseInt(value)}px`;
            }
            // Si el path incluye 'text.size', mantener esa estructura
            if (prop.path && prop.path.includes('text')) {
              const sizeIndex = prop.path.indexOf('size');
              if (sizeIndex !== -1 && prop.path[sizeIndex + 1]) {
                const sizeValue = prop.path[sizeIndex + 1];
                prop.path = ['text', `size-${sizeValue}`];
              }
            }
            // Asegurarse de que el valor final tenga 'px' si es un número
            if (typeof value === 'string' && !isNaN(parseInt(value)) && !value.endsWith('px')) {
              value = `${value}px`;
            }
            break;
            
          case 'lineHeights':
          case 'letterSpacing':
            if (!String(value).match(/[a-zA-Z%]/)) {
              value = `${value}px`;
            }
            break;
          case 'typography':
            if (typeof value === 'object' && value !== null) {
              value = `${value.fontWeight || '400'} ${value.fontSize || '16px'}/${value.lineHeight || '1.5'} ${value.fontFamily || 'sans-serif'}`;
              comment = ` /* ${value} */`;
            }
            break;
          case 'opacity':
            if (typeof value === 'number' && value > 1) {
              value = value / 100;
            }
            break;
          default:
            if (typeof value === 'object' && value !== null) {
              value = JSON.stringify(value);
            }
        }
        // Generar el nombre de la variable CSS
        let pathArr = [category, ...(prop.path || [])]
          .filter(Boolean)
          .map(normalizeTokenName)
          .filter(part => part && part !== 'default');
        // Eliminar prefijo duplicado si existe
        if (pathArr.length > 1 && pathArr[0] === pathArr[1]) {
          pathArr.splice(1, 1);
        }
        const varName = pathArr.join('-');
        css += `  --${varName}: ${value};${comment}\n`;
      });
    });
    css += '}\n';
    return css;
  }
});

// Registrar un formato personalizado para las variables de tema en SCSS
StyleDictionary.registerFormat({
  name: 'scss/theme-variables',
  formatter: function (dictionary, config) {
    // Agrupar propiedades por categoría
    const groupedProps = dictionary.allProperties.reduce((acc, prop) => {
      const category = prop.attributes?.category || 'other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(prop);
      return acc;
    }, {});

    // Orden explícito para tipografía
    const categoryOrder = [
      'color', 'font', 'typography', 'size', 'spacing', 
      'border', 'radius', 'shadow', 'opacity', 'breakpoint', 'other'
    ];

    let css = `/**
 * Do not edit directly
 * Generated on ${new Date().toUTCString()}
 */

@import 'tailwindcss';
@theme {
`;

    // Procesar cada categoría en el orden especificado
    categoryOrder.forEach(category => {
      const props = groupedProps[category];
      if (!props || !props.length) return;
      
      // Agrupar por tipo (para colores, fuentes, etc.)
      const typeGroups = {};
      props.forEach(prop => {
        const type = prop.attributes?.type || 'default';
        if (!typeGroups[type]) typeGroups[type] = [];
        typeGroups[type].push(prop);
      });

      // Generar sección para la categoría
      css += `\n  /* ${category.charAt(0).toUpperCase() + category.slice(1)} */\n`;

      // Procesar cada tipo dentro de la categoría
      Object.entries(typeGroups).forEach(([type, typeProps]) => {
        typeProps.forEach(prop => {
          let value = prop.value;
          let comment = '';
          
          // Procesar diferentes tipos de valores
          switch (prop.type) {
            case 'color':
              break;
              
            case 'boxShadow':
              if (Array.isArray(value)) {
                value = value.map(shadow => 
                  `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread || 0}px ${shadow.color}`
                ).join(', ');
              }
              break;
              
            case 'typography':
              if (typeof value === 'object' && value !== null) {
                value = `${value.fontWeight || '400'} ${value.fontSize || '16px'}/${value.lineHeight || '1.5'} ${value.fontFamily || 'sans-serif'}`;
                comment = ` /* ${value} */`;
              }
              break;
              
            case 'fontFamilies':
              if (Array.isArray(value)) {
                value = value.map(font => {
                  // Si la fuente ya está entre comillas, dejarla como está
                  if ((font.startsWith('"') && font.endsWith('"')) || 
                      (font.startsWith("'") && font.endsWith("'"))) {
                    return font;
                  }
                  return font.includes(' ') ? `"${font}"` : font;
                }).join(', ');
                
                // Asegurar que el nombre de la variable use el formato correcto
                if (prop.path && prop.path[0] === 'fontFamilies') {
                  prop.path[0] = 'font-families';
                }
              }
              break;
              
            case 'fontWeights':
            case 'fontSizes':
            case 'lineHeights':
              // Mantener el valor como está
              break;
              
            case 'sizing':
            case 'spacing':
            case 'borderWidth':
            case 'borderRadius':
              if (typeof value === 'number') {
                value = `${value}px`;
              }
              break;
              
            case 'opacity':
              if (typeof value === 'number' && value > 1) {
                value = value / 100; // Convertir porcentaje a decimal
              }
              break;
              
            default:
              // Para tipos desconocidos, convertir a string
              if (typeof value === 'object' && value !== null) {
                value = JSON.stringify(value);
              }
          }
          
          // Generar el nombre de la variable CSS
          const path = [category, ...(prop.path || [])]
            .filter(Boolean)
            .map(normalizeTokenName)
            .filter(part => part && part !== 'default');
          
          const varName = path.join('-');
          css += `  --${varName}: ${value};${comment}\n`;
        });
      });
    });
    css += '}\n';
    return css;
  }
});

// Configuración principal de Style Dictionary
const StyleDictionaryConfig = {
  source: [path.resolve(__dirname, 'tokens/transformed/**/*.json')],
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: [
        'attribute/cti',
        'name/cti/kebab',
        'time/seconds',
        'content/icon',
        'size/px',
        'color/css'
      ],
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/theme-variables',
          options: {
            outputReferences: true,
          },
        },
        {
          destination: '../../src/tailwind.css',
          format: 'css/theme-variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    scss: {
      transformGroup: 'scss',
      transforms: [
        'attribute/cti',
        'name/cti/kebab',
        'time/seconds',
        'content/icon',
        'size/px',
        'color/css'
      ],
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
      transforms: [
        'attribute/cti',
        'name/cti/camel',
        'time/seconds',
        'content/icon',
        'size/px',
        'color/css'
      ],
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
  },
};

export default StyleDictionaryConfig;
