import typographyPlugin from '../typography.plugin';

type PluginAPIMock = {
  addComponents: jest.Mock;
  addBase: jest.Mock;
  addUtilities: jest.Mock;
  addVariant: jest.Mock;
  matchVariant: jest.Mock;
  theme: (key: string) => string;
  e: (str: string) => string;
  prefix: (str: string) => string;
  corePlugins: () => Record<string, boolean>;
  config: () => Record<string, unknown>;
};

describe('typography.plugin', () => {
  it('exports a Tailwind plugin object', () => {
    expect(typeof typographyPlugin).toBe('object');
    expect(typographyPlugin).toHaveProperty('handler');
  });

  it('adds typography classes using addComponents', () => {
    const addComponentsMock = jest.fn();

    const pluginAPI: PluginAPIMock = {
      addComponents: addComponentsMock,
      addBase: jest.fn(),
      addUtilities: jest.fn(),
      addVariant: jest.fn(),
      matchVariant: jest.fn(),
      theme: (key: string) => key,
      e: (str: string) => str,
      prefix: (str: string) => str,
      corePlugins: () => ({}),
      config: () => ({}),
    };

    // Ejecutamos el handler
    typographyPlugin.handler(pluginAPI as any);

    expect(addComponentsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        '.typography-h1': expect.any(Object),
        '.typography-paragraph': expect.any(Object),
      })
    );
  });
});
