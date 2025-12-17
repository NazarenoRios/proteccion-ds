import type { Meta, StoryObj } from '@storybook/react';
import { Alerta } from './Alert';

const meta: Meta<typeof Alerta> = {
  title: 'Atoms/Alerta',
  component: Alerta,
  parameters: {
    figma:
      'https://www.figma.com/design/sMJTAQgPqMvxAEgqAIgVTA/Protecci%C3%B3n---Sistema-de-Dise%C3%B1o--Copy-?node-id=425-2322&t=64GXAX431PIpDkqA-4',
    layout: 'padded',
  },
  argTypes: {
    tipo: {
      control: 'select',
      options: ['información', 'advertencia', 'éxito', 'peligro'],
      description: 'Tipo de alerta que determina el color e icono',
    },
    titulo: {
      control: 'text',
      description: 'Título opcional de la alerta',
    },
    dismissible: {
      control: 'boolean',
      description: 'Indica si la alerta se puede cerrar',
    },
    children: {
      control: 'text',
      description: 'Contenido/mensaje de la alerta',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Información: Story = {
  args: {
    tipo: 'información',
    titulo: 'Notificación tipo Informativa',
    children:
      'Se utiliza para brindar información, novedades, o proporciona algún tipo de dato o instrucción necesaria para realizar una acción dentro del sistema.',
  },
};

export const Advertencia: Story = {
  args: {
    tipo: 'advertencia',
    titulo: 'Notificación tipo Advertencia',
    children:
      'Se utiliza para informar o alertar un potencial problema y, en lo posible, brinda una breve explicación de como resolverlo.',
  },
};

export const Éxito: Story = {
  args: {
    tipo: 'éxito',
    titulo: 'Notificación tipo Exitosa',
    children: 'Se utiliza para informar procesos exitosos del sistema.',
  },
};

export const Peligro: Story = {
  args: {
    tipo: 'peligro',
    titulo: 'Notificación tipo Peligro',
    children: 'Se utiliza para informar al usuario procesos de fallas o problemas del sistema.',
  },
};

export const Dismissible: Story = {
  args: {
    tipo: 'información',
    titulo: 'Alerta que se puede cerrar',
    children: 'Esta alerta incluye un botón para cerrarla.',
    dismissible: true,
  },
};

export const SinTítulo: Story = {
  args: {
    tipo: 'advertencia',
    children: 'Alerta sin título que solo muestra el mensaje principal.',
  },
};

export const MensajeLargo: Story = {
  args: {
    tipo: 'información',
    titulo: 'Ejemplo con mensaje extenso',
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
    dismissible: true,
  },
};

export const TodasLasVariantes: Story = {
  render: () => (
    <div className="space-y-4">
      <Alerta tipo="información" titulo="Información">
        Mensaje de información con datos importantes.
      </Alerta>
      <Alerta tipo="advertencia" titulo="Advertencia">
        Mensaje de advertencia sobre una situación potencial.
      </Alerta>
      <Alerta tipo="éxito" titulo="Éxito">
        Operación completada exitosamente.
      </Alerta>
      <Alerta tipo="peligro" titulo="Error" dismissible>
        Ha ocurrido un error que requiere atención.
      </Alerta>
    </div>
  ),
};
