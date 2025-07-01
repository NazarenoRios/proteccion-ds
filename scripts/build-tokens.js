/**
 * Script para construir tokens usando Style Dictionary
 *
 * Este script ejecuta Style Dictionary para transformar los tokens
 * a los diferentes formatos de salida definidos en la configuración.
 */

const StyleDictionary = require('style-dictionary');
const path = require('path');
const fs = require('fs');

// Ruta al archivo de configuración
const configPath = path.resolve(__dirname, '../style-dictionary.config.js');

// Verificar si el archivo de configuración existe
if (!fs.existsSync(configPath)) {
  console.error('Error: El archivo de configuración de Style Dictionary no existe.');
  process.exit(1);
}

// Verificar si existen tokens transformados
const transformedTokensPath = path.resolve(__dirname, '../tokens/transformed/tokens.json');
if (!fs.existsSync(transformedTokensPath)) {
  console.error('Error: No se encontraron tokens transformados.');
  console.log('Por favor, ejecuta primero el script transform-tokens.js');
  process.exit(1);
}

try {
  // Importar la configuración
  const config = require(configPath);

  // Ejecutar Style Dictionary con la configuración
  const styleDictionary = StyleDictionary.extend(config);
  styleDictionary.buildAllPlatforms();

  console.log('✅ Tokens generados correctamente para todas las plataformas');
} catch (error) {
  console.error('Error al construir los tokens:', error);
  process.exit(1);
}
