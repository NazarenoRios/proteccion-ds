import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CardGrid } from '../CardGrid';

const mockCards = [
  {
    id: 1,
    title: 'Product 1',
    description: 'Description 1',
    imageUrl: 'image1.jpg',
    price: 99.99,
    category: 'Category 1',
  },
  {
    id: 2,
    title: 'Product 2',
    description: 'Description 2',
    imageUrl: 'image2.jpg',
    price: 149.99,
    category: 'Category 2',
  },
];

describe('CardGrid', () => {
  it('renders with default props', () => {
    render(<CardGrid cards={mockCards} />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('renders with different column configurations', () => {
    const { rerender } = render(<CardGrid cards={mockCards} columns={1} />);
    expect(screen.getByRole('grid')).toHaveClass('grid-cols-1');

    rerender(<CardGrid cards={mockCards} columns={2} />);
    expect(screen.getByRole('grid')).toHaveClass('md:grid-cols-2');

    rerender(<CardGrid cards={mockCards} columns={3} />);
    expect(screen.getByRole('grid')).toHaveClass('lg:grid-cols-3');

    rerender(<CardGrid cards={mockCards} columns={4} />);
    expect(screen.getByRole('grid')).toHaveClass('lg:grid-cols-4');
  });

  it('renders with different gap sizes', () => {
    const { rerender } = render(<CardGrid cards={mockCards} gap="sm" />);
    expect(screen.getByRole('grid')).toHaveClass('gap-4');

    rerender(<CardGrid cards={mockCards} gap="md" />);
    expect(screen.getByRole('grid')).toHaveClass('gap-6');

    rerender(<CardGrid cards={mockCards} gap="lg" />);
    expect(screen.getByRole('grid')).toHaveClass('gap-8');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<CardGrid cards={mockCards} onClick={handleClick} />);
    const cards = screen.getAllByRole('article');
    fireEvent.click(cards[0]);
    expect(handleClick).toHaveBeenCalledWith(0);
    fireEvent.click(cards[1]);
    expect(handleClick).toHaveBeenCalledWith(1);
  });

  it('handles mouse events', () => {
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();
    render(
      <CardGrid cards={mockCards} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
    );
    const cards = screen.getAllByRole('article');
    fireEvent.mouseEnter(cards[0]);
    expect(handleMouseEnter).toHaveBeenCalledWith(0);
    fireEvent.mouseLeave(cards[0]);
    expect(handleMouseLeave).toHaveBeenCalledWith(0);
  });

  it('applies custom className', () => {
    render(<CardGrid cards={mockCards} className="custom-class" />);
    expect(screen.getByRole('grid')).toHaveClass('custom-class');
  });

  it('renders with aria-label', () => {
    render(<CardGrid cards={mockCards} ariaLabel="Product grid" />);
    expect(screen.getByRole('grid')).toHaveAttribute('aria-label', 'Product grid');
  });

  it('renders all cards with correct props', () => {
    render(<CardGrid cards={mockCards} />);
    mockCards.forEach(card => {
      expect(screen.getByText(card.title)).toBeInTheDocument();
      expect(screen.getByText(card.description)).toBeInTheDocument();
      expect(screen.getByText(card.category)).toBeInTheDocument();
      expect(screen.getByText(`$${card.price.toFixed(2)}`)).toBeInTheDocument();
    });
  });
});
