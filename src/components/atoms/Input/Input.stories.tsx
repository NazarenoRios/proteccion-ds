import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'filled'],
      description: 'Variante visual del campo de entrada',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del campo de entrada',
    },
    disabled: {
      control: 'boolean',
      description: 'Indica si el campo está deshabilitado',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Indica si el campo debe ocupar todo el ancho disponible',
    },
    ariaLabel: {
      control: 'text',
      description: 'Etiqueta ARIA para accesibilidad',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Ingresa texto...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Usuario',
    placeholder: 'Ingresa tu usuario',
  },
};

export const WithError: Story = {
  args: {
    label: 'Correo',
    placeholder: 'Ingresa tu correo',
    error: 'Por favor ingresa un correo válido',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    placeholder: 'Campo outline',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    placeholder: 'Campo relleno',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Campo pequeño',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Campo grande',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Campo deshabilitado',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    placeholder: 'Campo de ancho completo',
    fullWidth: true,
  },
};

export const WithIcons: Story = {
  args: {
    placeholder: 'Buscar...',
    leftIcon: '🔍',
    rightIcon: '✕',
  },
};

export const WithEvents: Story = {
  args: {
    placeholder: 'Escribe algo...',
    onChange: e => console.log('Valor cambiado:', e.target.value),
    onFocus: () => console.log('Campo enfocado'),
    onBlur: () => console.log('Campo desenfocado'),
    onKeyDown: e => console.log('Tecla presionada:', e.key),
  },
};

export const WithAriaLabel: Story = {
  args: {
    placeholder: 'Campo accesible',
    ariaLabel: 'Este es un campo de entrada accesible',
  },
};
