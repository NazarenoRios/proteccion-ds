import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductGrid } from '../ProductGrid';

const mockProducts = [
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

describe('ProductGrid', () => {
  it('renders with required props', () => {
    render(<ProductGrid products={mockProducts} />);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('renders with title and description', () => {
    render(
      <ProductGrid
        products={mockProducts}
        title="Featured Products"
        description="Check out our featured products"
      />
    );
    expect(screen.getByText('Featured Products')).toBeInTheDocument();
    expect(screen.getByText('Check out our featured products')).toBeInTheDocument();
  });

  it('renders load more button when onLoadMore is provided', () => {
    const handleLoadMore = jest.fn();
    render(<ProductGrid products={mockProducts} onLoadMore={handleLoadMore} />);
    const loadMoreButton = screen.getByRole('button', { name: /cargar más productos/i });
    expect(loadMoreButton).toBeInTheDocument();
    fireEvent.click(loadMoreButton);
    expect(handleLoadMore).toHaveBeenCalledTimes(1);
  });

  it('shows loading state in load more button', () => {
    render(<ProductGrid products={mockProducts} onLoadMore={() => {}} isLoading={true} />);
    expect(screen.getByRole('button', { name: /cargando/i })).toBeInTheDocument();
  });

  it('does not render load more button when onLoadMore is not provided', () => {
    render(<ProductGrid products={mockProducts} />);
    expect(screen.queryByRole('button', { name: /cargar más productos/i })).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ProductGrid products={mockProducts} className="custom-class" />);
    expect(screen.getByText('Product 1').closest('.custom-class')).toBeInTheDocument();
  });

  it('renders all products with correct data', () => {
    render(<ProductGrid products={mockProducts} />);
    mockProducts.forEach(product => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
      expect(screen.getByText(product.category)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price.toFixed(2)}`)).toBeInTheDocument();
    });
  });

  it('renders with centered layout', () => {
    render(<ProductGrid products={mockProducts} />);
    const container = screen.getByText('Product 1').closest('.max-w-7xl');
    expect(container).toHaveClass('mx-auto');
  });
});
