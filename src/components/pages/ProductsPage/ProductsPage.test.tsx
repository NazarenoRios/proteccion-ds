import { render, screen, fireEvent } from '@testing-library/react';
import { ProductsPage } from './ProductsPage';
import type { Product } from '../../../types';

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Producto 1',
    description: 'Descripción del producto 1',
    price: 100,
    category: 'categoria1',
    imageUrl: 'imagen1.jpg',
  },
  {
    id: 2,
    title: 'Producto 2',
    description: 'Descripción del producto 2',
    price: 200,
    category: 'categoria2',
    imageUrl: 'imagen2.jpg',
  },
];

const mockCategories = ['categoria1', 'categoria2'];

describe('ProductsPage', () => {
  it('debería renderizar el título de la página', () => {
    render(<ProductsPage initialProducts={mockProducts} categories={mockCategories} />);
    expect(screen.getByText('Nuestros Productos')).toBeInTheDocument();
  });

  it('debería mostrar todos los productos inicialmente', () => {
    render(<ProductsPage initialProducts={mockProducts} categories={mockCategories} />);
    expect(screen.getByText('Producto 1')).toBeInTheDocument();
    expect(screen.getByText('Producto 2')).toBeInTheDocument();
  });

  it('debería filtrar productos por categoría', () => {
    render(<ProductsPage initialProducts={mockProducts} categories={mockCategories} />);
    const categoria1Button = screen.getByTestId('category-categoria1');
    fireEvent.click(categoria1Button);
    expect(screen.getByText('Producto 1')).toBeInTheDocument();
    expect(screen.queryByText('Producto 2')).not.toBeInTheDocument();
  });

  it('debería mostrar el botón de cargar más', () => {
    render(<ProductsPage initialProducts={mockProducts} categories={mockCategories} />);
    expect(screen.getByText('Cargar más')).toBeInTheDocument();
  });

  it('debería manejar la búsqueda de productos', () => {
    render(<ProductsPage initialProducts={mockProducts} categories={mockCategories} />);
    const searchInput = screen.getByPlaceholderText('Buscar productos...');
    fireEvent.change(searchInput, { target: { value: 'Producto 1' } });
    expect(screen.getByText('Producto 1')).toBeInTheDocument();
    expect(screen.queryByText('Producto 2')).not.toBeInTheDocument();
  });
});
