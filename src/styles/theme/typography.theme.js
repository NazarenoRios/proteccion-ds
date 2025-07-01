// Este archivo ahora utiliza los tokens generados por Style Dictionary
// Las variables CSS están definidas en dist/css/variables.css e importadas en tailwind.css

export const typography = {
  fontFamily: {
    primary: 'var(--typography-fontFamily-suraSans-value)',
  },
  fontWeight: {
    regular: 'var(--typography-fontWeight-regular-value)',
    bold: 'var(--typography-fontWeight-negrita-value)',
    semibold: 'var(--typography-fontWeight-seminegrita-value)',
  },
  heading: {
    h1: {
      regular: {
        fontSize: 'var(--typography-fontSize-xxxl-value)',
        lineHeight: 'var(--typography-lineHeight-xxxl-value)',
        fontWeight: 'var(--typography-fontWeight-regular-value)',
      },
      bold: {
        fontSize: 'var(--typography-fontSize-xxxl-value)',
        lineHeight: 'var(--typography-lineHeight-xxxl-value)',
        fontWeight: 'var(--typography-fontWeight-negrita-value)',
      },
    },
    h2: {
      regular: {
        fontSize: 'var(--typography-fontSize-xxl-value)',
        lineHeight: 'var(--typography-lineHeight-xxl-value)',
        fontWeight: 'var(--typography-fontWeight-regular-value)',
      },
      bold: {
        fontSize: 'var(--typography-fontSize-xxl-value)',
        lineHeight: 'var(--typography-lineHeight-xxl-value)',
        fontWeight: 'var(--typography-fontWeight-negrita-value)',
      },
    },
    h3: {
      regular: {
        fontSize: 'var(--typography-fontSize-xl-value)',
        lineHeight: 'var(--typography-lineHeight-xl-value)',
        fontWeight: 'var(--typography-fontWeight-regular-value)',
      },
      bold: {
        fontSize: 'var(--typography-fontSize-xl-value)',
        lineHeight: 'var(--typography-lineHeight-xl-value)',
        fontWeight: 'var(--typography-fontWeight-negrita-value)',
      },
    },
    h4: {
      regular: {
        fontSize: 'var(--typography-fontSize-l-value)',
        lineHeight: 'var(--typography-lineHeight-l-value)',
        fontWeight: 'var(--typography-fontWeight-regular-value)',
      },
      bold: {
        fontSize: 'var(--typography-fontSize-l-value)',
        lineHeight: 'var(--typography-lineHeight-l-value)',
        fontWeight: 'var(--typography-fontWeight-negrita-value)',
      },
    },
    h5: {
      regular: {
        fontSize: 'var(--typography-fontSize-m-value)',
        lineHeight: 'var(--typography-lineHeight-s-value)',
        fontWeight: 'var(--typography-fontWeight-regular-value)',
      },
      bold: {
        fontSize: 'var(--typography-fontSize-m-value)',
        lineHeight: 'var(--typography-lineHeight-s-value)',
        fontWeight: 'var(--typography-fontWeight-negrita-value)',
      },
    },
    h6: {
      regular: {
        fontSize: 'var(--typography-fontSize-s-value)',
        lineHeight: 'var(--typography-lineHeight-xxs-value)',
        fontWeight: 'var(--typography-fontWeight-regular-value)',
      },
      bold: {
        fontSize: 'var(--typography-fontSize-s-value)',
        lineHeight: 'var(--typography-lineHeight-xxs-value)',
        fontWeight: 'var(--typography-fontWeight-negrita-value)',
      },
    },
  },
  text: {
    lead: {
      regular: {
        fontSize: 'var(--typography-fontSize-m-value)',
        lineHeight: 'var(--typography-lineHeight-l-value)',
        fontWeight: 'var(--typography-fontWeight-regular-value)',
      },
      bold: {
        fontSize: 'var(--typography-fontSize-m-value)',
        lineHeight: 'var(--typography-lineHeight-m-value)',
        fontWeight: 'var(--typography-fontWeight-seminegrita-value)',
      },
    },
    paragraph: {
      regular: {
        fontSize: 'var(--typography-fontSize-xs-value)',
        lineHeight: 'var(--typography-lineHeight-s-value)',
        fontWeight: 'var(--typography-fontWeight-regular-value)',
      },
      bold: {
        fontSize: 'var(--typography-fontSize-xs-value)',
        lineHeight: 'var(--typography-lineHeight-m-value)',
        fontWeight: 'var(--typography-fontWeight-negrita-value)',
      },
    },
    caption: {
      regular: {
        fontSize: 'var(--typography-fontSize-xxs-value)',
        lineHeight: 'var(--typography-lineHeight-xs-value)',
        fontWeight: 'var(--typography-fontWeight-regular-value)',
      },
      bold: {
        fontSize: 'var(--typography-fontSize-xxs-value)',
        lineHeight: 'var(--typography-lineHeight-xs-value)',
        fontWeight: 'var(--typography-fontWeight-negrita-value)',
      },
    },
    miniCaption: {
      regular: {
        fontSize: 'var(--typography-fontSize-xxxs-value)',
        lineHeight: 'var(--typography-lineHeight-xxxs-value)',
        fontWeight: 'var(--typography-fontWeight-regular-value)',
      },
      bold: {
        fontSize: 'var(--typography-fontSize-xxxs-value)',
        lineHeight: 'var(--typography-lineHeight-xxxs-value)',
        fontWeight: 'var(--typography-fontWeight-negrita-value)',
      },
    },
    miniCaptionMobile: {
      regular: {
        fontSize: 'var(--typography-fontSize-mini-value)',
        lineHeight: 'var(--typography-lineHeight-xxxs-value)',
        fontWeight: 'var(--typography-fontWeight-regular-value)',
      },
      bold: {
        fontSize: 'var(--typography-fontSize-mini-value)',
        lineHeight: 'var(--typography-lineHeight-xxxs-value)',
        fontWeight: 'var(--typography-fontWeight-negrita-value)',
      },
    },
  },
  button: {
    link: {
      paragraph: {
        fontSize: 'var(--typography-fontSize-xs-value)',
        lineHeight: 'var(--typography-lineHeight-m-value)',
        fontWeight: 'var(--typography-fontWeight-regular-value)',
        textDecoration: 'underline',
      },
      caption: {
        fontSize: 'var(--typography-fontSize-xxs-value)',
        lineHeight: 'var(--typography-lineHeight-xs-value)',
        fontWeight: 'var(--typography-fontWeight-regular-value)',
        textDecoration: 'underline',
      },
      breadcrumb: {
        fontSize: 'var(--typography-fontSize-xxxs-value)',
        lineHeight: 'var(--typography-lineHeight-xxxs-value)',
        fontWeight: 'var(--typography-fontWeight-regular-value)',
        textDecoration: 'underline',
      },
    },
    action: {
      regular: {
        fontSize: 'var(--typography-fontSize-s-value)',
        lineHeight: 'var(--typography-lineHeight-button-value)',
        fontWeight: 'var(--typography-fontWeight-regular-value)',
      },
      small: {
        fontSize: 'var(--typography-fontSize-xxs-value)',
        lineHeight: 'var(--typography-lineHeight-s-value)',
        fontWeight: 'var(--typography-fontWeight-regular-value)',
      },
    },
  },
  input: {
    placeholder: {
      fontSize: 'var(--typography-fontSize-xs-value)',
      lineHeight: 'var(--typography-lineHeight-s-value)',
      fontWeight: 'var(--typography-fontWeight-regular-value)',
    },
  },
  tab: {
    fontSize: 'var(--typography-fontSize-xxs-value)',
    lineHeight: 'var(--typography-lineHeight-s-value)',
    fontWeight: 'var(--typography-fontWeight-negrita-value)',
  },
};

// Para usar estos estilos de tipografía en componentes, utiliza la sintaxis de Tailwind:
// font-[var(--typography-fontFamily-suraSans-value)]
// text-[var(--typography-fontSize-m-value)]
// leading-[var(--typography-lineHeight-s-value)]
// etc.

// También puedes crear clases personalizadas en tailwind.config.js para facilitar su uso
