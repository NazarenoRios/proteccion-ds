import React, { useState } from 'react';
import { ProductGrid } from '../../templates/ProductGrid/ProductGrid';
import { Button } from '../../atoms/Button/Button';
import { SearchBar } from '../../molecules/SearchBar/SearchBar';
import type { ProductsPageProps } from '../../../types';

export const ProductsPage: React.FC<ProductsPageProps> = ({
  initialProducts,
  categories,
  className = '',
  onClick,
  onMouseEnter,
  onMouseLeave,
  ariaLabel,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLoadMore = async () => {
    setIsLoading(true);
    // Simulando una llamada a la API
    await new Promise(resolve => setTimeout(resolve, 1000));
    setProducts(prev => [...prev, ...initialProducts]);
    setIsLoading(false);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-50">
      <div className={`max-w-7xl mx-auto px-4 py-8 ${className}`}>
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Nuestros Productos</h1>
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'primary' : 'outline'}
              onClick={() => setSelectedCategory('all')}
            >
              Todos
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'outline'}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </header>

        <ProductGrid
          products={filteredProducts}
          title="Productos Destacados"
          description="Descubre nuestra selección de productos más populares"
          onLoadMore={handleLoadMore}
          isLoading={isLoading}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      </div>
    </div>
  );
};
