import type { Meta, StoryObj } from '@storybook/react';
import { ProductGrid } from './ProductGrid';

const meta: Meta<typeof ProductGrid> = {
  title: 'Templates/ProductGrid',
  component: ProductGrid,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    onLoadMore: { action: 'loadMore' },
    isLoading: { control: 'boolean' },
    onClick: { action: 'clicked' },
    onMouseEnter: { action: 'mouseEnter' },
    onMouseLeave: { action: 'mouseLeave' },
    ariaLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ProductGrid>;

const sampleProducts = [
  {
    id: '1',
    title: 'Product 1',
    description: 'This is the first product.',
    imageUrl: 'https://picsum.photos/400/200?random=1',
    price: 99.99,
    category: 'Electronics',
  },
  {
    id: '2',
    title: 'Product 2',
    description: 'This is the second product.',
    imageUrl: 'https://picsum.photos/400/200?random=2',
    price: 149.99,
    category: 'Clothing',
  },
  {
    id: '3',
    title: 'Product 3',
    description: 'This is the third product.',
    imageUrl: 'https://picsum.photos/400/200?random=3',
    price: 199.99,
    category: 'Home',
  },
  {
    id: '4',
    title: 'Product 4',
    description: 'This is the fourth product.',
    imageUrl: 'https://picsum.photos/400/200?random=4',
    price: 249.99,
    category: 'Electronics',
  },
];

export const Default: Story = {
  args: {
    products: sampleProducts,
    title: 'Featured Products',
    description: 'Check out our latest products.',
  },
};

export const Loading: Story = {
  args: {
    products: sampleProducts,
    title: 'Featured Products',
    description: 'Check out our latest products.',
    isLoading: true,
  },
};

export const WithLoadMore: Story = {
  args: {
    products: sampleProducts,
    title: 'Featured Products',
    description: 'Check out our latest products.',
    onLoadMore: () => alert('Load more clicked!'),
  },
};

export const WithEvents: Story = {
  args: {
    products: sampleProducts,
    title: 'Featured Products',
    description: 'Check out our latest products.',
    onClick: index => alert(`Product ${index + 1} clicked!`),
    onMouseEnter: index => console.log(`Mouse entered product ${index + 1}`),
    onMouseLeave: index => console.log(`Mouse left product ${index + 1}`),
  },
};

export const WithAriaLabel: Story = {
  args: {
    products: sampleProducts,
    title: 'Featured Products',
    description: 'Check out our latest products.',
    ariaLabel: 'This is an accessible product grid',
  },
};
