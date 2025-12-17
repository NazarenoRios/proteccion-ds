import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toast, useToast, ToastContainer } from './Toast';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Toast> = {
  title: 'Molecules/Toast',
  component: Toast,
  parameters: {
    figma:
      'https://www.figma.com/design/sMJTAQgPqMvxAEgqAIgVTA/Protecci%C3%B3n---Sistema-de-Dise%C3%B1o--Copy-?node-id=615-3342&t=64GXAX431PIpDkqA-4',
    layout: 'fullscreen',
  },
  argTypes: {
    tipo: {
      control: 'select',
      options: ['información', 'advertencia', 'éxito', 'peligro'],
      description: 'Tipo de toast que determina el color e icono',
    },
    titulo: {
      control: 'text',
      description: 'Título opcional del toast',
    },
    dismissible: {
      control: 'boolean',
      description: 'Indica si el toast se puede cerrar manualmente',
    },
    autoCloseDelay: {
      control: 'number',
      description: 'Tiempo en ms antes del auto-cierre (0 = no auto cerrar)',
    },
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
        'top-center',
        'bottom-center',
      ],
      description: 'Posición del toast en la pantalla',
    },
    visible: {
      control: 'boolean',
      description: 'Indica si el toast está visible',
    },
    children: {
      control: 'text',
      description: 'Contenido/mensaje del toast',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Información: Story = {
  args: {
    tipo: 'información',
    titulo: 'Notificación tipo información',
    children:
      'Son generadas automáticamente por el sistema, para mostrar información sobre el funcionamiento del mismo.',
    visible: true,
    autoCloseDelay: 0, // No auto cerrar para la demo
  },
};

export const Advertencia: Story = {
  args: {
    tipo: 'advertencia',
    titulo: 'Notificación tipo advertencia',
    children:
      'Los mensajes de advertencia suelen emitirse en situaciones en las que es útil alertar al usuario de alguna condición.',
    visible: true,
    autoCloseDelay: 0,
  },
};

export const Éxito: Story = {
  args: {
    tipo: 'éxito',
    titulo: 'Notificación tipo exitosa',
    children:
      'Este mensaje se utiliza para notificar al usuario que una tarea se ha completado con éxito.',
    visible: true,
    autoCloseDelay: 0,
  },
};

export const Peligro: Story = {
  args: {
    tipo: 'peligro',
    titulo: 'Notificación tipo peligro',
    children:
      'Notifica cuando la acción realizada no ha podido ser completada, ya sea por una falla en el proceso.',
    visible: true,
    autoCloseDelay: 0,
  },
};

export const AutoClose: Story = {
  args: {
    tipo: 'información',
    titulo: 'Toast con auto-cierre',
    children: 'Este toast se cerrará automáticamente después de 5 segundos.',
    visible: true,
    autoCloseDelay: 5000,
  },
};

export const SinTítulo: Story = {
  args: {
    tipo: 'éxito',
    children: 'Toast sin título que solo muestra el mensaje principal.',
    visible: true,
    autoCloseDelay: 0,
  },
};

export const NoDissmissible: Story = {
  args: {
    tipo: 'información',
    titulo: 'Toast sin botón cerrar',
    children: 'Este toast no se puede cerrar manualmente.',
    visible: true,
    dismissible: false,
    autoCloseDelay: 0,
  },
};

export const Posiciones: Story = {
  render: () => {
    const [activePosition, setActivePosition] = useState<string | null>(null);

    const positions = [
      { key: 'top-left', label: 'Superior Izquierda' },
      { key: 'top-center', label: 'Superior Centro' },
      { key: 'top-right', label: 'Superior Derecha' },
      { key: 'bottom-left', label: 'Inferior Izquierda' },
      { key: 'bottom-center', label: 'Inferior Centro' },
      { key: 'bottom-right', label: 'Inferior Derecha' },
    ];

    return (
      <div className="p-8 min-h-screen bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">Posiciones del Toast</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl">
          {positions.map(pos => (
            <Button
              key={pos.key}
              variant="secondaryGeneral"
              onClick={() => {
                setActivePosition(activePosition === pos.key ? null : pos.key);
              }}
            >
              {pos.label}
            </Button>
          ))}
        </div>

        {activePosition && (
          <Toast
            tipo="información"
            titulo="Toast de demostración"
            children={`Toast en posición: ${positions.find(p => p.key === activePosition)?.label}`}
            position={activePosition as any}
            visible={true}
            autoCloseDelay={0}
            onClose={() => setActivePosition(null)}
          />
        )}
      </div>
    );
  },
};

export const SistemaCompleto: Story = {
  render: () => {
    const { toasts, addToast, removeAllToasts } = useToast();

    const showToast = (tipo: 'información' | 'advertencia' | 'éxito' | 'peligro') => {
      const mensajes = {
        información: 'Información importante del sistema.',
        advertencia: 'Advertencia: verifica los datos ingresados.',
        éxito: '¡Operación completada exitosamente!',
        peligro: 'Error: no se pudo completar la operación.',
      };

      addToast({
        tipo,
        titulo: `Notificación ${tipo}`,
        children: mensajes[tipo],
        autoCloseDelay: 4000,
      });
    };

    return (
      <div className="p-8 min-h-screen bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">Sistema de Toasts</h3>
        <div className="space-x-4 mb-4">
          <Button onClick={() => showToast('información')}>Toast Información</Button>
          <Button onClick={() => showToast('advertencia')}>Toast Advertencia</Button>
          <Button onClick={() => showToast('éxito')}>Toast Éxito</Button>
          <Button onClick={() => showToast('peligro')}>Toast Error</Button>
          <Button variant="secondaryGeneral" onClick={removeAllToasts}>
            Limpiar Todos
          </Button>
        </div>

        <ToastContainer toasts={toasts} position="top-right" />
      </div>
    );
  },
};
