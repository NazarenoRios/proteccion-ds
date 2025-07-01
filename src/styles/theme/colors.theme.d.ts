export interface ColorScale {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface AlertColor {
  base: string;
  scale: ColorScale;
}

export interface ColorPalette {
  primary: {
    azulProteccion: ColorScale;
    amarilloProteccion: ColorScale;
    aquaProteccion: ColorScale;
  };
  secondary: {
    informacion: ColorScale;
    exito: ColorScale;
    advertencia: ColorScale;
    peligro: ColorScale;
  };
  basic: {
    negro: string;
    blanco: string;
    overlayNegro: string;
    overlayBlanco: string;
    neutral: ColorScale;
  };
}

export const colorPalette: ColorPalette;
