import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Texto de placeholder para el campo de búsqueda',
    },
    onSearch: {
      description: 'Función que se ejecuta al realizar una búsqueda',
    },
    onClear: {
      description: 'Función que se ejecuta al limpiar la búsqueda',
    },
    ariaLabel: {
      control: 'text',
      description: 'Etiqueta ARIA para accesibilidad',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    placeholder: 'Buscar productos...',
  },
};

export const WithCustomPlaceholder: Story = {
  args: {
    placeholder: '¿Qué estás buscando?',
  },
};

export const WithEvents: Story = {
  args: {
    placeholder: 'Buscar...',
    onSearch: value => console.log('Búsqueda:', value),
    onClear: () => console.log('Búsqueda limpiada'),
  },
};

export const WithAriaLabel: Story = {
  args: {
    placeholder: 'Buscar productos',
    ariaLabel: 'Campo de búsqueda de productos',
  },
};
