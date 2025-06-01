import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Variante visual del botón',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del botón',
    },
    isLoading: {
      control: 'boolean',
      description: 'Indica si el botón está en estado de carga',
    },
    disabled: {
      control: 'boolean',
      description: 'Indica si el botón está deshabilitado',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Indica si el botón debe ocupar todo el ancho disponible',
    },
    ariaLabel: {
      control: 'text',
      description: 'Etiqueta ARIA para accesibilidad',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Tipo de botón HTML',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Button',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Button',
    variant: 'ghost',
  },
};

export const Small: Story = {
  args: {
    children: 'Botón',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Botón',
    size: 'lg',
  },
};

export const Loading: Story = {
  args: {
    children: 'Botón',
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Botón',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Botón',
    fullWidth: true,
  },
};

export const WithIcons: Story = {
  args: {
    children: 'Botón',
    leftIcon: '←',
    rightIcon: '→',
  },
};

export const WithEvents: Story = {
  args: {
    children: 'Haz click',
    onClick: () => alert('¡Botón clickeado!'),
    onMouseEnter: () => console.log('Mouse entró'),
    onMouseLeave: () => console.log('Mouse salió'),
  },
};

export const WithAriaLabel: Story = {
  args: {
    children: 'Botón Accesible',
    ariaLabel: 'Este es un botón accesible',
  },
};

export const SubmitButton: Story = {
  args: {
    children: 'Enviar',
    type: 'submit',
  },
};
