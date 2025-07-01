/**
 * Script para transformar tokens exportados de Figma
 *
 * Este script utiliza token-transformer para convertir los tokens exportados
 * desde Figma Tokens a un formato compatible con Style Dictionary.
 */

const fs = require('fs');
const path = require('path');
const { transformTokens } = require('token-transformer');

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
    // Añadir otras categorías según sea necesario
  };

  // Procesar colores
  if (figmaTokens['Color primario']) {
    reorganizedTokens.color.primary = {};
    Object.entries(figmaTokens['Color primario']).forEach(([key, value]) => {
      if (typeof value === 'object' && !Array.isArray(value)) {
        reorganizedTokens.color.primary[key.toLowerCase().replace(' ', '-')] = value;
      }
    });
  }

  if (figmaTokens['Color secundario']) {
    reorganizedTokens.color.secondary = {};
    Object.entries(figmaTokens['Color secundario']).forEach(([key, value]) => {
      if (typeof value === 'object' && !Array.isArray(value)) {
        reorganizedTokens.color.secondary[key.toLowerCase().replace(' ', '-')] = value;
      }
    });
  }

  if (figmaTokens['Color básico']) {
    reorganizedTokens.color.basic = {};
    Object.entries(figmaTokens['Color básico']).forEach(([key, value]) => {
      if (typeof value === 'object' && !Array.isArray(value)) {
        reorganizedTokens.color.basic[key.toLowerCase().replace(' ', '-')] = value;
      } else {
        reorganizedTokens.color.basic[key.toLowerCase().replace(' ', '-')] = { value };
      }
    });
  }

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
