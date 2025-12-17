import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { RadioButton } from './RadioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'Atoms/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Indica si el radio está seleccionado',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: 'radio',
      options: ['general', 'inversion'],
      description: 'Variante de estilo del radio button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'general' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Indica si el radio está deshabilitado',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Texto de la etiqueta del radio button',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Función que se ejecuta cuando cambia el estado',
      table: {
        type: { summary: '(checked: boolean) => void' },
      },
    },
  },
  args: {
    variant: 'general',
    disabled: false,
    label: 'Opción',
  },
};

export default meta;

type Story = StoryObj<typeof RadioButton>;

export const General: Story = {
  args: {
    label: 'General',
    checked: false,
    variant: 'general',
  },
  render: function Render(args) {
    const [isChecked, setIsChecked] = React.useState(args.checked);
    
    // Sincronizar cuando cambia el valor desde los controles
    React.useEffect(() => {
      setIsChecked(args.checked);
    }, [args.checked]);

    return (
      <RadioButton
        {...args}
        checked={isChecked}
        onChange={(e) => {
          const newValue = e.target.checked;
          setIsChecked(newValue);
          args.onChange?.(e);
          // Actualizar los args para que se refleje en los controles
          args.checked = newValue;
        }}
      />
    );
  },
};

export const Inversion: Story = {
  args: {
    label: 'Inversión',
    checked: false,
    variant: 'inversion',
  },
  render: function Render(args) {
    const [isChecked, setIsChecked] = React.useState(args.checked);
    return (
        <RadioButton
          {...args}
          checked={isChecked}
          onChange={(e) => {
            setIsChecked(e.target.checked);
            args.onChange?.(e);
          }}
        />
    );
  },
};

export const Disabled: Story = {
  args: {
    label: 'Deshabilitado',
    checked: false,
    disabled: true,
  },
};

export const ControlledGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState('Seleccionado uno');
    return (
      <div className="flex flex-col gap-2">
        <RadioButton label="Uno" checked={selected === 'Seleccionado uno'} onChange={() => setSelected('Seleccionado uno')} />
        <RadioButton label="Dos" checked={selected === 'Seleccionado dos'} onChange={() => setSelected('Seleccionado dos')} />
        <RadioButton label="Tres" checked={selected === 'Seleccionado tres'} onChange={() => setSelected('Seleccionado tres')} />
      </div>
    );
  },
};
