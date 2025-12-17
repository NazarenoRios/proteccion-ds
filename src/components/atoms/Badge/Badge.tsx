import React from 'react';
import type { BadgeProps } from '../../../types/common';



export const Badge: React.FC<BadgeProps> = ({
  children,
  size = 'M',
  color = 'basic-neutral-regular',
  className = '',
  ...props
}) => {
  const baseStyles = 'text: font-families-sura-sans-0 inline-flex items-center justify-center rounded';

  const sizeStyles = {
    S: { fontSize: '13px', lineHeight: '19px', fontWeight: 700 },
    M: { fontSize: '15px', lineHeight: '22px', fontWeight: 700 },
    L: { fontSize: '18px', lineHeight: '22px', fontWeight: 600 },
  };

  const colorStyles = {
    'basic-neutral-regular': 'text-basic-neutral-700 bg-basic-neutral-200',
    'basic-neutral-bold': 'text-basic-neutral-900 bg-basic-neutral-200',
    'primary': 'text-basic-neutral-100 bg-primary-azul-proteccion-500',
    'secondary': 'text-basic-neutral-900 bg-primary-amarillo-proteccion-500',
    'secondary-info': 'text-secondary-informacion-700 bg-secondary-informacion-100',
    'secondary-exito': 'text-secondary-exito-800 bg-secondary-exito-100',
    'secondary-advertencia': 'text-secondary-advertencia-800 bg-secondary-advertencia-200',
    'secondary-peligro': 'text-secondary-peligro-800 bg-secondary-peligro-100'
  };


  const variantStyles = `${colorStyles[color]}`;

  return (
    <div
      className={`${baseStyles} ${variantStyles} ${className}`}
      style={{
        padding: '1px 4px',
        ...sizeStyles[size]
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Badge;
