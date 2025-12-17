import React from 'react';

export type PillVariant = 'general' | 'inversion';

export interface PillOption {
  /**
   * Identificador único de la pill
   */
  id: string;
  /**
   * Texto a mostrar en la pill
   */
  label: string;
  /**
   * Número de resultados (opcional)
   */
  count?: number;
  /**
   * Indica si la pill está deshabilitada
   */
  disabled?: boolean;
}

export interface PillsProps {
  /**
   * Lista de opciones de pills
   */
  options: PillOption[];
  /**
   * ID de la pill seleccionada
   */
  selectedId?: string;
  /**
   * Función que se ejecuta al seleccionar una pill
   */
  onSelect: (id: string) => void;
  /**
   * Variante visual de las pills
   * @default 'general'
   */
  variant?: PillVariant;
  /**
   * Clases CSS adicionales
   */
  className?: string;
  /**
   * Nombre del grupo para accesibilidad
   */
  name?: string;
}

export const Pills: React.FC<PillsProps> = ({
  options,
  selectedId,
  onSelect,
  variant = 'general',
  className = '',
  name = 'pills-group',
}) => {
  const getVariantStyles = (isSelected: boolean, isDisabled: boolean) => {
    if (isDisabled) {
      return {
        general: 'bg-basic-neutral-100 text-basic-neutral-400 cursor-not-allowed border-basic-neutral-200',
        inversion: 'bg-basic-neutral-700 text-basic-neutral-500 cursor-not-allowed border-basic-neutral-600',
      };
    }

    if (isSelected) {
      return {
        general: 'bg-primary-azul-proteccion-500 text-white border-primary-azul-proteccion-500 shadow-sm',
        inversion: 'bg-basic-neutral-900 text-white border-basic-neutral-900 shadow-sm',
      };
    }

    // Estado normal/hover
    return {
      general: 'bg-white text-primary-azul-proteccion-500 border-primary-azul-proteccion-500 hover:bg-primary-azul-proteccion-800 hover:text-white active:bg-primary-azul-proteccion-500 active:text-white',
      inversion: 'bg-transparent text-basic-neutral-800 border-basic-neutral-800 hover:bg-basic-neutral-800 hover:text-white active:bg-primary-azul-proteccion-900 active:text-white',
    };
  };

  const getCountStyles = (isSelected: boolean) => {
    if (isSelected) {
      return 'bg-primary-amarillo-proteccion-500 text-basic-neutral-900';
    }
    return 'bg-primary-amarillo-proteccion-500 text-basic-neutral-900';
  };

  return (
    <div 
      className={`flex flex-wrap gap-2 ${className}`}
      role="radiogroup"
      aria-label={name}
    >
      {options.map((option) => {
        const isSelected = selectedId === option.id;
        const isDisabled = option.disabled || false;
        const variantStyle = getVariantStyles(isSelected, isDisabled)[variant];

        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-disabled={isDisabled}
            disabled={isDisabled}
            onClick={() => !isDisabled && onSelect(option.id)}
            className={`
              inline-flex items-center px-4 py-2 rounded-full border
              transition-all duration-200 ease-in-out
              focus:outline-none
              font-families-sura-sans-0
              ${variantStyle}
            `}
            style={{
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: 400
            }}
          >
            <span>{option.label}</span>
            {option.count !== undefined && (
              <span 
                className={`
                  inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 
                  rounded text-xs font-semibold leading-none
                  ${getCountStyles(isSelected)}
                `}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};