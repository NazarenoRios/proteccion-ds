import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Nombre del icono (ej: FaHome, MdHome, etc.)',
    },
    set: {
      control: 'select',
      options: [
        'fa', // Font Awesome
        'hi', // Heroicons
        'io', // Ionicons
        'md', // Material Design
        'ri', // Remix Icons
        'bi', // Bootstrap Icons
        'ai', // Ant Design Icons
        'bs', // Bootstrap Icons
        'tb', // Tabler Icons
        'gi', // Game Icons
        'wi', // Weather Icons
        'di', // Devicons
        'si', // Simple Icons
        'im', // IcoMoon Free
        'fi', // Feather Icons
        'cg', // CSS.gg
        'vsc', // VS Code Icons
        'go', // Github Octicons
        'gr', // Grommet Icons
        'ti', // Typicons
        'pi', // Phosphor Icons
        'lu', // Lucide Icons
        'ci', // Circum Icons
        'rx', // Radix Icons
        'tfi', // Themify Icons
        'lia', // Line Awesome
      ],
      description: 'Conjunto de iconos a utilizar',
    },
    size: {
      control: 'number',
      description: 'Tamaño del icono en píxeles',
    },
    color: {
      control: 'color',
      description: 'Color del icono',
    },
    className: {
      control: 'text',
      description: 'Clases CSS adicionales',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'FaHome',
    set: 'fa',
    size: 24,
  },
};

export const MaterialDesign: Story = {
  args: {
    name: 'MdHome',
    set: 'md',
    size: 24,
  },
};

export const Heroicons: Story = {
  args: {
    name: 'HiHome',
    set: 'hi',
    size: 24,
  },
};

export const RemixIcons: Story = {
  args: {
    name: 'RiHomeLine',
    set: 'ri',
    size: 24,
  },
};

export const CustomSize: Story = {
  args: {
    name: 'FaHome',
    set: 'fa',
    size: 48,
  },
};

export const CustomColor: Story = {
  args: {
    name: 'FaHome',
    set: 'fa',
    size: 24,
    color: '#FF0000',
  },
};
