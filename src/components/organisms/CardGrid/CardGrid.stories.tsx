import type { Meta, StoryObj } from '@storybook/react';
import { CardGrid } from './CardGrid';

const meta: Meta<typeof CardGrid> = {
  title: 'Organisms/CardGrid',
  component: CardGrid,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: [1, 2, 3, 4],
    },
    gap: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    onClick: { action: 'clicked' },
    onMouseEnter: { action: 'mouseEnter' },
    onMouseLeave: { action: 'mouseLeave' },
    ariaLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CardGrid>;

const sampleCards = [
  {
    title: 'Card 1',
    description: 'This is the first card in the grid.',
    imageUrl: 'https://picsum.photos/400/200?random=1',
    buttonText: 'Learn More',
    buttonProps: {
      variant: 'primary',
    },
  },
  {
    title: 'Card 2',
    description: 'This is the second card in the grid.',
    imageUrl: 'https://picsum.photos/400/200?random=2',
    buttonText: 'Get Started',
    buttonProps: {
      variant: 'secondary',
    },
  },
  {
    title: 'Card 3',
    description: 'This is the third card in the grid.',
    imageUrl: 'https://picsum.photos/400/200?random=3',
    buttonText: 'View Details',
    buttonProps: {
      variant: 'outline',
    },
  },
  {
    title: 'Card 4',
    description: 'This is the fourth card in the grid.',
    imageUrl: 'https://picsum.photos/400/200?random=4',
    buttonText: 'Explore',
    buttonProps: {
      variant: 'ghost',
    },
  },
];

export const Default: Story = {
  args: {
    cards: sampleCards,
    columns: 3,
    gap: 'md',
  },
};

export const SingleColumn: Story = {
  args: {
    cards: sampleCards,
    columns: 1,
    gap: 'md',
  },
};

export const TwoColumns: Story = {
  args: {
    cards: sampleCards,
    columns: 2,
    gap: 'md',
  },
};

export const FourColumns: Story = {
  args: {
    cards: sampleCards,
    columns: 4,
    gap: 'md',
  },
};

export const SmallGap: Story = {
  args: {
    cards: sampleCards,
    columns: 3,
    gap: 'sm',
  },
};

export const LargeGap: Story = {
  args: {
    cards: sampleCards,
    columns: 3,
    gap: 'lg',
  },
};

export const WithEvents: Story = {
  args: {
    cards: sampleCards,
    columns: 3,
    gap: 'md',
    onClick: index => alert(`Card ${index + 1} clicked!`),
    onMouseEnter: index => console.log(`Mouse entered card ${index + 1}`),
    onMouseLeave: index => console.log(`Mouse left card ${index + 1}`),
  },
};

export const WithAriaLabel: Story = {
  args: {
    cards: sampleCards,
    columns: 3,
    gap: 'md',
    ariaLabel: 'This is an accessible card grid',
  },
};
