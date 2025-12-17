import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';
import { Step } from '../../../types/common';

const meta: Meta<typeof Stepper> = {
  title: 'Organisms/Stepper',
  component: Stepper,
  parameters: {
    figma:
      'https://www.figma.com/design/sMJTAQgPqMvxAEgqAIgVTA/Protecci%C3%B3n---Sistema-de-Dise%C3%B1o--Copy-?node-id=4552-11956&t=64GXAX431PIpDkqA-4',
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['number', 'icon', 'inversion'],
      description: 'Variante del stepper',
      table: {
        defaultValue: { summary: 'number' },
      },
    },
    onStepClick: {
      action: 'stepClicked',
      description: 'Se dispara cuando se hace clic en un paso',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

// Datos de ejemplo para los pasos
const steps: Step[] = [
  {
    id: 'step-1',
    title: 'Datos personales',
    description: 'Información básica',
    status: 'Activo',
    icon: 'Rostro',
  },
  {
    id: 'step-2',
    title: 'Seguridad',
    description: 'Configuración de seguridad',
    status: 'Realizado',
    icon: 'Data-Seguridad',
  },
  {
    id: 'step-3',
    title: 'Huella',
    description: 'Registro biométrico',
    status: 'Inactivo',
    icon: 'Huella',
  },
  {
    id: 'step-4',
    title: 'Verificación',
    description: 'Validación de identidad',
    status: 'Inactivo',
    icon: 'Huella-User',
  },
  {
    id: 'step-5',
    title: 'Confirmación',
    description: 'Revisión final',
    status: 'Inactivo',
    icon: 'Huella-Check',
  },
];

export const Number: Story = {
  args: {
    steps: steps,
    variant: 'number',
  },
  parameters: {
    docs: {
      description: {
        component:
          '[📐 Ver diseño en Figma](https://www.figma.com/design/sMJTAQgPqMvxAEgqAIgVTA?node-id=4552-11956)',
        story: 'Stepper en orientación horizontal',
      },
    },
  },
};

export const Icon: Story = {
  args: {
    steps: steps,
    variant: 'icon',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Stepper en orientación vertical con iconos personalizados. Para usar iconos, agrega la propiedad `icon` a cada paso con el nombre del ícono a mostrar. Los iconos solo se muestran en la variante vertical.',
      },
    },
  },
};

export const HorizontalWithIcons: Story = {
  args: {
    steps: steps.map(step => ({
      ...step,
      icon: undefined,
    })),
    variant: 'number',
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper en orientación horizontal (sin iconos, solo números)',
      },
    },
  },
};

export const Inversion: Story = {
  args: {
    steps: steps,
    variant: 'inversion',
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper con la variante de inversión que utiliza los colores amarillos de la marca',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    steps: steps,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Stepper interactivo (haz clic en los pasos para ver la acción en el panel de acciones)',
      },
    },
  },
};
