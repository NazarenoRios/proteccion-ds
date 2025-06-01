import React from 'react';
import { CardGrid } from '../../organisms/CardGrid/CardGrid';
import { Button } from '../../atoms/Button/Button';
import type { ProductGridProps } from '../../../types';

export interface Product {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title,
  description,
  onLoadMore,
  isLoading = false,
  className = '',
}) => {
  const cards = products.map(product => ({
    id: product.id,
    title: product.title,
    description: product.description,
    imageUrl: product.imageUrl,
    price: product.price,
    category: product.category,
  }));

  return (
    <div className="flex justify-center items-center w-full">
      <div className={`max-w-7xl mx-auto ${className}`}>
        {title && <h2 className="text-2xl font-bold mb-2 text-center">{title}</h2>}
        {description && <p className="text-gray-600 mb-6 text-center">{description}</p>}
        <CardGrid cards={cards} />
        {onLoadMore && (
          <div className="mt-8 text-center">
            <Button variant="outline" onClick={onLoadMore} isLoading={isLoading}>
              {isLoading ? 'Cargando...' : 'Cargar Más Productos'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
