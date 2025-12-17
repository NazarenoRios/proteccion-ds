import React from 'react';

export type VarianteEtiqueta = 'información' | 'éxito' | 'advertencia' | 'peligro' | 'neutral';

export interface EtiquetaProps {
  /**
   * Texto de la etiqueta
   */
  etiqueta: string;
  /**
   * Variante visual de la etiqueta
   */
  variante?: VarianteEtiqueta;
  /**
   * Indica si la etiqueta se puede eliminar
   */
  removible?: boolean;
  /**
   * Función que se ejecuta cuando se elimina la etiqueta
   */
  onRemove?: () => void;
  /**
   * Clases CSS adicionales
   */
  className?: string;
}

export const Etiqueta: React.FC<EtiquetaProps> = ({
  etiqueta,
  variante = 'información',
  removible = false,
  onRemove,
  className = '',
}) => {
  const variantStyles = {
    información: {
      bg: 'bg-primary-azul-proteccion-100',
      text: 'text-primary-azul-proteccion-700',
      border: 'border-primary-azul-proteccion-200',
      hover: 'hover:bg-primary-azul-proteccion-150',
    },
    neutral: {
      bg: 'bg-basic-neutral-100',
      text: 'text-basic-neutral-700',
      border: 'border-basic-neutral-200',
      hover: 'hover:bg-basic-neutral-150',
    },
    éxito: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      border: 'border-green-200',
      hover: 'hover:bg-green-150',
    },
    advertencia: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      border: 'border-yellow-200',
      hover: 'hover:bg-yellow-150',
    },
    peligro: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      border: 'border-red-200',
      hover: 'hover:bg-red-150',
    },
  };

  const removeButtonStyles = {
    información: 'text-primary-azul-proteccion-500 hover:text-primary-azul-proteccion-700 hover:bg-primary-azul-proteccion-200',
    neutral: 'text-basic-neutral-500 hover:text-basic-neutral-700 hover:bg-basic-neutral-200',
    éxito: 'text-green-500 hover:text-green-700 hover:bg-green-200',
    advertencia: 'text-yellow-600 hover:text-yellow-800 hover:bg-yellow-200',
    peligro: 'text-red-500 hover:text-red-700 hover:bg-red-200',
  };

  const currentVariant = variantStyles[variante];

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onRemove?.();
    }
  };

  return (
    <span
      className={`inline-flex items-center font-normal border transition-all duration-200 ${currentVariant.bg} ${currentVariant.text} ${currentVariant.border} ${currentVariant.hover} ${className}`}
      style={{
        borderRadius: '15px',
        padding: '2px 4px',
        gap: '4px',
        fontSize: '13px',
        lineHeight: '19px'
      }}
    >
      <span className="select-none">{etiqueta}</span>
      {removible && (
        <button
          type="button"
          onClick={onRemove}
          onKeyDown={handleKeyDown}
          className={`ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-current transform hover:scale-110 ${removeButtonStyles[variante]}`}
          aria-label={`Eliminar ${etiqueta}`}
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </span>
  );
};

// Mantener compatibilidad con nombres anteriores
export const Tag = Etiqueta;
export type TagProps = EtiquetaProps;
export type TagVariant = VarianteEtiqueta; 