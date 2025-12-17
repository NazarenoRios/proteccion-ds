import React from 'react';
import type { IconName, IconSet } from '../../../utils/iconUtils';

// Pre-import all SVG icons as raw text
const iconModules = import.meta.glob('../../../assets/icons/*.svg', { 
  as: 'raw',
  eager: true 
});

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
  set?: IconSet;
  onClick?: () => void;
  ariaLabel?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'text-gray-600',
  className = '',
  onClick,
  ariaLabel,
  ...props
}) => {
  // Get the icon content directly from the pre-imported modules
  const iconPath = `../../../assets/icons/${name}.svg`;
  const iconContent = iconModules[iconPath];

  if (!iconContent) {
    return (
      <div 
        className={`inline-flex items-center justify-center bg-gray-100 text-gray-400 text-xs rounded ${className}`}
        style={{ width: size, height: size }}
        aria-label={`Error al cargar icono: ${name}`}
        title={`Error al cargar icono: ${name}`}
      >
        ?
      </div>
    );
  }

  // Process the SVG content
  let processedSvg = iconContent;
  
  // Reemplazar el fill hardcodeado con currentColor para permitir cambio de color con CSS
  processedSvg = processedSvg.replace(/fill="[^"]*"/g, 'fill="currentColor"');
  
  // Ajustar el tamaño del SVG
  processedSvg = processedSvg.replace(
    /width="\d+" height="\d+"/,
    `width="${size}" height="${size}"`
  );

  return (
    <span
      className={`inline-flex items-center justify-center ${color} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel || `Icono ${name}`}
      role={onClick ? 'button' : 'img'}
      dangerouslySetInnerHTML={{ __html: processedSvg }}
      {...props}
    />
  );
}; 