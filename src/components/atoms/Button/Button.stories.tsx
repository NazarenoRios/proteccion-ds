import React from 'react';
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
      description: 'Estilo visual del botón',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del botón',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Muestra un indicador de carga',
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita el botón',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Hace que el botón ocupe todo el ancho disponible',
    },
    leftIcon: {
      control: 'text',
      description: 'Nombre del icono a mostrar a la izquierda',
    },
    rightIcon: {
      control: 'text',
      description: 'Nombre del icono a mostrar a la derecha',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Botón Primario',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story:
          'El botón primario utiliza el color azul de la marca (primary-500) y se usa para acciones principales.',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    children: 'Botón Secundario',
    variant: 'secondary',
  },
  parameters: {
    docs: {
      description: {
        story:
          'El botón secundario utiliza el color amarillo de la marca (primary-yellow-500) y se usa para acciones secundarias.',
      },
    },
  },
};

export const Outline: Story = {
  args: {
    children: 'Botón Outline',
    variant: 'outline',
  },
  parameters: {
    docs: {
      description: {
        story:
          'El botón outline tiene un borde del color principal (primary-500) y se usa para acciones menos prominentes.',
      },
    },
  },
};

export const Ghost: Story = {
  args: {
    children: 'Botón Ghost',
    variant: 'ghost',
  },
  parameters: {
    docs: {
      description: {
        story:
          'El botón ghost no tiene fondo y usa el color principal (primary-500) para el texto. Se usa para acciones terciarias.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    children: 'Botón Pequeño',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Botón Mediano',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Botón Grande',
    size: 'lg',
  },
};

export const Loading: Story = {
  args: {
    children: 'Cargando',
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Deshabilitado',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Ancho Completo',
    fullWidth: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: 'Con Icono Izquierdo',
    leftIcon: 'HiChevronRight',
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Con Icono Derecho',
    rightIcon: 'MdChevhronRight',
  },
};

export const WithBothIcons: Story = {
  args: {
    children: 'Con Ambos Iconos',
    leftIcon: 'MdChevhronLeft',
    rightIcon: 'MdChevhronRight',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4">
        <Button variant="primary">Primario</Button>
        <Button variant="secondary">Secundario</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div className="flex space-x-4">
        <Button size="sm">Pequeño</Button>
        <Button size="md">Mediano</Button>
        <Button size="lg">Grande</Button>
      </div>
      <div className="flex space-x-4">
        <Button isLoading>Cargando</Button>
        <Button disabled>Deshabilitado</Button>
      </div>
      <div className="flex space-x-4">
        <Button leftIcon="arrow-left">Icono Izquierdo</Button>
        <Button rightIcon="arrow-right">Icono Derecho</Button>
      </div>
    </div>
  ),
};
