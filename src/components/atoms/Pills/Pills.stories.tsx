import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pills } from './Pills';

const meta: Meta<typeof Pills> = {
  title: 'Atoms/Pills',
  component: Pills,
  parameters: {
    figma:
      'https://www.figma.com/design/sMJTAQgPqMvxAEgqAIgVTA/Protecci%C3%B3n---Sistema-de-Dise%C3%B1o--Copy-?node-id=8455-27020&t=64GXAX431PIpDkqA-4',
    layout: 'centered',
    docs: {
      description: {
        component: `
Las Pills son componentes de seleccion que permiten al usuario elegir una opcion de un conjunto de alternativas. Funcionan como radio buttons pero con un diseno mas moderno y visual.

## Caracteristicas principales

- **Seleccion unica**: Solo una pill puede estar seleccionada a la vez en un grupo
- **Estados visuales**: Activo, Hover, Pressed y Disabled
- **Variantes**: General (azul) e Inversion (neutral)
- **Contadores**: Soporte para mostrar numeros de resultados
- **Accesibilidad**: Implementacion completa con ARIA y navegacion por teclado
- **Responsive**: Se adapta automaticamente al contenedor

## Pautas de uso

### Cuando usar Pills
- Para filtros de contenido
- Para seleccion de categorias
- Para navegacion entre secciones relacionadas
- Cuando necesitas mostrar contadores de resultados

### Mejores practicas
- Usa etiquetas claras y concisas
- Agrupa pills relacionadas logicamente
- Considera usar contadores cuando sea relevante mostrar cantidad de resultados
- Mantén un numero razonable de pills por grupo (3-7 opciones idealmente)
        `,
      },
    },
  },
  argTypes: {
    selectedId: {
      control: 'text',
      description: 'ID de la pill seleccionada',
    },
    variant: {
      control: 'select',
      options: ['general', 'inversion'],
      description: 'Variante visual de las pills',
    },
    onSelect: { action: 'selected' },
  },
};

export default meta;
type Story = StoryObj<typeof Pills>;

// Wrapper para manejar el estado en las historias
const PillsWrapper: React.FC<{
  children: (args: {
    selectedId: string | undefined;
    onSelect: (id: string) => void;
  }) => React.ReactNode;
  initialSelected?: string;
}> = ({ children, initialSelected }) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(initialSelected);

  return (
    <>
      {children({
        selectedId,
        onSelect: setSelectedId,
      })}
    </>
  );
};

export const Default: Story = {
  render: args => (
    <PillsWrapper initialSelected="pill-1">
      {({ selectedId, onSelect }) => (
        <Pills
          {...args}
          selectedId={selectedId}
          onSelect={onSelect}
          options={[
            { id: 'pill-1', label: 'Pill-general' },
            { id: 'pill-2', label: 'Pill-general' },
            { id: 'pill-3', label: 'Pill-general' },
          ]}
        />
      )}
    </PillsWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pills basicas con variante general. Solo una puede estar seleccionada a la vez.',
      },
    },
  },
};

export const VariantGeneral: Story = {
  render: args => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-3">Activo</h3>
        <PillsWrapper initialSelected="active-1">
          {({ selectedId, onSelect }) => (
            <Pills
              {...args}
              variant="general"
              selectedId={selectedId}
              onSelect={onSelect}
              options={[
                { id: 'active-1', label: 'Pill-general' },
                { id: 'active-2', label: 'Pill-general' },
              ]}
            />
          )}
        </PillsWrapper>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-3">Hover (pasa el mouse)</h3>
        <Pills
          {...args}
          variant="general"
          selectedId={undefined}
          onSelect={() => {}}
          options={[
            { id: 'hover-1', label: 'Pill-general' },
            { id: 'hover-2', label: 'Pill-general' },
          ]}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-3">Pressed (haz clic)</h3>
        <Pills
          {...args}
          variant="general"
          selectedId={undefined}
          onSelect={() => {}}
          options={[
            { id: 'pressed-1', label: 'Pill-general' },
            { id: 'pressed-2', label: 'Pill-general' },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes estados de las pills con variante General.',
      },
    },
  },
};

export const VariantInversion: Story = {
  render: args => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-3">Activo</h3>
        <PillsWrapper initialSelected="inv-active-1">
          {({ selectedId, onSelect }) => (
            <Pills
              {...args}
              variant="inversion"
              selectedId={selectedId}
              onSelect={onSelect}
              options={[
                { id: 'inv-active-1', label: 'Pill-Inversion' },
                { id: 'inv-active-2', label: 'Pill-Inversion' },
              ]}
            />
          )}
        </PillsWrapper>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-3">Hover (pasa el mouse)</h3>
        <Pills
          {...args}
          variant="inversion"
          selectedId={undefined}
          onSelect={() => {}}
          options={[
            { id: 'inv-hover-1', label: 'Pill-Inversion' },
            { id: 'inv-hover-2', label: 'Pill-Inversion' },
          ]}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-3">Pressed (haz clic)</h3>
        <Pills
          {...args}
          variant="inversion"
          selectedId={undefined}
          onSelect={() => {}}
          options={[
            { id: 'inv-pressed-1', label: 'Pill-Inversion' },
            { id: 'inv-pressed-2', label: 'Pill-Inversion' },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes estados de las pills con variante Inversion.',
      },
    },
  },
};

export const WithResults: Story = {
  render: args => (
    <PillsWrapper initialSelected="results-1">
      {({ selectedId, onSelect }) => (
        <Pills
          {...args}
          selectedId={selectedId}
          onSelect={onSelect}
          options={[
            { id: 'results-1', label: 'Pill-general', count: 32 },
            { id: 'results-2', label: 'Pill-general', count: 12 },
            { id: 'results-3', label: 'Pill-general', count: 8 },
          ]}
        />
      )}
    </PillsWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Pills con contadores de resultados. Los numeros se muestran en pastillas amarillas.',
      },
    },
  },
};

export const MixedContent: Story = {
  render: args => (
    <PillsWrapper initialSelected="mixed-2">
      {({ selectedId, onSelect }) => (
        <Pills
          {...args}
          selectedId={selectedId}
          onSelect={onSelect}
          options={[
            { id: 'mixed-1', label: 'Todas' },
            { id: 'mixed-2', label: 'Con resultados', count: 45 },
            { id: 'mixed-3', label: 'Sin resultados' },
            { id: 'mixed-4', label: 'Populares', count: 123 },
          ]}
        />
      )}
    </PillsWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Mezcla de pills con y sin contadores en el mismo grupo.',
      },
    },
  },
};

export const FilterExample: Story = {
  render: args => (
    <PillsWrapper initialSelected="filter-all">
      {({ selectedId, onSelect }) => (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Filtrar productos</h3>
          <Pills
            {...args}
            selectedId={selectedId}
            onSelect={onSelect}
            options={[
              { id: 'filter-all', label: 'Todos', count: 156 },
              { id: 'filter-electronics', label: 'Electronicos', count: 45 },
              { id: 'filter-clothing', label: 'Ropa', count: 67 },
              { id: 'filter-books', label: 'Libros', count: 28 },
              { id: 'filter-sports', label: 'Deportes', count: 16 },
            ]}
          />
          <p className="text-sm text-gray-600">
            Seleccionado: {selectedId} - Mostrando resultados para esta categoria
          </p>
        </div>
      )}
    </PillsWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo practico de uso como filtros de productos con contadores.',
      },
    },
  },
};

export const DisabledStates: Story = {
  render: args => (
    <PillsWrapper initialSelected="enabled-1">
      {({ selectedId, onSelect }) => (
        <Pills
          {...args}
          selectedId={selectedId}
          onSelect={onSelect}
          options={[
            { id: 'enabled-1', label: 'Habilitada' },
            { id: 'enabled-2', label: 'Habilitada', count: 25 },
            { id: 'disabled-1', label: 'Deshabilitada', disabled: true },
            { id: 'disabled-2', label: 'Deshabilitada', count: 0, disabled: true },
          ]}
        />
      )}
    </PillsWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Pills con estados deshabilitados. Las pills deshabilitadas no pueden ser seleccionadas.',
      },
    },
  },
};

export const LongLabels: Story = {
  render: args => (
    <PillsWrapper initialSelected="long-1">
      {({ selectedId, onSelect }) => (
        <div className="max-w-md">
          <Pills
            {...args}
            selectedId={selectedId}
            onSelect={onSelect}
            options={[
              { id: 'long-1', label: 'Etiqueta corta' },
              { id: 'long-2', label: 'Etiqueta un poco mas larga' },
              { id: 'long-3', label: 'Etiqueta muy larga que se extiende', count: 99 },
              { id: 'long-4', label: 'Texto extenso para probar responsive' },
            ]}
          />
        </div>
      )}
    </PillsWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Pills con etiquetas de diferentes longitudes para probar el comportamiento responsive.',
      },
    },
  },
};

export const BothVariants: Story = {
  render: args => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Variante General</h3>
        <PillsWrapper initialSelected="gen-2">
          {({ selectedId, onSelect }) => (
            <Pills
              {...args}
              variant="general"
              selectedId={selectedId}
              onSelect={onSelect}
              options={[
                { id: 'gen-1', label: 'Opcion 1', count: 42 },
                { id: 'gen-2', label: 'Opcion 2', count: 18 },
                { id: 'gen-3', label: 'Opcion 3', count: 7 },
              ]}
            />
          )}
        </PillsWrapper>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Variante Inversion</h3>
        <PillsWrapper initialSelected="inv-1">
          {({ selectedId, onSelect }) => (
            <Pills
              {...args}
              variant="inversion"
              selectedId={selectedId}
              onSelect={onSelect}
              options={[
                { id: 'inv-1', label: 'Opcion A', count: 89 },
                { id: 'inv-2', label: 'Opcion B', count: 56 },
                { id: 'inv-3', label: 'Opcion C', count: 23 },
              ]}
            />
          )}
        </PillsWrapper>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparacion lado a lado de ambas variantes del componente.',
      },
    },
  },
};
