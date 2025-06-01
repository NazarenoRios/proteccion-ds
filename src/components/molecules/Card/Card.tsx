import React from 'react';
import { Button } from '../../atoms/Button/Button';
import type { CardProps } from '../../../types';

export const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  price,
  category,
  buttonText = 'Ver Detalles',
  buttonProps,
  className = '',
  onClick,
  onMouseEnter,
  onMouseLeave,
  ariaLabel,
}) => {
  return (
    <div className="flex justify-center items-center p-4">
      <div
        className={`bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg w-full max-w-sm ${className}`}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        role="article"
        aria-label={ariaLabel}
      >
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <span className="text-sm text-gray-500">{category}</span>
          </div>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">
              ${typeof price === 'number' ? price.toFixed(2) : '0.00'}
            </span>
            <Button {...buttonProps}>{buttonText}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
