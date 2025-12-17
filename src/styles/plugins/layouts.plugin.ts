export const customLayoutsPlugins = [
  function ({ addComponents }: { addComponents: (components: any) => void }) {
    addComponents({
      '.px-21': {
        paddingRight: '84px',
        paddingLeft: '84px',
      },
    });
  },
];
