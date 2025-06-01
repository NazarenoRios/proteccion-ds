import { colorPalette } from './colors.theme';

export const isMobile = () => window.innerWidth <= 640;

export const breakpoints = {
  'n-web-xl': '(max-width: 1920px) or (max-height: 1080px)',
  'web-xl': '(min-width: 1920px) and (min-height: 1080px)',
  'web-md': '(max-width: 1440px) and (max-height: 1024px)',
  'web-sm': '(max-width: 1280px) and (max-height: 720px)',
  'tablet-md-land': '(max-width: 1280px) and (max-height: 1024px)',
  'tablet-md': '(max-width: 1024px) and (max-height: 1280px)',
  'tablet-sm-land': '(max-width: 1024px) and (max-height: 600px)',
  'tablet-sm': '(max-width: 600px) and (max-height: 1024px)',
  mobile: '(max-width: 414px) and (max-height: 736px)',
  'mobile-land': '(max-width: 736px) and (max-height: 414px)',
};

export const mainTheme = {
  fontSize: {
    94: '94px',
    59: '59px',
    47: '47px',
    33: '33px',
    24: '24px',
    20: '20px',
  },
  letterSpacing: {
    x: '-1.5px',
    0: '0px',
    0.1: '0.1px',
    0.15: '0.15px',
    0.4: '0.4px',
    0.5: '0.5px',
    0.75: '0.75px',
    1: '1px',
    1.25: '1.25px',
    1.5: '1.5px',
    2: '2px',
    2.5: '2.5px',
    3: '3px',
    3.5: '3.5px',
    4: '4px',
    4.5: '4.5px',
    5: '5px',
  },
  extend: {
    fontSize: {
      h1: '94px',
      h2: '59px',
      h3: '47px',
      h4: '33px',
      h5: '24px',
      h6: '20px',
      h7: '24px',
      16: '16px',
      15: '15px',
      14: '14px',
      13: '13px',
      12: '12px',
      10: '10px',
    },
    spacing: {
      21: '84px',
    },
    fontFamily: {
      f1: ['Encode Sans'],
      //'theme-f2': ['"Lora"', "serif"],
    },
    fontWeight: {
      200: '200',
      600: '600',
    },
    fontVariationSettings: {
      'fv-wght-100': "'wght' 100",
      'fv-wght-200': "'wght' 200",
      'fv-wght-300': "'wght' 300",
      'fv-wght-400': "'wght' 400",
      'fv-wght-500': "'wght' 500",
      'fv-wght-600': "'wght' 600",
      'fv-wght-700': "'wght' 700",
      'fv-fill-1': "'FILL' 1",
      'fv-fill-0': "'FILL' 0",
      'fv-grad-25': "'GRAD' -25",
      'fv-grad-0': "'GRAD' 0",
      'fv-grad-200': "'GRAD' 200",
      'fv-opsz-20': "'opsz' 20",
      'fv-opsz-24': "'opsz' 24",
      'fv-opsz-40': "'opsz' 40",
      'fv-opsz-48': "'opsz' 48",
    },
    screens: {
      // Breakpoints combinados de ancho y altura,
      '-web-xl': { raw: breakpoints['n-web-xl'] }, // Web-xlarge
      'web-xl': { raw: breakpoints['web-xl'] }, // Web-xlarge
      'web-md': { raw: breakpoints['web-md'] }, // Web-medium
      'web-sm': { raw: breakpoints['web-sm'] }, // Web-small
      'tablet-md-land': { raw: breakpoints['tablet-md-land'] }, // Tablet-medium-landscape TODO: era 1366 lo cambie a 1280
      'tablet-md': { raw: breakpoints['tablet-md'] }, // Tablet-medium TODO: era 1366 lo cambie a 1280
      'tablet-sm-land': { raw: breakpoints['tablet-sm-land'] }, // Tablet-small-landscape
      'tablet-sm': { raw: breakpoints['tablet-sm'] }, // Tablet-small
      mobile: { raw: breakpoints['mobile'] }, // Mobile
      'mobile-land': { raw: breakpoints['mobile-land'] }, // Mobile-landscape
      //
      'w-s': { raw: '(min-width: 1280px)' },
      'w-m': { raw: '(min-width: 1440px)' },
      'w-l': { raw: '(min-width: 1920px)' },
    },
    boxShadow: {
      'primary-hover': `0px 0px 0px 2px ${colorPalette.primary[70]}`,
    },
  },
  colors: colorPalette,
};
