import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    figma:
      'https://www.figma.com/design/sMJTAQgPqMvxAEgqAIgVTA/Protecci%C3%B3n---Sistema-de-Dise%C3%B1o--Copy-?node-id=239-2050&t=oROrdoh2R9bGA2VC-4',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primaryGeneral',
        'primaryInverse',
        'secondaryGeneral',
        'secondaryInverse',
        'tertiaryGeneral',
        'tertiaryInverse',
      ],
      description: 'Estilo visual del botón',
      table: {
        defaultValue: { summary: 'primaryGeneral' },
      },
    },
    size: {
      control: 'select',
      options: ['S', 'M', 'L'],
      description: 'Tamaño del botón',
      table: {
        defaultValue: { summary: 'M' },
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

export const Primario: Story = {
  args: {
    children: 'Botón Primario',
    variant: 'primaryGeneral',
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

export const PrimarioInverso: Story = {
  args: {
    children: 'Botón Primario Inverso',
    variant: 'primaryInverse',
  },
  parameters: {
    docs: {
      description: {
        story:
          'El botón primario inverso utiliza el color amarillo de la marca (primary-yellow-500) y se usa para acciones principales.',
      },
    },
  },
};

export const Secundario: Story = {
  args: {
    children: 'Botón Secundario',
    variant: 'secondaryGeneral',
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

export const SecundarioInverso: Story = {
  args: {
    children: 'Botón Secundario Inverso',
    variant: 'secondaryInverse',
  },
  parameters: {
    docs: {
      description: {
        story:
          'El botón secundario inverso utiliza el color azul de la marca (primary-500) y se usa para acciones secundarias.',
      },
    },
  },
};

export const Terciario: Story = {
  args: {
    children: 'Botón Terciario',
    variant: 'tertiaryGeneral',
  },
  parameters: {
    docs: {
      description: {
        story:
          'El botón terciario utiliza el color azul de la marca (primary-500) y se usa para acciones terciarias.',
      },
    },
  },
};

export const TerciarioInverso: Story = {
  args: {
    children: 'Botón Terciario Inverso',
    variant: 'tertiaryInverse',
  },
  parameters: {
    docs: {
      description: {
        story:
          'El botón terciario inverso utiliza el color azul de la marca (primary-500) y se usa para acciones terciarias.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    children: 'Botón Pequeño',
    size: 'S',
  },
};

export const Medium: Story = {
  args: {
    children: 'Botón Mediano',
    size: 'M',
  },
};

export const Large: Story = {
  args: {
    children: 'Botón Grande',
    size: 'L',
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
    leftIcon: 'plus',
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Con Icono Derecho',
    rightIcon: 'plus',
  },
};

export const WithBothIcons: Story = {
  args: {
    children: 'Con Ambos Iconos',
    leftIcon: 'plus',
    rightIcon: 'plus',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4">
        <Button variant="primaryGeneral">Primario</Button>
        <Button variant="primaryInverse">Primario Inverso</Button>
        <Button variant="secondaryGeneral">Secundario</Button>
        <Button variant="secondaryInverse">Secundario Inverso</Button>
        <Button variant="tertiaryGeneral">Terciario</Button>
        <Button variant="tertiaryInverse">Terciario Inverso</Button>
      </div>
      <div className="flex space-x-4">
        <Button size="S">Pequeño</Button>
        <Button size="M">Mediano</Button>
        <Button size="L">Grande</Button>
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
