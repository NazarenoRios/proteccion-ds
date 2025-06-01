import { render, screen, fireEvent } from '@testing-library/react';
import { ProductGrid } from './ProductGrid';

const mockProducts = [
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

describe('ProductGrid', () => {
  it('debería renderizar con las props requeridas', () => {
    render(<ProductGrid products={mockProducts} />);
    expect(screen.getByText('Producto 1')).toBeInTheDocument();
    expect(screen.getByText('Producto 2')).toBeInTheDocument();
  });

  it('debería renderizar con título y descripción', () => {
    render(
      <ProductGrid
        products={mockProducts}
        title="Productos Destacados"
        description="Descubre nuestros productos destacados"
      />
    );
    expect(screen.getByText('Productos Destacados')).toBeInTheDocument();
    expect(screen.getByText('Descubre nuestros productos destacados')).toBeInTheDocument();
  });

  it('debería renderizar el botón de cargar más cuando se proporciona onLoadMore', () => {
    const handleLoadMore = jest.fn();
    render(<ProductGrid products={mockProducts} onLoadMore={handleLoadMore} />);
    const loadMoreButton = screen.getByRole('button', { name: /cargar más productos/i });
    expect(loadMoreButton).toBeInTheDocument();
    fireEvent.click(loadMoreButton);
    expect(handleLoadMore).toHaveBeenCalledTimes(1);
  });

  it('debería mostrar el estado de carga en el botón de cargar más', () => {
    render(<ProductGrid products={mockProducts} onLoadMore={() => {}} isLoading={true} />);
    expect(screen.getByRole('button', { name: /cargando/i })).toBeInTheDocument();
  });

  it('no debería renderizar el botón de cargar más cuando no se proporciona onLoadMore', () => {
    render(<ProductGrid products={mockProducts} />);
    expect(screen.queryByRole('button', { name: /cargar más productos/i })).not.toBeInTheDocument();
  });

  it('debería aplicar className personalizado', () => {
    render(<ProductGrid products={mockProducts} className="clase-personalizada" />);
    expect(screen.getByText('Producto 1').closest('.clase-personalizada')).toBeInTheDocument();
  });

  it('debería renderizar todos los productos con los datos correctos', () => {
    render(<ProductGrid products={mockProducts} />);
    mockProducts.forEach(product => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
      expect(screen.getByText(product.category)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price.toFixed(2)}`)).toBeInTheDocument();
    });
  });

  it('debería renderizar con diseño centrado', () => {
    render(<ProductGrid products={mockProducts} />);
    const container = screen.getByText('Producto 1').closest('.max-w-7xl');
    expect(container).toHaveClass('mx-auto');
  });
});
