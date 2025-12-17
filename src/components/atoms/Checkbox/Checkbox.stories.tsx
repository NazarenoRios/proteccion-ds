import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    figma:
      'https://www.figma.com/design/sMJTAQgPqMvxAEgqAIgVTA/Protecci%C3%B3n---Sistema-de-Dise%C3%B1o--Copy-?node-id=376-1743&t=64GXAX431PIpDkqA-4',
    docs: {
      description: {
        component:
          '[📐 Ver diseño en Figma](https://www.figma.com/design/sMJTAQgPqMvxAEgqAIgVTA/Protecci%C3%B3n---Sistema-de-Dise%C3%B1o--Copy-?node-id=376-1743&t=64GXAX431PIpDkqA-4)',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Indica si el checkbox está marcado',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    indeterminate: {
      control: 'boolean',
      description: 'Estado indeterminado (parcialmente seleccionado)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['normal', 'inversion'],
      description: 'Variante de estilo',
      table: {
        defaultValue: { summary: 'normal' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Indica si el checkbox está deshabilitado',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Etiqueta del checkbox',
    },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Historia interactiva por defecto
export const Interactivo: Story = {
  render: args => {
    const [checked, setChecked] = useState(args.checked || false);

    return (
      <div className="space-y-4">
        <Checkbox
          {...args}
          checked={checked}
          onChange={newChecked => {
            setChecked(newChecked);
            args.onChange?.(newChecked);
          }}
        />
        <p className="text-sm text-basic-neutral-600">
          Estado actual: {checked ? 'Marcado' : 'No marcado'}
        </p>
      </div>
    );
  },
  args: {
    label: 'Etiqueta de texto',
    checked: false,
    variant: 'normal',
  },
};

// Matriz completa de estados como en Figma
export const MatrizEstados: Story = {
  render: () => (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold text-basic-neutral-900 mb-4">Estados según Figma</h3>

      {/* Variante General */}
      <div className="space-y-6">
        <h4 className="text-base font-medium text-basic-neutral-700 border-b pb-2">GENERAL</h4>

        {/* Headers */}
        <div className="grid grid-cols-5 gap-4 mb-4">
          <div></div>
          <div className="text-center text-sm font-medium text-basic-neutral-600">Default</div>
          <div className="text-center text-sm font-medium text-basic-neutral-600">Hover</div>
          <div className="text-center text-sm font-medium text-basic-neutral-600">Focus</div>
          <div className="text-center text-sm font-medium text-basic-neutral-600">Disable</div>
        </div>

        {/* Checked */}
        <div className="grid grid-cols-5 gap-4 items-center">
          <div className="text-sm font-medium text-basic-neutral-700">Checked</div>
          <div className="flex justify-center">
            <Checkbox checked={true} onChange={() => {}} />
          </div>
          <div className="flex justify-center">
            <div className="hover:scale-105 transition-transform">
              <Checkbox checked={true} onChange={() => {}} />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="ring-2 ring-primary-azul-proteccion-500 ring-offset-2 rounded">
              <Checkbox checked={true} onChange={() => {}} />
            </div>
          </div>
          <div className="flex justify-center">
            <Checkbox checked={true} disabled onChange={() => {}} />
          </div>
        </div>

        {/* Unchecked */}
        <div className="grid grid-cols-5 gap-4 items-center">
          <div className="text-sm font-medium text-basic-neutral-700">Unchecked</div>
          <div className="flex justify-center">
            <Checkbox checked={false} onChange={() => {}} />
          </div>
          <div className="flex justify-center">
            <div className="hover:scale-105 transition-transform">
              <Checkbox checked={false} onChange={() => {}} />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="ring-2 ring-primary-azul-proteccion-500 ring-offset-2 rounded">
              <Checkbox checked={false} onChange={() => {}} />
            </div>
          </div>
          <div className="flex justify-center">
            <Checkbox checked={false} disabled onChange={() => {}} />
          </div>
        </div>

        {/* Indeterminado */}
        <div className="grid grid-cols-5 gap-4 items-center">
          <div className="text-sm font-medium text-basic-neutral-700">Indeterminado</div>
          <div className="flex justify-center">
            <Checkbox indeterminate={true} onChange={() => {}} />
          </div>
          <div className="flex justify-center">
            <div className="hover:scale-105 transition-transform">
              <Checkbox indeterminate={true} onChange={() => {}} />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="ring-2 ring-primary-azul-proteccion-500 ring-offset-2 rounded">
              <Checkbox indeterminate={true} onChange={() => {}} />
            </div>
          </div>
          <div className="flex justify-center">
            <Checkbox indeterminate={true} disabled onChange={() => {}} />
          </div>
        </div>
      </div>

      {/* Variante Inversión */}
      <div className="space-y-6">
        <h4 className="text-base font-medium text-basic-neutral-700 border-b pb-2">INVERSIÓN</h4>

        {/* Checked */}
        <div className="grid grid-cols-5 gap-4 items-center">
          <div className="text-sm font-medium text-basic-neutral-700">Checked</div>
          <div className="flex justify-center">
            <Checkbox checked={true} variant="inversion" onChange={() => {}} />
          </div>
          <div className="flex justify-center">
            <div className="hover:scale-105 transition-transform">
              <Checkbox checked={true} variant="inversion" onChange={() => {}} />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="ring-2 ring-basic-neutral-900 ring-offset-2 rounded">
              <Checkbox checked={true} variant="inversion" onChange={() => {}} />
            </div>
          </div>
          <div className="flex justify-center">
            <Checkbox checked={true} variant="inversion" disabled onChange={() => {}} />
          </div>
        </div>

        {/* Unchecked */}
        <div className="grid grid-cols-5 gap-4 items-center">
          <div className="text-sm font-medium text-basic-neutral-700">Unchecked</div>
          <div className="flex justify-center">
            <Checkbox checked={false} variant="inversion" onChange={() => {}} />
          </div>
          <div className="flex justify-center">
            <div className="hover:scale-105 transition-transform">
              <Checkbox checked={false} variant="inversion" onChange={() => {}} />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="ring-2 ring-basic-neutral-900 ring-offset-2 rounded">
              <Checkbox checked={false} variant="inversion" onChange={() => {}} />
            </div>
          </div>
          <div className="flex justify-center">
            <Checkbox checked={false} variant="inversion" disabled onChange={() => {}} />
          </div>
        </div>

        {/* Indeterminado */}
        <div className="grid grid-cols-5 gap-4 items-center">
          <div className="text-sm font-medium text-basic-neutral-700">Indeterminado</div>
          <div className="flex justify-center">
            <Checkbox indeterminate={true} variant="inversion" onChange={() => {}} />
          </div>
          <div className="flex justify-center">
            <div className="hover:scale-105 transition-transform">
              <Checkbox indeterminate={true} variant="inversion" onChange={() => {}} />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="ring-2 ring-basic-neutral-900 ring-offset-2 rounded">
              <Checkbox indeterminate={true} variant="inversion" onChange={() => {}} />
            </div>
          </div>
          <div className="flex justify-center">
            <Checkbox indeterminate={true} variant="inversion" disabled onChange={() => {}} />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Ejemplos con texto siguiendo las reglas de negocio
export const EjemplosConTexto: Story = {
  render: () => {
    const [estados, setEstados] = useState({
      terminos: false,
      newsletter: true,
      notificaciones: false,
      promociones: true,
      avisos: false,
      politicas: false,
      comunicaciones: true,
      seguridad: false,
    });

    const handleChange = (key: string, value: boolean) => {
      setEstados(prev => ({ ...prev, [key]: value }));
    };

    return (
      <div className="max-w-md space-y-4">
        <h3 className="text-lg font-semibold text-basic-neutral-900 mb-4">Ejemplos + texto</h3>

        <div className="space-y-3">
          <Checkbox
            checked={estados.terminos}
            onChange={checked => handleChange('terminos', checked)}
            label="Acepto los términos y condiciones"
          />
          <Checkbox
            checked={estados.newsletter}
            onChange={checked => handleChange('newsletter', checked)}
            label="Suscribirse al newsletter"
          />
          <Checkbox
            checked={estados.notificaciones}
            onChange={checked => handleChange('notificaciones', checked)}
            label="Recibir notificaciones"
          />
          <Checkbox
            checked={estados.promociones}
            onChange={checked => handleChange('promociones', checked)}
            label="Ofertas y promociones"
          />
          <Checkbox
            checked={estados.avisos}
            onChange={checked => handleChange('avisos', checked)}
            label="Avisos importantes"
          />
          <Checkbox
            checked={estados.politicas}
            onChange={checked => handleChange('politicas', checked)}
            label="Políticas de privacidad"
          />
          <Checkbox
            checked={estados.comunicaciones}
            onChange={checked => handleChange('comunicaciones', checked)}
            label="Comunicaciones comerciales"
          />
          <Checkbox checked={false} disabled label="Opción no disponible" />
        </div>
      </div>
    );
  },
};

// Estados detallados como en Figma
export const EstadosDetallados: Story = {
  render: () => {
    const [activeStates, setActiveStates] = useState({
      checked: true,
      unchecked: false,
    });

    const [overStates, setOverStates] = useState({
      checked: true,
      unchecked: false,
    });

    const [focusedStates, setFocusedStates] = useState({
      checked: true,
      unchecked: false,
    });

    const [indeterminateStates, setIndeterminateStates] = useState({
      normal: true,
      inversion: true,
    });

    return (
      <div className="space-y-8">
        <h3 className="text-lg font-semibold text-basic-neutral-900 mb-4">Estados</h3>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Sin etiqueta */}
          <div className="space-y-4">
            <h4 className="text-base font-medium text-basic-neutral-700">Sin etiqueta</h4>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-basic-neutral-600">Activo - Seleccionado</span>
                <Checkbox
                  checked={activeStates.checked}
                  onChange={checked => setActiveStates(prev => ({ ...prev, checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-basic-neutral-600">No Seleccionado</span>
                <Checkbox
                  checked={activeStates.unchecked}
                  onChange={checked => setActiveStates(prev => ({ ...prev, unchecked: checked }))}
                />
              </div>

              <hr className="border-basic-neutral-200" />

              <div className="flex items-center justify-between">
                <span className="text-sm text-basic-neutral-600">Sobre - Seleccionado</span>
                <div className="hover:scale-105 transition-transform">
                  <Checkbox
                    checked={overStates.checked}
                    onChange={checked => setOverStates(prev => ({ ...prev, checked }))}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-basic-neutral-600">No Seleccionado</span>
                <div className="hover:scale-105 transition-transform">
                  <Checkbox
                    checked={overStates.unchecked}
                    onChange={checked => setOverStates(prev => ({ ...prev, unchecked: checked }))}
                  />
                </div>
              </div>

              <hr className="border-basic-neutral-200" />

              <div className="flex items-center justify-between">
                <span className="text-sm text-basic-neutral-600">Enfocado - Seleccionado</span>
                <div className="ring-2 ring-primary-azul-proteccion-500 ring-offset-2 rounded">
                  <Checkbox
                    checked={focusedStates.checked}
                    onChange={checked => setFocusedStates(prev => ({ ...prev, checked }))}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-basic-neutral-600">No Seleccionado</span>
                <div className="ring-2 ring-primary-azul-proteccion-500 ring-offset-2 rounded">
                  <Checkbox
                    checked={focusedStates.unchecked}
                    onChange={checked =>
                      setFocusedStates(prev => ({ ...prev, unchecked: checked }))
                    }
                  />
                </div>
              </div>

              <hr className="border-basic-neutral-200" />

              <div className="flex items-center justify-between">
                <span className="text-sm text-basic-neutral-600">Indeterminado - Seleccionado</span>
                <Checkbox
                  indeterminate={indeterminateStates.normal}
                  onChange={() =>
                    setIndeterminateStates(prev => ({ ...prev, normal: !prev.normal }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-basic-neutral-600">No Seleccionado</span>
                <Checkbox checked={false} onChange={() => {}} />
              </div>

              <hr className="border-basic-neutral-200" />

              <div className="flex items-center justify-between">
                <span className="text-sm text-basic-neutral-600">Inactivo - Seleccionado</span>
                <Checkbox checked={true} disabled onChange={() => {}} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-basic-neutral-600">No Seleccionado</span>
                <Checkbox checked={false} disabled onChange={() => {}} />
              </div>
            </div>
          </div>

          {/* Con etiqueta */}
          <div className="space-y-4">
            <h4 className="text-base font-medium text-basic-neutral-700">Con etiqueta</h4>

            <div className="space-y-3">
              <Checkbox
                checked={activeStates.checked}
                onChange={checked => setActiveStates(prev => ({ ...prev, checked }))}
                label="Etiqueta de texto"
              />

              <Checkbox
                checked={activeStates.unchecked}
                onChange={checked => setActiveStates(prev => ({ ...prev, unchecked: checked }))}
                label="Etiqueta de texto"
              />

              <hr className="border-basic-neutral-200" />

              <div className="hover:scale-105 transition-transform">
                <Checkbox
                  checked={overStates.checked}
                  onChange={checked => setOverStates(prev => ({ ...prev, checked }))}
                  label="Etiqueta de texto"
                />
              </div>

              <div className="hover:scale-105 transition-transform">
                <Checkbox
                  checked={overStates.unchecked}
                  onChange={checked => setOverStates(prev => ({ ...prev, unchecked: checked }))}
                  label="Etiqueta de texto"
                />
              </div>

              <hr className="border-basic-neutral-200" />

              <div className="ring-2 ring-primary-azul-proteccion-500 ring-offset-2 rounded">
                <Checkbox
                  checked={focusedStates.checked}
                  onChange={checked => setFocusedStates(prev => ({ ...prev, checked }))}
                  label="Etiqueta de texto"
                />
              </div>

              <div className="ring-2 ring-primary-azul-proteccion-500 ring-offset-2 rounded">
                <Checkbox
                  checked={focusedStates.unchecked}
                  onChange={checked => setFocusedStates(prev => ({ ...prev, unchecked: checked }))}
                  label="Etiqueta de texto"
                />
              </div>

              <hr className="border-basic-neutral-200" />

              <Checkbox
                indeterminate={indeterminateStates.inversion}
                onChange={() =>
                  setIndeterminateStates(prev => ({ ...prev, inversion: !prev.inversion }))
                }
                label="Etiqueta de texto"
              />

              <Checkbox checked={false} onChange={() => {}} label="Etiqueta de texto" />

              <hr className="border-basic-neutral-200" />

              <Checkbox checked={true} disabled onChange={() => {}} label="Etiqueta de texto" />

              <Checkbox checked={false} disabled onChange={() => {}} label="Etiqueta de texto" />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Contextos de uso como en Figma
export const ContextosDeUso: Story = {
  render: () => {
    const [authState, setAuthState] = useState(false);
    const [selectedSports, setSelectedSports] = useState<string[]>(['futbol']);
    const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);

    const sports = [
      { id: 'futbol', label: 'Fútbol' },
      { id: 'basketball', label: 'Baloncesto' },
      { id: 'tennis', label: 'Tenis' },
      { id: 'swimming', label: 'Natación' },
    ];

    const handleSportChange = (sportId: string, checked: boolean) => {
      if (checked) {
        setSelectedSports(prev => [...prev, sportId]);
      } else {
        setSelectedSports(prev => prev.filter(id => id !== sportId));
      }
    };

    return (
      <div className="max-w-4xl space-y-8">
        <h3 className="text-lg font-semibold text-basic-neutral-900">Contextos de uso</h3>

        {/* Términos y condiciones */}
        <div className="bg-basic-neutral-50 p-6 rounded-lg border border-basic-neutral-200">
          <div className="max-w-2xl">
            <p className="text-basic-neutral-700 mb-4">
              Autorizo a Protección S.A. a girar el cheque del retiro de mi cuenta de Pensiones
              Voluntarias a nombre del beneficiario que relacioné. Además, exonero a Protección S.A.
              de toda responsabilidad en el caso que se comprometa la seguridad del cheque.
            </p>

            <p className="text-sm text-basic-neutral-600 mb-4">
              Uso de la casilla de verificación en términos y condiciones para dar a entender al
              usuario que si acepta las políticas que se requieren para continuar.
            </p>

            <Checkbox
              checked={authState}
              onChange={setAuthState}
              label="Requiero autorización de la patrocinadora o hay aportes sin consolidar"
            />
          </div>
        </div>

        {/* Lista de opciones múltiples */}
        <div className="bg-white p-6 rounded-lg border border-basic-neutral-200">
          <h4 className="font-medium text-basic-neutral-800 mb-4">
            Uso de casillas de verificación en listas con capacidad de seleccionar más de una
            opción.
          </h4>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Lista 1 */}
            <div>
              <h5 className="text-sm font-medium text-basic-neutral-700 mb-3">
                Deportes favoritos
              </h5>
              <div className="space-y-2">
                {sports.map(sport => (
                  <Checkbox
                    key={sport.id}
                    checked={selectedSports.includes(sport.id)}
                    onChange={checked => handleSportChange(sport.id, checked)}
                    label={sport.label}
                  />
                ))}
              </div>
              <p className="text-xs text-basic-neutral-500 mt-2">
                Se pueden seleccionar varias casillas de verificación en una lista.
              </p>
            </div>

            {/* Lista 2 */}
            <div>
              <h5 className="text-sm font-medium text-basic-neutral-700 mb-3">Comunicaciones</h5>
              <div className="space-y-2">
                <Checkbox checked={false} indeterminate={true} onChange={() => {}} label="Email" />
                <div className="ml-6 space-y-1">
                  <Checkbox checked={true} onChange={() => {}} label="Newsletters" />
                  <Checkbox checked={true} onChange={() => {}} label="Promociones" />
                  <Checkbox checked={false} onChange={() => {}} label="Encuestas" />
                </div>
              </div>
              <p className="text-xs text-basic-neutral-500 mt-2">
                Cuando se selecciona una casilla de verificación, comunica clara e inmediatamente su
                estado elegido.
              </p>
            </div>

            {/* Lista 3 */}
            <div>
              <h5 className="text-sm font-medium text-basic-neutral-700 mb-3">Configuración</h5>
              <div className="space-y-2">
                <Checkbox checked={true} onChange={() => {}} label="Notificaciones" />
                <Checkbox checked={false} onChange={() => {}} label="Sonidos" />
                <Checkbox indeterminate={true} onChange={() => {}} label="Ubicación" />
                <Checkbox checked={false} onChange={() => {}} label="Cámara" />
              </div>
              <p className="text-xs text-basic-neutral-500 mt-2">
                Si se seleccionan algunas (pero no todas) de las casillas de verificación
                secundarias, la casilla de verificación principal se vuelve en una casilla de
                verificación indeterminada.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Story específica para estado Indeterminado
export const IndeterminadoSeleccionado: Story = {
  render: () => {
    const [indeterminateState, setIndeterminateState] = useState(true);
    const [normalChecked, setNormalChecked] = useState(false);
    const [inversionChecked, setInversionChecked] = useState(false);

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-basic-neutral-900 mb-2">
            Estado Indeterminado - Seleccionado
          </h3>
          <p className="text-basic-neutral-600">
            Demonstración del estado indeterminado (parcialmente seleccionado)
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Variante Normal */}
          <div className="bg-white p-6 rounded-lg border border-basic-neutral-200">
            <h4 className="text-base font-medium text-basic-neutral-700 mb-4">Variante Normal</h4>

            <div className="space-y-4">
              {/* Indeterminado principal */}
              <div className="space-y-2">
                <Checkbox
                  indeterminate={indeterminateState}
                  onChange={() => setIndeterminateState(!indeterminateState)}
                  label="Seleccionar todo"
                />

                {/* Sub-opciones */}
                <div className="ml-6 space-y-2">
                  <Checkbox checked={true} onChange={() => {}} label="Opción 1 (seleccionada)" />
                  <Checkbox checked={true} onChange={() => {}} label="Opción 2 (seleccionada)" />
                  <Checkbox
                    checked={false}
                    onChange={() => {}}
                    label="Opción 3 (no seleccionada)"
                  />
                  <Checkbox
                    checked={false}
                    onChange={() => {}}
                    label="Opción 4 (no seleccionada)"
                  />
                </div>
              </div>

              <div className="mt-6 p-3 bg-primary-azul-proteccion-50 rounded text-sm">
                <p className="text-primary-azul-proteccion-700">
                  <strong>Estado:</strong> {indeterminateState ? 'Indeterminado' : 'Determinado'}
                </p>
                <p className="text-primary-azul-proteccion-600 mt-1">
                  El checkbox padre muestra estado indeterminado cuando algunas (pero no todas) las
                  opciones están seleccionadas.
                </p>
              </div>
            </div>
          </div>

          {/* Variante Inversión */}
          <div className="bg-white p-6 rounded-lg border border-basic-neutral-200">
            <h4 className="text-base font-medium text-basic-neutral-700 mb-4">
              Variante Inversión
            </h4>

            <div className="space-y-4">
              {/* Indeterminado principal */}
              <div className="space-y-2">
                <Checkbox
                  indeterminate={true}
                  variant="inversion"
                  onChange={() => {}}
                  label="Configuraciones avanzadas"
                />

                {/* Sub-opciones */}
                <div className="ml-6 space-y-2">
                  <Checkbox
                    checked={true}
                    variant="inversion"
                    onChange={() => {}}
                    label="Configuración A (activa)"
                  />
                  <Checkbox
                    checked={false}
                    variant="inversion"
                    onChange={() => {}}
                    label="Configuración B (inactiva)"
                  />
                  <Checkbox
                    checked={true}
                    variant="inversion"
                    onChange={() => {}}
                    label="Configuración C (activa)"
                  />
                </div>
              </div>

              <div className="mt-6 p-3 bg-basic-neutral-50 rounded text-sm">
                <p className="text-basic-neutral-700">
                  <strong>Variante:</strong> Inversión
                </p>
                <p className="text-basic-neutral-600 mt-1">
                  La variante inversión utiliza colores más oscuros y es ideal para interfaces con
                  fondos claros.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ejemplos individuales */}
        <div className="bg-basic-neutral-50 p-6 rounded-lg">
          <h4 className="text-base font-medium text-basic-neutral-700 mb-4">
            Ejemplos Individuales
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h5 className="text-sm font-medium text-basic-neutral-600">Estados Básicos</h5>
              <Checkbox indeterminate={true} label="Indeterminado básico" onChange={() => {}} />
              <Checkbox
                indeterminate={true}
                variant="inversion"
                label="Indeterminado inversión"
                onChange={() => {}}
              />
              <Checkbox
                indeterminate={true}
                disabled
                label="Indeterminado deshabilitado"
                onChange={() => {}}
              />
            </div>

            <div className="space-y-3">
              <h5 className="text-sm font-medium text-basic-neutral-600">Estados Interactivos</h5>
              <Checkbox
                checked={normalChecked}
                onChange={setNormalChecked}
                label="Click para alternar (normal)"
              />
              <Checkbox
                checked={inversionChecked}
                variant="inversion"
                onChange={setInversionChecked}
                label="Click para alternar (inversión)"
              />
              <Checkbox indeterminate={true} label="Siempre indeterminado" onChange={() => {}} />
            </div>
          </div>
        </div>

        {/* Información técnica */}
        <div className="bg-white p-6 rounded-lg border border-basic-neutral-200">
          <h4 className="text-base font-medium text-basic-neutral-700 mb-3">Información Técnica</h4>
          <div className="text-sm text-basic-neutral-600 space-y-2">
            <p>
              <strong>Uso:</strong> Ideal para listas con subselecciones donde solo algunas opciones
              están marcadas.
            </p>
            <p>
              <strong>Comportamiento:</strong> Muestra una línea horizontal (-) en lugar del
              checkmark (✓).
            </p>
            <p>
              <strong>Accesibilidad:</strong> Se comunica como "parcialmente seleccionado" a
              lectores de pantalla.
            </p>
            <p>
              <strong>API:</strong> <code>{'<Checkbox indeterminate={true} label="Texto" />'}</code>
            </p>
          </div>
        </div>
      </div>
    );
  },
};
