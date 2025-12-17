import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    figma: 'https://www.figma.com/design/sMJTAQgPqMvxAEgqAIgVTA/Protecci%C3%B3n---Sistema-de-Dise%C3%B1o--Copy-?node-id=654-1274&t=64GXAX431PIpDkqA-4',
    layout: 'centered',
    docs: {
      description: {
        component: `
Los Inputs son elementos interactivos que tienen múltiples estados que indican el comportamiento del usuario con el componente al escribir, clickear, seleccionar, visualizar.

## Estados
- **Inactivo**: Estado por defecto sin interacción
- **Activo**: Estado cuando tiene contenido
- **Focus**: Estado cuando está enfocado
- **Error**: Estado cuando hay un error
- **Deshabilitado**: Estado cuando está deshabilitado

## Especificaciones de diseño
- **Etiqueta**: Tipografía de 15px (Body/Paragraph/Regular), alineada a la izquierda
- **Texto de apoyo**: Tipografía de 13px (Body/Caption/Regular), alineada a la izquierda, una sola línea
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text', 'select', 'textarea'],
      description: 'Tipo de input',
    },
    size: {
      control: { type: 'select' },
      options: ['S', 'M', 'L'],
      description: 'Tamaño del input',
    },
    hasError: {
      control: { type: 'boolean' },
      description: 'Estado de error',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Estado deshabilitado',
    },
    label: {
      control: { type: 'text' },
      description: 'Etiqueta del input',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Texto de apoyo',
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Mensaje de error',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Texto placeholder',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// Template para inputs controlados
const ControlledTemplate = (args: any) => {
  const [value, setValue] = useState(args.value || '');
  return (
    <Input
      {...args}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

// Estados básicos según especificaciones
export const Inactivo: Story = {
  render: ControlledTemplate,
  args: {
    label: 'Etiqueta',
    helperText: 'Texto ayuda',
    placeholder: 'Text',
    value: '',
  },
};

export const Activo: Story = {
  render: ControlledTemplate,
  args: {
    label: 'Etiqueta',
    helperText: 'Texto ayuda',
    placeholder: 'Text',
    value: 'Texto',
  },
};

export const Focus: Story = {
  render: ControlledTemplate,
  args: {
    label: 'Etiqueta',
    helperText: 'Texto ayuda',
    placeholder: 'Text',
    value: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado focus - haz click en el input para ver el estado focus',
      },
    },
  },
};

export const Error: Story = {
  render: ControlledTemplate,
  args: {
    label: 'Etiqueta',
    errorMessage: 'Texto ayuda',
    placeholder: 'Text',
    hasError: true,
    value: 'Text',
  },
};

export const Deshabilitado: Story = {
  render: ControlledTemplate,
  args: {
    label: 'Etiqueta',
    helperText: 'Texto ayuda',
    placeholder: 'Text',
    disabled: true,
    value: 'Text',
  },
};

export const SoloLectura: Story = {
  render: ControlledTemplate,
  args: {
    label: 'Etiqueta',
    helperText: 'Texto ayuda',
    value: 'Text',
    // Simulamos solo lectura con disabled pero con estilos diferentes
  },
};

// Variantes de Select
export const Select: Story = {
  render: ControlledTemplate,
  args: {
    variant: 'select',
    label: 'Etiqueta',
    helperText: 'Texto ayuda',
    placeholder: 'Text',
    options: [
      { value: 'cc', label: 'CC - Cédula de ciudadanía' },
      { value: 'ti', label: 'TI - Tarjeta de identidad' },
      { value: 'pas', label: 'PAS - Pasaporte' },
      { value: 'ce', label: 'CE - Cédula de extranjería' },
    ],
  },
};

export const SelectDesplegado: Story = {
  render: ControlledTemplate,
  args: {
    variant: 'select',
    label: 'Etiqueta',
    placeholder: 'Seleccione la frecuencia con la que...',
    options: [
      { value: 'bimestral', label: 'Me gustaría realizar el débito automático de forma bimestral' },
      { value: 'mensual', label: 'Me gustaría realizar el débito automático de forma Mensual' },
      { value: 'quincenal', label: 'Me gustaría realizar el débito automático de forma Quincenal' },
      { value: 'semestral', label: 'Me gustaría realizar el débito automático de forma Semestral' },
    ],
  },
};

export const SelectError: Story = {
  render: ControlledTemplate,
  args: {
    variant: 'select',
    label: 'Etiqueta',
    errorMessage: 'Texto ayuda',
    placeholder: 'Text',
    hasError: true,
    options: [
      { value: 'cc', label: 'CC - Cédula de ciudadanía' },
      { value: 'ti', label: 'TI - Tarjeta de identidad' },
      { value: 'pas', label: 'PAS - Pasaporte' },
      { value: 'ce', label: 'CE - Cédula de extranjería' },
    ],
  },
};

export const SelectDeshabilitado: Story = {
  render: ControlledTemplate,
  args: {
    variant: 'select',
    label: 'Etiqueta',
    helperText: 'Texto ayuda',
    placeholder: 'Text',
    disabled: true,
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
  },
};

// Variantes de Textarea
export const TextareaInactivo: Story = {
  render: ControlledTemplate,
  args: {
    variant: 'textarea',
    label: 'Etiqueta',
    helperText: 'Texto Descripción',
    placeholder: 'Placeholder texto de área',
    rows: 4,
  },
};

export const TextareaActivo: Story = {
  render: ControlledTemplate,
  args: {
    variant: 'textarea',
    label: 'Etiqueta',
    helperText: 'Texto Descripción',
    placeholder: 'Placeholder texto de área',
    value: 'Placeholder texto de área',
    rows: 4,
  },
};

export const TextareaFocus: Story = {
  render: ControlledTemplate,
  args: {
    variant: 'textarea',
    label: 'Etiqueta',
    helperText: 'Texto Descripción',
    placeholder: 'Placeholder texto de área',
    rows: 4,
  },
};

export const TextareaError: Story = {
  render: ControlledTemplate,
  args: {
    variant: 'textarea',
    label: 'Etiqueta',
    errorMessage: 'Placeholder texto de área',
    placeholder: 'Placeholder texto de área',
    hasError: true,
    value: 'Placeholder texto de área',
    rows: 4,
  },
};

export const TextareaDeshabilitado: Story = {
  render: ControlledTemplate,
  args: {
    variant: 'textarea',
    label: 'Etiqueta',
    helperText: 'Texto Descripción',
    placeholder: 'Placeholder texto de área',
    disabled: true,
    rows: 4,
  },
};

// Ejemplos de uso según especificaciones
export const Uso: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        {/* Correcto */}
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center mb-2">
            <span className="text-green-600 mr-2">✓</span>
            <span className="font-medium text-green-800">Correcto</span>
          </div>
          <ControlledTemplate
            label="Etiqueta"
            helperText="Texto ayuda"
            placeholder="Text"
            value=""
          />
          <p className="text-sm text-blue-600 mt-2">
            La etiqueta debe estar alineada a la izquierda, encima del campo de texto.
          </p>
        </div>

        {/* Incorrecto */}
        <div className="p-4 bg-red-50 rounded-lg">
          <div className="flex items-center mb-2">
            <span className="text-red-600 mr-2">✗</span>
            <span className="font-medium text-red-800">Incorrecto</span>
          </div>
          <ControlledTemplate
            helperText="Texto ayuda"
            placeholder="Text"
            value=""
            style={{ textAlign: 'right' }}
          />
          <p className="text-sm text-blue-600 mt-2">
            Se debe respetar la alineación y ubicación previamente establecida para la etiqueta.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Select Correcto */}
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center mb-2">
            <span className="text-green-600 mr-2">✓</span>
            <span className="font-medium text-green-800">Correcto</span>
          </div>
          <ControlledTemplate
            variant="select"
            label="Tipo de documento de identidad"
            placeholder="Seleccione el tipo de documento"
            options={[
              { value: 'cc', label: 'CC - Cédula de ciudadanía' },
              { value: 'ti', label: 'TI - Tarjeta de identidad' },
              { value: 'pas', label: 'PAS - Pasaporte' },
              { value: 'ce', label: 'CE - Cédula de extranjería' },
            ]}
          />
          <p className="text-sm text-blue-600 mt-2">
            La etiqueta y los items deben ser de una sola línea, encima del campo de texto. El placeholder o texto provisional debe visualizarse claramente.
          </p>
        </div>

        {/* Select Incorrecto */}
        <div className="p-4 bg-red-50 rounded-lg">
          <div className="flex items-center mb-2">
            <span className="text-red-600 mr-2">✗</span>
            <span className="font-medium text-red-800">Incorrecto</span>
          </div>
          <ControlledTemplate
            variant="select"
            label="Ingrese la frecuencia con la que quieres realizar el débito"
            placeholder="Seleccione la frecuencia con la q..."
            options={[
              { value: 'option1', label: 'Opción muy larga que sobrepasa el límite recomendado de texto para una línea' },
            ]}
          />
          <p className="text-sm text-blue-600 mt-2">
            La etiqueta y los items de la lista no deben sobrepasar más de una línea de texto.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Password Correcto */}
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center mb-2">
            <span className="text-green-600 mr-2">✓</span>
            <span className="font-medium text-green-800">Correcto</span>
          </div>
                     <Input
             label="Contraseña"
             helperText="Debe tener mínimo 8 caracteres."
             placeholder="••••••••"
           />
          <p className="text-sm text-blue-600 mt-2">
            El texto de apoyo o descripción no debe sobrepasar una línea para estar alineado con el contenedor y la etiqueta.
          </p>
        </div>

        {/* Password Incorrecto */}
        <div className="p-4 bg-red-50 rounded-lg">
          <div className="flex items-center mb-2">
            <span className="text-red-600 mr-2">✗</span>
            <span className="font-medium text-red-800">Incorrecto</span>
          </div>
                     <Input
             label="Contraseña"
             errorMessage="La contraseña ingresada no obedece los lineamientos planteados de contener mínimo 8 caracteres"
             hasError={true}
             placeholder="••••••••"
           />
          <p className="text-sm text-blue-600 mt-2">
            El texto texto de apoyo debe ser corto y directo. Termina las oraciones con un punto y respeta la alineación y ubicación previamente establecida para la etiqueta.
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Ejemplos de uso correcto e incorrecto según las especificaciones de diseño.',
      },
    },
  },
};

// Variaciones de tamaño
export const Tamaños: Story = {
  render: () => (
    <div className="space-y-4">
      <ControlledTemplate
        size="S"
        label="Pequeño (S)"
        placeholder="Text"
        helperText="Tamaño pequeño"
      />
      <ControlledTemplate
        size="M"
        label="Mediano (M)"
        placeholder="Text"
        helperText="Tamaño mediano (por defecto)"
      />
      <ControlledTemplate
        size="L"
        label="Grande (L)"
        placeholder="Text"
        helperText="Tamaño grande"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes tamaños disponibles para el componente Input.',
      },
    },
  },
}; 