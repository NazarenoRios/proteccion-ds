import type { Meta, StoryObj } from '@storybook/react';
import { ProductsPage } from './ProductsPage';

const meta: Meta<typeof ProductsPage> = {
  title: 'Pages/ProductsPage',
  component: ProductsPage,
  tags: ['autodocs'],
  argTypes: {
    initialProducts: {
      description: 'Lista inicial de productos',
    },
    categories: {
      description: 'Lista de categorías disponibles',
    },
    onClick: {
      description: 'Función que se ejecuta al hacer clic en un producto',
    },
    onMouseEnter: {
      description: 'Función que se ejecuta al entrar el mouse en un producto',
    },
    onMouseLeave: {
      description: 'Función que se ejecuta al salir el mouse de un producto',
    },
    ariaLabel: {
      control: 'text',
      description: 'Etiqueta ARIA para accesibilidad',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductsPage>;

const sampleProducts = [
  {
    id: 1,
    title: 'Audífonos Premium',
    description: 'Audífonos inalámbricos con cancelación de ruido',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    price: 199.99,
    category: 'Electrónicos',
  },
  {
    id: 2,
    title: 'Camiseta Diseñador',
    description: 'Camiseta de algodón orgánico con diseño exclusivo',
    imageUrl: 'https://picsum.photos/400/300?random=2',
    price: 49.99,
    category: 'Ropa',
  },
  {
    id: 3,
    title: 'Lámpara LED',
    description: 'Lámpara LED inteligente con control por voz',
    imageUrl: 'https://picsum.photos/400/300?random=3',
    price: 79.99,
    category: 'Hogar',
  },
];

const categories = ['Electrónicos', 'Ropa', 'Hogar'];

export const Default: Story = {
  args: {
    initialProducts: sampleProducts,
    categories,
  },
};

export const WithEvents: Story = {
  args: {
    initialProducts: sampleProducts,
    categories,
    onClick: product => console.log('Producto clickeado:', product.title),
    onMouseEnter: product => console.log('Mouse entró en:', product.title),
    onMouseLeave: product => console.log('Mouse salió de:', product.title),
  },
};

export const WithAriaLabel: Story = {
  args: {
    initialProducts: sampleProducts,
    categories,
    ariaLabel: 'Página de productos con accesibilidad mejorada',
  },
};

export const WithManyProducts: Story = {
  args: {
    initialProducts: [
      ...sampleProducts,
      {
        id: 4,
        title: 'Smartwatch',
        description: 'Reloj inteligente con monitoreo de salud',
        imageUrl: 'https://picsum.photos/400/300?random=4',
        price: 299.99,
        category: 'Electrónicos',
      },
      {
        id: 5,
        title: 'Zapatillas Deportivas',
        description: 'Zapatillas para running con tecnología de amortiguación',
        imageUrl: 'https://picsum.photos/400/300?random=5',
        price: 129.99,
        category: 'Ropa',
      },
    ],
    categories,
  },
};

export const WithSingleCategory: Story = {
  args: {
    initialProducts: sampleProducts.filter(p => p.category === 'Electrónicos'),
    categories: ['Electrónicos'],
  },
};
