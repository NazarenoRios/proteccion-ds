import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Interruptor } from './Switch';

const meta: Meta<typeof Interruptor> = {
  title: 'Atoms/Interruptor',
  component: Interruptor,
  parameters: {
    figma:
      'https://www.figma.com/design/sMJTAQgPqMvxAEgqAIgVTA/Protecci%C3%B3n---Sistema-de-Dise%C3%B1o--Copy-?node-id=7906-23006&t=64GXAX431PIpDkqA-4',
    docs: {
      description: {
        component:
          '[📐 Ver diseño en Figma](https://www.figma.com/design/sMJTAQgPqMvxAEgqAIgVTA/Protecci%C3%B3n---Sistema-de-Dise%C3%B1o--Copy-?node-id=7906-23006&t=64GXAX431PIpDkqA-4)',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Indica si el interruptor está activado',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['general', 'inversion'],
      description: 'Variante de estilo',
      table: {
        defaultValue: { summary: 'general' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Indica si el interruptor está deshabilitado',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Etiqueta del interruptor (se posiciona a la izquierda)',
    },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Interruptor>;

// Historia interactiva por defecto
export const Interactivo: Story = {
  render: args => {
    const [checked, setChecked] = useState(args.checked || false);

    return (
      <div className="space-y-4">
        <Interruptor
          {...args}
          checked={checked}
          onChange={newChecked => {
            setChecked(newChecked);
            args.onChange?.(newChecked);
          }}
        />
        <p className="text-sm text-basic-neutral-600">
          Estado actual: {checked ? 'Activado' : 'Desactivado'}
        </p>
      </div>
    );
  },
  args: {
    label: 'Texto de etiqueta',
    checked: false,
    variant: 'general',
  },
};

// Matriz de estados como en Figma
export const MatrizEstados: Story = {
  render: () => (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold text-basic-neutral-900 mb-4">Estados según Figma</h3>

      {/* Headers */}
      <div className="grid grid-cols-5 gap-4 mb-4">
        <div></div>
        <div className="text-center text-sm font-medium text-basic-neutral-600">Default</div>
        <div className="text-center text-sm font-medium text-basic-neutral-600">Hover</div>
        <div className="text-center text-sm font-medium text-basic-neutral-600">Focus</div>
        <div className="text-center text-sm font-medium text-basic-neutral-600">Disable</div>
      </div>

      {/* Variante General */}
      <div className="space-y-4">
        <h4 className="text-base font-medium text-basic-neutral-700 border-b pb-2">General</h4>

        <div className="grid grid-cols-5 gap-4 items-center">
          <div className="text-sm font-medium text-basic-neutral-700">Activado</div>
          <div className="flex justify-center">
            <Interruptor checked={true} onChange={() => {}} />
          </div>
          <div className="flex justify-center">
            <div className="hover:scale-105 transition-transform">
              <Interruptor checked={true} onChange={() => {}} />
            </div>
          </div>
          <div className="flex justify-center">
            <Interruptor checked={true} onChange={() => {}} />
          </div>
          <div className="flex justify-center">
            <Interruptor checked={true} disabled onChange={() => {}} />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 items-center">
          <div className="text-sm font-medium text-basic-neutral-700">Desactivado</div>
          <div className="flex justify-center">
            <Interruptor checked={false} onChange={() => {}} />
          </div>
          <div className="flex justify-center">
            <div className="hover:scale-105 transition-transform">
              <Interruptor checked={false} onChange={() => {}} />
            </div>
          </div>
          <div className="flex justify-center">
            <Interruptor checked={false} onChange={() => {}} />
          </div>
          <div className="flex justify-center">
            <Interruptor checked={false} disabled onChange={() => {}} />
          </div>
        </div>
      </div>

      {/* Variante Inversión */}
      <div className="space-y-4">
        <h4 className="text-base font-medium text-basic-neutral-700 border-b pb-2">Inversión</h4>

        <div className="grid grid-cols-5 gap-4 items-center">
          <div className="text-sm font-medium text-basic-neutral-700">Activado</div>
          <div className="flex justify-center">
            <Interruptor checked={true} variant="inversion" onChange={() => {}} />
          </div>
          <div className="flex justify-center">
            <div className="hover:scale-105 transition-transform">
              <Interruptor checked={true} variant="inversion" onChange={() => {}} />
            </div>
          </div>
          <div className="flex justify-center">
            <Interruptor checked={true} variant="inversion" onChange={() => {}} />
          </div>
          <div className="flex justify-center">
            <Interruptor checked={true} variant="inversion" disabled onChange={() => {}} />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 items-center">
          <div className="text-sm font-medium text-basic-neutral-700">Desactivado</div>
          <div className="flex justify-center">
            <Interruptor checked={false} variant="inversion" onChange={() => {}} />
          </div>
          <div className="flex justify-center">
            <div className="hover:scale-105 transition-transform">
              <Interruptor checked={false} variant="inversion" onChange={() => {}} />
            </div>
          </div>
          <div className="flex justify-center">
            <Interruptor checked={false} variant="inversion" onChange={() => {}} />
          </div>
          <div className="flex justify-center">
            <Interruptor checked={false} variant="inversion" disabled onChange={() => {}} />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Ejemplos con texto
export const EjemplosConTexto: Story = {
  render: () => {
    const [estados, setEstados] = useState({
      permisos: true,
      notificaciones: false,
      espera: true,
    });

    const handleChange = (key: string, value: boolean) => {
      setEstados(prev => ({ ...prev, [key]: value }));
    };

    return (
      <div className="max-w-md space-y-6">
        <h3 className="text-lg font-semibold text-basic-neutral-900 mb-4">Ejemplos + texto</h3>

        <div className="space-y-4">
          <Interruptor
            checked={estados.permisos}
            onChange={checked => handleChange('permisos', checked)}
            label="Activar permisos"
          />
          <Interruptor
            checked={estados.notificaciones}
            onChange={checked => handleChange('notificaciones', checked)}
            label="Activar notificaciones"
          />
          <Interruptor
            checked={estados.espera}
            onChange={checked => handleChange('espera', checked)}
            label="Tiempo de espera"
          />
        </div>
      </div>
    );
  },
};

// Casos de uso según especificaciones
export const CasosDeUso: Story = {
  render: () => {
    const [opcionesBinarias, setOpcionesBinarias] = useState({
      notificacionesEmail: true,
      modoOscuro: false,
      guardadoAutomatico: true,
      sincronizacion: false,
    });

    const [opcionesOpuestas, setOpcionesOpuestas] = useState({
      activarPermisos: true,
      desactivarPermisos: false,
    });

    const handleBinaryChange = (key: string, value: boolean) => {
      setOpcionesBinarias(prev => ({ ...prev, [key]: value }));
    };

    const handleOppositeChange = (key: string, value: boolean) => {
      // Para opciones opuestas, cuando una se activa, la otra se desactiva
      if (key === 'activarPermisos') {
        setOpcionesOpuestas({
          activarPermisos: value,
          desactivarPermisos: !value,
        });
      } else {
        setOpcionesOpuestas({
          activarPermisos: !value,
          desactivarPermisos: value,
        });
      }
    };

    return (
      <div className="max-w-4xl space-y-8">
        <h3 className="text-lg font-semibold text-basic-neutral-900">Casos de uso</h3>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Opciones Binarias */}
          <div className="bg-primary-azul-proteccion-50 p-6 rounded-lg border border-primary-azul-proteccion-200">
            <h4 className="text-base font-medium text-primary-azul-proteccion-800 mb-4">
              Una opción binaria
            </h4>
            <p className="text-sm text-primary-azul-proteccion-700 mb-4">
              Representa un solo estado, puede ser activado o desactivado. Los interruptores
              controlan las opciones mencionadas.
            </p>

            <div className="space-y-3">
              <Interruptor
                checked={opcionesBinarias.notificacionesEmail}
                onChange={checked => handleBinaryChange('notificacionesEmail', checked)}
                label="Notificaciones por email"
              />
              <Interruptor
                checked={opcionesBinarias.modoOscuro}
                onChange={checked => handleBinaryChange('modoOscuro', checked)}
                label="Modo oscuro"
              />
              <Interruptor
                checked={opcionesBinarias.guardadoAutomatico}
                onChange={checked => handleBinaryChange('guardadoAutomatico', checked)}
                label="Guardado automático"
              />
              <Interruptor
                checked={opcionesBinarias.sincronizacion}
                onChange={checked => handleBinaryChange('sincronizacion', checked)}
                label="Sincronización"
              />
            </div>

            <div className="mt-4 p-3 bg-white/70 rounded text-xs text-primary-azul-proteccion-600">
              Cada opción funciona independientemente: Sí/No, Activo/Inactivo
            </div>
          </div>

          {/* Opciones Opuestas */}
          <div className="bg-secondary-advertencia-50 p-6 rounded-lg border border-secondary-advertencia-200">
            <h4 className="text-base font-medium text-secondary-advertencia-800 mb-4">
              Las opciones opuestas
            </h4>
            <p className="text-sm text-secondary-advertencia-700 mb-4">
              Son dos estados contrarios, separados, que guardan relación con diferentes tareas del
              usuario.
            </p>

            <div className="space-y-3">
              <Interruptor
                checked={opcionesOpuestas.activarPermisos}
                onChange={checked => handleOppositeChange('activarPermisos', checked)}
                label="Activar permisos"
                variant="general"
              />
              <Interruptor
                checked={opcionesOpuestas.desactivarPermisos}
                onChange={checked => handleOppositeChange('desactivarPermisos', checked)}
                label="Desactivar permisos"
                variant="inversion"
              />
            </div>

            <div className="mt-4 p-3 bg-white/70 rounded text-xs text-secondary-advertencia-600">
              Estados contrarios que se excluyen mutuamente
            </div>
          </div>
        </div>

        {/* Información técnica */}
        <div className="bg-white p-6 rounded-lg border border-basic-neutral-200">
          <h4 className="text-base font-medium text-basic-neutral-700 mb-3">
            Especificaciones Técnicas
          </h4>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-basic-neutral-600">
            <div>
              <h5 className="font-medium text-basic-neutral-800 mb-2">Posicionamiento:</h5>
              <ul className="space-y-1">
                <li>• Etiqueta siempre a la izquierda del interruptor</li>
                <li>• Cambio instantáneo y visual</li>
                <li>• Estados claramente diferenciados</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-basic-neutral-800 mb-2">Casos de uso:</h5>
              <ul className="space-y-1">
                <li>• Configuraciones de sistema</li>
                <li>• Preferencias de usuario</li>
                <li>• Estados binarios (On/Off)</li>
                <li>• Opciones contrarias</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Demostración de variantes
export const VariantesComparacion: Story = {
  render: () => {
    const [estadosGeneral, setEstadosGeneral] = useState({
      notificaciones: true,
      ubicacion: false,
      camara: true,
    });

    const [estadosInversion, setEstadosInversion] = useState({
      modoAvanzado: true,
      debugMode: false,
      desarrollador: true,
    });

    const handleGeneralChange = (key: string, value: boolean) => {
      setEstadosGeneral(prev => ({ ...prev, [key]: value }));
    };

    const handleInversionChange = (key: string, value: boolean) => {
      setEstadosInversion(prev => ({ ...prev, [key]: value }));
    };

    return (
      <div className="max-w-4xl space-y-8">
        <h3 className="text-lg font-semibold text-basic-neutral-900">Comparación de Variantes</h3>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Variante General */}
          <div className="bg-white p-6 rounded-lg border border-basic-neutral-200">
            <h4 className="text-base font-medium text-basic-neutral-700 mb-4">Variante General</h4>
            <p className="text-sm text-basic-neutral-600 mb-4">
              Utiliza colores azules para estados activos. Ideal para la mayoría de interfaces.
            </p>

            <div className="space-y-3">
              <Interruptor
                checked={estadosGeneral.notificaciones}
                onChange={checked => handleGeneralChange('notificaciones', checked)}
                label="Notificaciones"
                variant="general"
              />
              <Interruptor
                checked={estadosGeneral.ubicacion}
                onChange={checked => handleGeneralChange('ubicacion', checked)}
                label="Acceso a ubicación"
                variant="general"
              />
              <Interruptor
                checked={estadosGeneral.camara}
                onChange={checked => handleGeneralChange('camara', checked)}
                label="Acceso a cámara"
                variant="general"
              />
              <Interruptor checked={true} disabled label="Opción bloqueada" variant="general" />
            </div>
          </div>

          {/* Variante Inversión */}
          <div className="bg-white p-6 rounded-lg border border-basic-neutral-200">
            <h4 className="text-base font-medium text-basic-neutral-700 mb-4">
              Variante Inversión
            </h4>
            <p className="text-sm text-basic-neutral-600 mb-4">
              Utiliza colores oscuros para estados activos. Ideal para configuraciones avanzadas.
            </p>

            <div className="space-y-3">
              <Interruptor
                checked={estadosInversion.modoAvanzado}
                onChange={checked => handleInversionChange('modoAvanzado', checked)}
                label="Modo avanzado"
                variant="inversion"
              />
              <Interruptor
                checked={estadosInversion.debugMode}
                onChange={checked => handleInversionChange('debugMode', checked)}
                label="Modo debug"
                variant="inversion"
              />
              <Interruptor
                checked={estadosInversion.desarrollador}
                onChange={checked => handleInversionChange('desarrollador', checked)}
                label="Opciones de desarrollador"
                variant="inversion"
              />
              <Interruptor
                checked={false}
                disabled
                label="Función experimental"
                variant="inversion"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};
