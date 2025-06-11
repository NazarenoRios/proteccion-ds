export interface ColorScale {
  100: string;
  200: string;
  300: string;
  400: string;
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
    blue: string;
    yellow: string;
    aqua: string;
    blueScale: ColorScale;
    yellowScale: ColorScale;
    aquaScale: ColorScale;
  };
  background: {
    screen: string;
    overlayBlack: string;
    overlayWhite: string;
  };
  alert: {
    info: AlertColor;
    success: AlertColor;
    warning: AlertColor;
    error: AlertColor;
  };
  neutral: {
    base: string;
    scale: ColorScale;
  };
}

export const colorPalette: ColorPalette;
