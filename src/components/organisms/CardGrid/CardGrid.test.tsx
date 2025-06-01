import { render, screen, fireEvent } from '@testing-library/react';
import { CardGrid } from './CardGrid';

const mockCards = [
  {
    id: 1,
    title: 'Producto 1',
    description: 'Descripción 1',
    imageUrl: 'imagen1.jpg',
    price: 99.99,
    category: 'Categoría 1',
  },
  {
    id: 2,
    title: 'Producto 2',
    description: 'Descripción 2',
    imageUrl: 'imagen2.jpg',
    price: 149.99,
    category: 'Categoría 2',
  },
];

describe('CardGrid', () => {
  it('debería renderizar con las props por defecto', () => {
    render(<CardGrid cards={mockCards} />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
    expect(screen.getByText('Producto 1')).toBeInTheDocument();
    expect(screen.getByText('Producto 2')).toBeInTheDocument();
  });

  it('debería renderizar con diferentes configuraciones de columnas', () => {
    const { rerender } = render(<CardGrid cards={mockCards} columns={1} />);
    expect(screen.getByRole('grid')).toHaveClass('grid-cols-1');

    rerender(<CardGrid cards={mockCards} columns={2} />);
    expect(screen.getByRole('grid')).toHaveClass('md:grid-cols-2');

    rerender(<CardGrid cards={mockCards} columns={3} />);
    expect(screen.getByRole('grid')).toHaveClass('lg:grid-cols-3');

    rerender(<CardGrid cards={mockCards} columns={4} />);
    expect(screen.getByRole('grid')).toHaveClass('lg:grid-cols-4');
  });

  it('debería renderizar con diferentes tamaños de espacio', () => {
    const { rerender } = render(<CardGrid cards={mockCards} gap="sm" />);
    expect(screen.getByRole('grid')).toHaveClass('gap-4');

    rerender(<CardGrid cards={mockCards} gap="md" />);
    expect(screen.getByRole('grid')).toHaveClass('gap-6');

    rerender(<CardGrid cards={mockCards} gap="lg" />);
    expect(screen.getByRole('grid')).toHaveClass('gap-8');
  });

  it('debería manejar eventos de clic', () => {
    const handleClick = jest.fn();
    render(<CardGrid cards={mockCards} onClick={handleClick} />);
    const cards = screen.getAllByRole('article');
    fireEvent.click(cards[0]);
    expect(handleClick).toHaveBeenCalledWith(0);
    fireEvent.click(cards[1]);
    expect(handleClick).toHaveBeenCalledWith(1);
  });

  it('debería manejar eventos del mouse', () => {
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

  it('debería aplicar className personalizado', () => {
    render(<CardGrid cards={mockCards} className="clase-personalizada" />);
    expect(screen.getByRole('grid')).toHaveClass('clase-personalizada');
  });

  it('debería renderizar con aria-label', () => {
    render(<CardGrid cards={mockCards} ariaLabel="Cuadrícula de productos" />);
    expect(screen.getByRole('grid')).toHaveAttribute('aria-label', 'Cuadrícula de productos');
  });

  it('debería renderizar todas las tarjetas con las props correctas', () => {
    render(<CardGrid cards={mockCards} />);
    mockCards.forEach(card => {
      expect(screen.getByText(card.title)).toBeInTheDocument();
      expect(screen.getByText(card.description)).toBeInTheDocument();
      expect(screen.getByText(card.category)).toBeInTheDocument();
      expect(screen.getByText(`$${card.price.toFixed(2)}`)).toBeInTheDocument();
    });
  });
});
