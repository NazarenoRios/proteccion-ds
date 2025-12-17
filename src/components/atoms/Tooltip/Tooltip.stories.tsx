import { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Icon } from '../Icon/Icon';

export default {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    figma:
      'https://www.figma.com/design/sMJTAQgPqMvxAEgqAIgVTA/Protecci%C3%B3n---Sistema-de-Dise%C3%B1o--Copy-?node-id=4889-7037&t=64GXAX431PIpDkqA-4',
    layout: 'centered',
    docs: {
      description: {
        component:
          'Un componente de tooltip que muestra información adicional al hacer hover sobre un elemento.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'Contenido que se mostrará en el tooltip',
      defaultValue: 'Tooltip',
    },
    variant: {
      control: {
        type: 'select',
        options: [
          'arriba-izquierda',
          'arriba-centro',
          'arriba-derecha',
          'abajo-izquierda',
          'abajo-centro',
          'abajo-derecha',
          'izquierda-arriba',
          'izquierda-centro',
          'izquierda-abajo',
          'derecha-arriba',
          'derecha-centro',
          'derecha-abajo',
        ],
      },
      description: 'Posición del tooltip',
      defaultValue: 'arriba-centro',
    },
    size: {
      control: {
        type: 'select',
        options: ['M'],
      },
      description: 'Tamaño del tooltip',
      defaultValue: 'M',
    },
    active: {
      control: 'boolean',
      description: 'Si es true, el tooltip estará siempre visible',
      defaultValue: false,
    },
    animation: {
      control: {
        type: 'select',
        options: ['fade', 'scale', 'none'],
      },
      description: 'Tipo de animación',
      defaultValue: 'fade',
    },
    delay: {
      control: {
        type: 'number',
        min: 0,
        max: 1000,
        step: 50,
      },
      description: 'Tiempo de retraso para mostrar/ocultar el tooltip (ms)',
      defaultValue: 200,
    },
  },
} as Meta<typeof Tooltip>;

const Template: StoryObj<typeof Tooltip> = {
  render: args => (
    <div className="p-8">
      <Tooltip {...args}>
        <div className="p-2">
          <Icon name="placeholder" size={24} className="text-primary-azul-proteccion-500" />
        </div>
      </Tooltip>
    </div>
  ),
};

export const Default = {
  ...Template,
  args: {
    content: 'Tooltip',
    variant: 'arriba-centro',
    size: 'M',
    animation: 'fade',
    delay: 200,
    active: false,
  },
};

export const ActiveTooltip = {
  ...Template,
  args: {
    content: 'Tooltip activo',
    variant: 'abajo-centro',
    size: 'M',
    animation: 'fade',
    delay: 200,
    active: true,
  },
};

export const DifferentPositions = () => (
  <div className="flex flex-col space-y-8 items-center p-8">
    <div className="flex space-x-8">
      <Tooltip content="Tooltip arriba" variant="arriba-centro">
        <div className="p-2">
          <Icon name="placeholder" size={24} className="text-primary-azul-proteccion-500" />
        </div>
      </Tooltip>

      <Tooltip content="Tooltip derecha" variant="derecha-centro">
        <div className="p-2">
          <Icon name="placeholder" size={24} className="text-primary-azul-proteccion-500" />
        </div>
      </Tooltip>
    </div>

    <div className="flex space-x-8">
      <Tooltip content="Tooltip abajo" variant="abajo-centro">
        <div className="p-2">
          <Icon name="placeholder" size={24} className="text-primary-azul-proteccion-500" />
        </div>
      </Tooltip>

      <Tooltip content="Tooltip izquierda" variant="izquierda-centro">
        <div className="p-2">
          <Icon name="placeholder" size={24} className="text-primary-azul-proteccion-500" />
        </div>
      </Tooltip>
    </div>
  </div>
);

DifferentPositions.parameters = {
  docs: {
    description: {
      story: 'Ejemplos de tooltip en diferentes posiciones',
    },
  },
};

export const DifferentSizes = () => (
  <div className="flex space-x-8 p-8">
    <Tooltip content="Tooltip pequeño" size="M">
      <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
        <Icon name="info" size={20} className="text-primary-azul-proteccion-500" />
      </div>
    </Tooltip>

    <Tooltip content="Tooltip mediano" size="M">
      <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
        <Icon name="info" size={24} className="text-primary-azul-proteccion-500" />
      </div>
    </Tooltip>

    <Tooltip content="Tooltip grande" size="M">
      <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
        <Icon name="info" size={28} className="text-primary-azul-proteccion-500" />
      </div>
    </Tooltip>
  </div>
);

DifferentSizes.parameters = {
  docs: {
    description: {
      story: 'Diferentes tamaños de tooltip',
    },
  },
};

export const WithCustomContent = () => (
  <div className="p-8">
    <Tooltip
      content={
        <div className="text-center">
          <div className="font-bold text-primary-azul-proteccion-500 mb-1">¡Importante!</div>
          <p>Este es un tooltip con contenido personalizado</p>
          <p className="text-xs text-basic-neutral-400 mt-1">
            Puedes incluir cualquier elemento React
          </p>
        </div>
      }
    >
      <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
        <Icon name="info" size={24} className="text-primary-azul-proteccion-500" />
      </div>
    </Tooltip>
  </div>
);

WithCustomContent.parameters = {
  docs: {
    description: {
      story: 'Tooltip con contenido HTML personalizado',
    },
  },
};
