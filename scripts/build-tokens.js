/**
 * Script para construir tokens usando Style Dictionary
 *
 * Este script ejecuta Style Dictionary para transformar los tokens
 * a los diferentes formatos de salida definidos en la configuración.
 */

import StyleDictionary from 'style-dictionary';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

(async () => {
  try {
    // Importar la configuración
    const config = (await import(configPath)).default;

    // Ejecutar Style Dictionary con la configuración
    const styleDictionary = StyleDictionary.extend(config);
    styleDictionary.buildAllPlatforms();

    console.log('✅ Tokens generados correctamente para todas las plataformas');
  } catch (error) {
    console.error('Error al construir los tokens:', error);
    process.exit(1);
  }
})();
