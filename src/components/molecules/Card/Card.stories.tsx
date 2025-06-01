import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    imageUrl: { control: 'text' },
    buttonText: { control: 'text' },
    buttonProps: { control: 'object' },
    onClick: { action: 'clicked' },
    onMouseEnter: { action: 'mouseEnter' },
    onMouseLeave: { action: 'mouseLeave' },
    ariaLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  args: {
    title: 'Card Title',
    description: 'This is a basic card with a title and description.',
  },
};

export const WithImage: Story = {
  args: {
    title: 'Card with Image',
    description: 'This card includes an image at the top.',
    imageUrl: 'https://picsum.photos/400/200',
  },
};

export const WithButton: Story = {
  args: {
    title: 'Card with Button',
    description: 'This card includes a call-to-action button.',
    buttonText: 'Learn More',
    buttonProps: {
      variant: 'primary',
    },
  },
};

export const Complete: Story = {
  args: {
    title: 'Complete Card',
    description: 'This card includes an image, description, and a button.',
    imageUrl: 'https://picsum.photos/400/200',
    buttonText: 'Get Started',
    buttonProps: {
      variant: 'primary',
      size: 'lg',
    },
  },
};

export const WithEvents: Story = {
  args: {
    title: 'Interactive Card',
    description: 'This card has click and hover events.',
    imageUrl: 'https://picsum.photos/400/200',
    buttonText: 'Click Me',
    buttonProps: {
      variant: 'primary',
    },
    onClick: () => alert('Card clicked!'),
    onMouseEnter: () => console.log('Mouse entered card'),
    onMouseLeave: () => console.log('Mouse left card'),
  },
};

export const WithAriaLabel: Story = {
  args: {
    title: 'Accessible Card',
    description: 'This card has an aria-label for accessibility.',
    imageUrl: 'https://picsum.photos/400/200',
    buttonText: 'Learn More',
    buttonProps: {
      variant: 'primary',
    },
    ariaLabel: 'This is an accessible card',
  },
};
