// Este archivo ahora utiliza los tokens generados por Style Dictionary
// Las variables CSS están definidas en dist/css/variables.css e importadas en tailwind.css

// Para usar estos colores en componentes, utiliza la sintaxis de Tailwind:
// bg-[var(--color-primary-azul-protección-500)]
// text-[var(--color-secondary-información-600)]
// etc.

// Mapa de referencia para los colores
export const colorPalette = {
  primary: {
    azulProteccion: {
      100: 'var(--color-primary-azul-protección-100)',
      200: 'var(--color-primary-azul-protección-200)',
      300: 'var(--color-primary-azul-protección-300)',
      400: 'var(--color-primary-azul-protección-400)',
      500: 'var(--color-primary-azul-protección-500)',
      600: 'var(--color-primary-azul-protección-600)',
      700: 'var(--color-primary-azul-protección-700)',
      800: 'var(--color-primary-azul-protección-800)',
      900: 'var(--color-primary-azul-protección-900)',
    },
    amarilloProteccion: {
      100: 'var(--color-primary-amarillo-protección-100)',
      200: 'var(--color-primary-amarillo-protección-200)',
      300: 'var(--color-primary-amarillo-protección-300)',
      400: 'var(--color-primary-amarillo-protección-400)',
      500: 'var(--color-primary-amarillo-protección-500)',
      600: 'var(--color-primary-amarillo-protección-600)',
      700: 'var(--color-primary-amarillo-protección-700)',
      800: 'var(--color-primary-amarillo-protección-800)',
      900: 'var(--color-primary-amarillo-protección-900)',
    },
    aquaProteccion: {
      100: 'var(--color-primary-aqua-protección-100)',
      200: 'var(--color-primary-aqua-protección-200)',
      300: 'var(--color-primary-aqua-protección-300)',
      400: 'var(--color-primary-aqua-protección-400)',
      500: 'var(--color-primary-aqua-protección-500)',
      600: 'var(--color-primary-aqua-protección-600)',
      700: 'var(--color-primary-aqua-protección-700)',
      800: 'var(--color-primary-aqua-protección-800)',
      900: 'var(--color-primary-aqua-protección-900)',
    },
  },
  secondary: {
    informacion: {
      100: 'var(--color-secondary-información-100)',
      200: 'var(--color-secondary-información-200)',
      300: 'var(--color-secondary-información-300)',
      400: 'var(--color-secondary-información-400)',
      500: 'var(--color-secondary-información-500)',
      600: 'var(--color-secondary-información-600)',
      700: 'var(--color-secondary-información-700)',
      800: 'var(--color-secondary-información-800)',
      900: 'var(--color-secondary-información-900)',
    },
    exito: {
      100: 'var(--color-secondary-éxito-100)',
      200: 'var(--color-secondary-éxito-200)',
      300: 'var(--color-secondary-éxito-300)',
      400: 'var(--color-secondary-éxito-400)',
      500: 'var(--color-secondary-éxito-500)',
      600: 'var(--color-secondary-éxito-600)',
      700: 'var(--color-secondary-éxito-700)',
      800: 'var(--color-secondary-éxito-800)',
      900: 'var(--color-secondary-éxito-900)',
    },
    advertencia: {
      100: 'var(--color-secondary-advertencia-100)',
      200: 'var(--color-secondary-advertencia-200)',
      300: 'var(--color-secondary-advertencia-300)',
      400: 'var(--color-secondary-advertencia-400)',
      500: 'var(--color-secondary-advertencia-500)',
      600: 'var(--color-secondary-advertencia-600)',
      700: 'var(--color-secondary-advertencia-700)',
      800: 'var(--color-secondary-advertencia-800)',
      900: 'var(--color-secondary-advertencia-900)',
    },
    peligro: {
      100: 'var(--color-secondary-peligro-100)',
      200: 'var(--color-secondary-peligro-200)',
      300: 'var(--color-secondary-peligro-300)',
      400: 'var(--color-secondary-peligro-400)',
      500: 'var(--color-secondary-peligro-500)',
      600: 'var(--color-secondary-peligro-600)',
      700: 'var(--color-secondary-peligro-700)',
      800: 'var(--color-secondary-peligro-800)',
      900: 'var(--color-secondary-peligro-900)',
    },
  },
  basic: {
    negro: 'var(--color-basic-negro)',
    blanco: 'var(--color-basic-blanco)',
    overlayNegro: 'var(--color-basic-overlay-negro)',
    overlayBlanco: 'var(--color-basic-overlay-blanco)',
    neutral: {
      100: 'var(--color-basic-neutral-100)',
      200: 'var(--color-basic-neutral-200)',
      300: 'var(--color-basic-neutral-300)',
      400: 'var(--color-basic-neutral-400)',
      500: 'var(--color-basic-neutral-500)',
      600: 'var(--color-basic-neutral-600)',
      700: 'var(--color-basic-neutral-700)',
      800: 'var(--color-basic-neutral-800)',
      900: 'var(--color-basic-neutral-900)',
    },
  },
};

// Si se necesita acceder a los colores desde JavaScript, se pueden importar desde dist/js/tokens.js
// Ejemplo:
// import { ColorPrimaryAzulProtecciN500 } from '../../../dist/js/tokens';
