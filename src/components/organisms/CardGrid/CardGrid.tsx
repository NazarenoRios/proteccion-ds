import React from 'react';
import { Card } from '../../molecules/Card/Card';
import type { CardGridProps } from '../../../types';

export const CardGrid: React.FC<CardGridProps> = ({
  cards,
  columns = 3,
  gap = 'md',
  className = '',
  onClick,
  onMouseEnter,
  onMouseLeave,
  ariaLabel,
}) => {
  const columnStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gapStyles = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div
        className={`grid ${columnStyles[columns]} ${gapStyles[gap]} ${className} max-w-7xl mx-auto`}
        role="grid"
        aria-label={ariaLabel}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            {...card}
            onClick={() => onClick?.(index)}
            onMouseEnter={() => onMouseEnter?.(index)}
            onMouseLeave={() => onMouseLeave?.(index)}
            buttonText="Ver Detalles"
          />
        ))}
      </div>
    </div>
  );
};
