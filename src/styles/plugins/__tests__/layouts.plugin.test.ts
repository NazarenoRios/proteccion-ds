import { customLayoutsPlugins } from '../layouts.plugin';

describe('layouts.plugin', () => {
  it('exports an array with a function', () => {
    expect(Array.isArray(customLayoutsPlugins)).toBe(true);
    expect(typeof customLayoutsPlugins[0]).toBe('function');
  });

  it('adds the correct CSS for .px-21', () => {
    const addComponentsMock = jest.fn();
    customLayoutsPlugins[0]({ addComponents: addComponentsMock });
    expect(addComponentsMock).toHaveBeenCalledWith({
      '.px-21': {
        paddingRight: '84px',
        paddingLeft: '84px',
      },
    });
  });
});
