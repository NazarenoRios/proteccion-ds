import plugin from 'tailwindcss/plugin';

export default plugin(({ addComponents, theme }) => {
  addComponents({
    // Headings
    '.typography-h1': {
      fontFamily: theme('fontFamily.primary'),
      fontWeight: '400',
      fontSize: '2.125rem', // 34pt
      lineHeight: '38pt',
      '&.bold': {
        fontWeight: '700',
      },
    },
    '.typography-h2': {
      fontFamily: theme('fontFamily.primary'),
      fontWeight: '400',
      fontSize: '2.5rem', // 30pt
      lineHeight: '34pt',
      '&.bold': {
        fontWeight: '700',
      },
    },
    '.typography-h3': {
      fontFamily: theme('fontFamily.primary'),
      fontWeight: '400',
      fontSize: '2.166rem', // 26pt
      lineHeight: '29pt',
      '&.bold': {
        fontWeight: '700',
      },
    },
    '.typography-h4': {
      fontFamily: theme('fontFamily.primary'),
      fontWeight: '400',
      fontSize: '1.833rem', // 22pt
      lineHeight: '25pt',
      '&.bold': {
        fontWeight: '700',
      },
    },
    '.typography-h5': {
      fontFamily: theme('fontFamily.primary'),
      fontWeight: '400',
      fontSize: '1.5rem', // 18pt
      lineHeight: '20pt',
      '&.bold': {
        fontWeight: '700',
      },
    },
    '.typography-h6': {
      fontFamily: theme('fontFamily.primary'),
      fontWeight: '400',
      fontSize: '1.3rem', // 16pt
      lineHeight: '18pt',
      '&.bold': {
        fontWeight: '700',
      },
    },

    // Text Styles
    '.typography-lead': {
      fontFamily: theme('fontFamily.primary'),
      fontWeight: '400',
      fontSize: '1.5rem', // 18pt
      lineHeight: '25pt',
      '&.bold': {
        fontWeight: '700',
      },
    },
    '.typography-paragraph': {
      fontFamily: theme('fontFamily.primary'),
      fontWeight: '400',
      fontSize: '1.3rem', // 16pt
      lineHeight: '18pt',
      '&.bold': {
        fontWeight: '700',
      },
    },
    '.typography-caption': {
      fontFamily: theme('fontFamily.primary'),
      fontWeight: '400',
      fontSize: '1.3rem', // 16pt
      lineHeight: '18pt',
      '&.bold': {
        fontWeight: '700',
      },
    },
    '.typography-mini-caption': {
      fontFamily: theme('fontFamily.primary'),
      fontWeight: '400',
      fontSize: '0.916rem', // 11pt
      lineHeight: '16pt',
      '&.bold': {
        fontWeight: '700',
      },
    },
    '.typography-mini-caption-mobile': {
      fontFamily: theme('fontFamily.primary'),
      fontWeight: '400',
      fontSize: '0.667rem', // 8pt
      lineHeight: '16pt',
      '&.bold': {
        fontWeight: '700',
      },
    },

    // Button Typography
    '.typography-button-link': {
      fontFamily: theme('fontFamily.primary'),
      fontWeight: '400',
      fontSize: '1.5rem', // 15pt
      lineHeight: '22pt',
    },
    '.typography-button-link-reduced': {
      fontFamily: theme('fontFamily.primary'),
      fontWeight: '400',
      fontSize: '1.5rem', // 13pt
      lineHeight: '19pt',
    },
    '.typography-button-link-breadcrumb': {
      fontFamily: theme('fontFamily.primary'),
      fontWeight: '400',
      fontSize: '1.5rem', // 11pt
      lineHeight: '16pt',
    },
    '.typography-button-action': {
      fontFamily: theme('fontFamily.primary'),
      fontWeight: '400',
      fontSize: '1.5rem', // 16pt
      lineHeight: '24pt',
    },
    '.typography-button-action-reduced': {
      fontFamily: theme('fontFamily.primary'),
      fontWeight: '400',
      fontSize: '1.5rem', // 13pt
      lineHeight: '20pt',
    },

    // Input Typography
    '.typography-input-placeholder': {
      fontFamily: theme('fontFamily.primary'),
      fontWeight: '400',
      fontSize: '1.5rem', // 15pt
      lineHeight: '22pt',
    },

    // Tab Typography
    '.typography-tab': {
      fontFamily: theme('fontFamily.primary'),
      fontWeight: '400',
      fontSize: '1.5rem', // 13pt
      lineHeight: '20pt',
    },
  });
});
