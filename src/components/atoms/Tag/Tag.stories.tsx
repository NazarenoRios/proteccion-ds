import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Etiqueta } from './Tag';

const meta: Meta<typeof Etiqueta> = {
  title: 'Atoms/Etiqueta',
  component: Etiqueta,
  parameters: {
    figma:
      'https://www.figma.com/design/sMJTAQgPqMvxAEgqAIgVTA/Protecci%C3%B3n---Sistema-de-Dise%C3%B1o--Copy-?node-id=641-1304&t=64GXAX431PIpDkqA-4',
    docs: {
      description: {
        component:
          '[📐 Ver diseño en Figma](https://www.figma.com/design/sMJTAQgPqMvxAEgqAIgVTA/Protecci%C3%B3n---Sistema-de-Dise%C3%B1o--Copy-?node-id=641-1304&t=64GXAX431PIpDkqA-4)',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    etiqueta: {
      control: 'text',
      description: 'Texto de la etiqueta',
    },
    variante: {
      control: 'select',
      options: ['información', 'neutral', 'éxito', 'advertencia', 'peligro'],
      description: 'Variante visual de la etiqueta',
      table: {
        defaultValue: { summary: 'información' },
      },
    },
    removible: {
      control: 'boolean',
      description: 'Indica si la etiqueta se puede eliminar',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onRemove: { action: 'removed' },
  },
};

export default meta;
type Story = StoryObj<typeof Etiqueta>;

export const Predeterminada: Story = {
  args: {
    etiqueta: 'Etiqueta',
    variante: 'información',
    removible: false,
  },
};

export const Información: Story = {
  args: {
    etiqueta: 'Información',
    variante: 'información',
    removible: false,
  },
};

export const Neutral: Story = {
  args: {
    etiqueta: 'Neutral',
    variante: 'neutral',
    removible: false,
  },
};

export const Éxito: Story = {
  args: {
    etiqueta: 'Éxito',
    variante: 'éxito',
    removible: false,
  },
};

export const Advertencia: Story = {
  args: {
    etiqueta: 'Advertencia',
    variante: 'advertencia',
    removible: false,
  },
};

export const Peligro: Story = {
  args: {
    etiqueta: 'Peligro',
    variante: 'peligro',
    removible: false,
  },
};

// Historias interactivas para etiquetas removibles
export const RemovibleInteractiva: Story = {
  render: args => {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return (
        <div className="space-y-4">
          <div className="text-sm text-gray-500 italic">
            Etiqueta removida.
            <button
              onClick={() => setVisible(true)}
              className="ml-2 text-blue-600 hover:text-blue-800 underline"
            >
              Restaurar
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <Etiqueta
          {...args}
          removible={true}
          onRemove={() => {
            setVisible(false);
            args.onRemove?.();
          }}
        />
        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
          Etiqueta visible - Haz clic en la X para eliminar
        </div>
      </div>
    );
  },
  args: {
    etiqueta: 'Etiqueta Removible',
    variante: 'información',
  },
};

export const RemovibleInformación: Story = {
  args: {
    etiqueta: 'Removible',
    variante: 'información',
    removible: true,
  },
};

export const RemovibleNeutral: Story = {
  args: {
    etiqueta: 'Removible',
    variante: 'neutral',
    removible: true,
  },
};

export const RemovibleÉxito: Story = {
  args: {
    etiqueta: 'Removible',
    variante: 'éxito',
    removible: true,
  },
};

export const RemovibleAdvertencia: Story = {
  args: {
    etiqueta: 'Removible',
    variante: 'advertencia',
    removible: true,
  },
};

export const RemoviblePeligro: Story = {
  args: {
    etiqueta: 'Removible',
    variante: 'peligro',
    removible: true,
  },
};

export const TodasLasVariantes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Etiqueta etiqueta="Información" variante="información" />
      <Etiqueta etiqueta="Neutral" variante="neutral" />
      <Etiqueta etiqueta="Éxito" variante="éxito" />
      <Etiqueta etiqueta="Advertencia" variante="advertencia" />
      <Etiqueta etiqueta="Peligro" variante="peligro" />
    </div>
  ),
};

export const TodasRemoviblesInteractivas: Story = {
  render: () => {
    const [etiquetas, setEtiquetas] = useState([
      { id: 1, etiqueta: 'Información', variante: 'información' as const },
      { id: 2, etiqueta: 'Neutral', variante: 'neutral' as const },
      { id: 3, etiqueta: 'Éxito', variante: 'éxito' as const },
      { id: 4, etiqueta: 'Advertencia', variante: 'advertencia' as const },
      { id: 5, etiqueta: 'Peligro', variante: 'peligro' as const },
    ]);

    const eliminarEtiqueta = (id: number) => {
      setEtiquetas(prev => prev.filter(e => e.id !== id));
    };

    const restaurarTodas = () => {
      setEtiquetas([
        { id: 1, etiqueta: 'Información', variante: 'información' as const },
        { id: 2, etiqueta: 'Neutral', variante: 'neutral' as const },
        { id: 3, etiqueta: 'Éxito', variante: 'éxito' as const },
        { id: 4, etiqueta: 'Advertencia', variante: 'advertencia' as const },
        { id: 5, etiqueta: 'Peligro', variante: 'peligro' as const },
      ]);
    };

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-800">Etiquetas Removibles</h3>
          <button
            onClick={restaurarTodas}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Restaurar Todas
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {etiquetas.map(item => (
            <Etiqueta
              key={item.id}
              etiqueta={item.etiqueta}
              variante={item.variante}
              removible
              onRemove={() => eliminarEtiqueta(item.id)}
            />
          ))}
          {etiquetas.length === 0 && (
            <p className="text-gray-500 italic">
              Todas las etiquetas han sido removidas. Usa "Restaurar Todas" para volver a verlas.
            </p>
          )}
        </div>

        <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <h4 className="font-medium text-purple-800 mb-2">Estado Actual:</h4>
          <div className="text-sm text-purple-700">
            <strong>Etiquetas restantes:</strong> {etiquetas.length}
          </div>
          <pre className="text-xs text-purple-600 mt-2">
            {JSON.stringify(
              etiquetas.map(e => ({ etiqueta: e.etiqueta, variante: e.variante })),
              null,
              2
            )}
          </pre>
        </div>
      </div>
    );
  },
};

export const EjemploReal: Story = {
  render: () => {
    const [tecnologias, setTecnologias] = useState([
      { id: 1, etiqueta: 'React', variante: 'información' as const },
      { id: 2, etiqueta: 'TypeScript', variante: 'neutral' as const },
      { id: 3, etiqueta: 'Tailwind CSS', variante: 'éxito' as const },
    ]);

    const [estados, setEstados] = useState([
      { id: 4, etiqueta: 'En desarrollo', variante: 'advertencia' as const },
      { id: 5, etiqueta: 'Listo para producción', variante: 'éxito' as const },
      { id: 6, etiqueta: 'Requiere revisión', variante: 'peligro' as const },
    ]);

    const [removibles, setRemovibles] = useState([
      { id: 7, etiqueta: 'JavaScript', variante: 'información' as const },
      { id: 8, etiqueta: 'Frontend', variante: 'neutral' as const },
      { id: 9, etiqueta: 'Accesible', variante: 'éxito' as const },
      { id: 10, etiqueta: 'Beta', variante: 'advertencia' as const },
      { id: 11, etiqueta: 'Deprecated', variante: 'peligro' as const },
    ]);

    const eliminarRemovible = (id: number) => {
      setRemovibles(prev => prev.filter(e => e.id !== id));
    };

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Tecnologías (Solo lectura):</h3>
          <div className="flex flex-wrap gap-2">
            {tecnologias.map(item => (
              <Etiqueta key={item.id} etiqueta={item.etiqueta} variante={item.variante} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Estado del proyecto (Solo lectura):
          </h3>
          <div className="flex flex-wrap gap-2">
            {estados.map(item => (
              <Etiqueta key={item.id} etiqueta={item.etiqueta} variante={item.variante} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Etiquetas removibles (Interactivas):
          </h3>
          <div className="flex flex-wrap gap-2">
            {removibles.map(item => (
              <Etiqueta
                key={item.id}
                etiqueta={item.etiqueta}
                variante={item.variante}
                removible
                onRemove={() => eliminarRemovible(item.id)}
              />
            ))}
            {removibles.length === 0 && (
              <p className="text-gray-500 italic text-sm">
                Todas las etiquetas removibles han sido eliminadas.
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-800 mb-2">Estadísticas:</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div>• Tecnologías: {tecnologias.length}</div>
            <div>• Estados: {estados.length}</div>
            <div>• Removibles restantes: {removibles.length}</div>
            <div>
              • Total de etiquetas: {tecnologias.length + estados.length + removibles.length}
            </div>
          </div>
        </div>
      </div>
    );
  },
};
