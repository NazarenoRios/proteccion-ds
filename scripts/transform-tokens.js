/**
 * Script para transformar tokens exportados de Figma
 *
 * Este script utiliza token-transformer para convertir los tokens exportados
 * desde Figma Tokens a un formato compatible con Style Dictionary.
 */

import fs from 'fs';
import path from 'path';
import { transformTokens } from 'token-transformer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas de archivos
const figmaTokensPath = path.resolve(__dirname, '../tokens/figma/tokens.json');
const transformedTokensPath = path.resolve(__dirname, '../tokens/transformed');

// Asegurarse de que el directorio de destino existe
if (!fs.existsSync(transformedTokensPath)) {
  fs.mkdirSync(transformedTokensPath, { recursive: true });
}

// Verificar si el archivo de tokens de Figma existe
if (!fs.existsSync(figmaTokensPath)) {
  console.error('Error: El archivo de tokens de Figma no existe en tokens/figma/tokens.json');
  console.log('Por favor, exporta primero los tokens desde Figma.');
  process.exit(1);
}

try {
  // Leer los tokens de Figma
  const figmaTokensContent = fs.readFileSync(figmaTokensPath, 'utf8');
  const figmaTokens = JSON.parse(figmaTokensContent);

  // Obtener los nombres de los conjuntos de tokens (sets)
  const tokenSets = Object.keys(figmaTokens);

  console.log('Conjuntos de tokens encontrados:', tokenSets);

  // Transformar tokens para cada plataforma
  const transformedTokens = transformTokens(
    figmaTokens, // Tokens originales
    tokenSets, // Sets a incluir
    [], // Sets a excluir
    true, // Resolver referencias
    {
      expandTypography: true,
      expandShadow: true,
      expandComposition: true,
      preserveRawValue: false,
      throwErrorWhenNotResolved: false,
      resolveReferences: true,
    }
  );



  // Reorganizar tokens para Style Dictionary
  const reorganizedTokens = {
    color: {},
    shadow: {},
    typography: {},
    font: {
      family: {},
      weight: {}
    },
    text: {},
    spacing: {},
    border: {},
    radius: {},
    breakpoint: {},
    opacity: {}
  };

    // Copiar sets base a la raíz del objeto reorganizado si existen
const baseSets = [
  'fontFamilies', 'fontWeights', 'lineHeights', 'fontSize',
  'letterSpacing', 'paragraphSpacing', 'paragraphIndent',
  'textCase', 'textDecoration'
];

baseSets.forEach(set => {
  if (figmaTokens[set]) {
    reorganizedTokens[set] = figmaTokens[set];
  }
});

  // Función para normalizar nombres de tokens
  const normalizeTokenName = (name) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Procesar colores
  const processColorTokens = (prefix, source) => {
    if (!source) return;
    
    reorganizedTokens.color[prefix] = {};
    Object.entries(source).forEach(([key, value]) => {
      if (typeof value === 'object' && !Array.isArray(value)) {
        const normalizedKey = normalizeTokenName(key);
        reorganizedTokens.color[prefix][normalizedKey] = value;
      }
    });
  };

  // Procesar colores principales, secundarios y básicos
  processColorTokens('primary', figmaTokens['Color primario']);
  processColorTokens('secondary', figmaTokens['Color secundario']);
  processColorTokens('basic', figmaTokens['Color básico']);

  // Procesar sombras
  const shadowKeys = ['XXS Sombra', 'XS Sombra', 'S Sombra', 'M Sombra', 'L Sombra', 'XL Sombra'];
  shadowKeys.forEach(shadowKey => {
    if (figmaTokens[shadowKey]) {
      const size = shadowKey.split(' ')[0].toLowerCase();
      const shadowValue = figmaTokens[shadowKey].value;

      if (Array.isArray(shadowValue)) {
        reorganizedTokens.shadow[size] = {
          value: shadowValue,
          type: 'boxShadow',
        };
      }
    }
  });

  // Procesar fuentes
  reorganizedTokens.fontFamilies = {
    'sura-sans-0': { value: 'Sura Sans Regular', type: 'fontFamilies' },
    'sura-sans-1': { value: 'Sura Sans Negrita', type: 'fontFamilies' },
    'sura-sans-2': { value: 'Sura Sans Seminegrita', type: 'fontFamilies' },
    'sura-sans': { value: 'Sura Sans', type: 'fontFamilies' } // Mantener la referencia original para la tipografía
  };
  
  reorganizedTokens.fontWeights = {
    'sura-sans-0': { value: '400', type: 'fontWeights' },
    'sura-sans-1': { value: '700', type: 'fontWeights' },
    'sura-sans-2': { value: '600', type: 'fontWeights' },
    'sura-sans-regular': { value: '400', type: 'fontWeights' },
    'sura-sans-negrita': { value: '700', type: 'fontWeights' },
    'sura-sans-seminegrita': { value: '600', type: 'fontWeights' }
  };

  // Procesar tipografía
  if (figmaTokens['typography']) {
    reorganizedTokens.typography = JSON.parse(JSON.stringify(figmaTokens['typography']));
    
    // Actualizar referencias de tipografía para usar las fuentes correctas
    const updateTypographyRefs = (obj) => {
      if (typeof obj !== 'object' || obj === null) return;
      
      for (const key in obj) {
        if (key === 'fontFamily' && obj[key] === '{fontFamilies.sura-sans}') {
          // Usar la fuente regular por defecto
          obj[key] = '{fontFamilies.sura-sans-0}';
        } else if (key === 'fontWeight') {
          if (obj[key] === '{fontWeights.sura-sans-0}') {
            obj[key] = '{fontWeights.sura-sans-regular}';
          } else if (obj[key] === '{fontWeights.sura-sans-1}') {
            obj[key] = '{fontWeights.sura-sans-negrita}';
          } else if (obj[key] === '{fontWeights.sura-sans-2}') {
            obj[key] = '{fontWeights.sura-sans-seminegrita}';
          }
        } else {
          updateTypographyRefs(obj[key]);
        }
      }
    };
    
    updateTypographyRefs(reorganizedTokens.typography);
  }

  if (figmaTokens['fontSize']) {
    reorganizedTokens.text = reorganizedTokens.text || {};
    Object.entries(figmaTokens['fontSize']).forEach(([key, value]) => {
      const sizeName = normalizeTokenName(key);
      reorganizedTokens.text[`size-${sizeName}`] = value;
    });
  }

  // Procesar espaciado
  if (figmaTokens['spacing']) {
    Object.entries(figmaTokens['spacing']).forEach(([key, value]) => {
      const spacingName = `spacing-${key}`;
      reorganizedTokens.spacing[spacingName] = value;
    });
  }

  // Procesar bordes
  if (figmaTokens['borderWidths']) {
    Object.entries(figmaTokens['borderWidths']).forEach(([key, value]) => {
      reorganizedTokens.border[`width-${key}`] = value;
    });
  }

  // Procesar radios de borde
  if (figmaTokens['radii']) {
    Object.entries(figmaTokens['radii']).forEach(([key, value]) => {
      reorganizedTokens.radius[`radius-${key}`] = value;
    });
  }

  // Procesar opacidades
  if (figmaTokens['opacities']) {
    Object.entries(figmaTokens['opacities']).forEach(([key, value]) => {
      reorganizedTokens.opacity[`opacity-${key}`] = value;
    });
  }

  // Procesar tipografías de escritorio
  if (figmaTokens['Desktop']) {
    reorganizedTokens.typography.desktop = {};
    
    // Procesar encabezados
    if (figmaTokens['Desktop']['Headings']) {
      reorganizedTokens.typography.desktop.headings = {};
      
      Object.entries(figmaTokens['Desktop']['Headings']).forEach(([heading, styles]) => {
        const headingName = normalizeTokenName(heading);
        reorganizedTokens.typography.desktop.headings[headingName] = {};
        
        Object.entries(styles).forEach(([styleName, styleValue]) => {
          if (styleValue && styleValue.value) {
            reorganizedTokens.typography.desktop.headings[headingName][styleName.toLowerCase()] = styleValue.value;
          }
        });
      });
    }
    
    // Procesar cuerpo de texto
    if (figmaTokens['Desktop']['Body']) {
      reorganizedTokens.typography.desktop.body = {};
      
      Object.entries(figmaTokens['Desktop']['Body']).forEach(([textType, styles]) => {
        const typeName = normalizeTokenName(textType);
        reorganizedTokens.typography.desktop.body[typeName] = {};
        
        Object.entries(styles).forEach(([styleName, styleValue]) => {
          if (styleValue && styleValue.value) {
            reorganizedTokens.typography.desktop.body[typeName][styleName.toLowerCase()] = styleValue.value;
          }
        });
      });
    }
  }

  // Guardar los tokens transformados
  fs.writeFileSync(
    path.resolve(transformedTokensPath, 'tokens.json'),
    JSON.stringify(reorganizedTokens, null, 2),
    'utf8'
  );

  console.log('Tokens transformados correctamente y guardados en tokens/transformed/tokens.json');
} catch (error) {
  console.error('Error al transformar los tokens:', error);
  process.exit(1);
}
