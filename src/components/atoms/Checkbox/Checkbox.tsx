import React, { forwardRef, useEffect, useRef } from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /**
   * Indica si el checkbox está marcado
   */
  checked?: boolean;
  /**
   * Estado indeterminado (parcialmente seleccionado)
   */
  indeterminate?: boolean;
  /**
   * Variante de estilo - normal o inversión (fondo oscuro)
   */
  variant?: 'normal' | 'inversion';
  /**
   * Función que se ejecuta cuando cambia el estado
   */
  onChange?: (checked: boolean) => void;
  /**
   * Etiqueta del checkbox
   */
  label?: string;
  /**
   * Indica si el checkbox está deshabilitado
   */
  disabled?: boolean;
  /**
   * Clases CSS adicionales
   */
  className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  checked = false,
  indeterminate = false,
  variant = 'normal',
  onChange,
  label,
  disabled = false,
  className = '',
  id,
  ...props
}, ref) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  const internalRef = useRef<HTMLInputElement>(null);
  const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

  // Manejar el estado indeterminado
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate, inputRef]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(event.target.checked);
  };

  const getCheckboxStyles = () => {
    const baseStyles = 'inline-flex items-center justify-center w-5 h-5 border-2 transition-all duration-200 cursor-pointer';
    
    if (disabled) {
      if (variant === 'inversion') {
        return `${baseStyles} opacity-50 cursor-not-allowed bg-basic-neutral-500 border-basic-neutral-500`;
      }
      return `${baseStyles} opacity-50 cursor-not-allowed bg-basic-neutral-200 border-basic-neutral-300`;
    }
    
    if (variant === 'inversion') {
      if (checked || indeterminate) {
        return `${baseStyles} bg-basic-neutral-900 border-basic-neutral-900 hover:bg-basic-neutral-800 hover:border-basic-neutral-800 focus:outline-none focus:ring-2 focus:ring-basic-neutral-900 focus:ring-offset-2`;
      }
      return `${baseStyles} bg-white border-basic-neutral-900 hover:bg-basic-neutral-50 focus:outline-none focus:ring-2 focus:ring-basic-neutral-900 focus:ring-offset-2`;
    }
    
    // Variante normal
    if (checked || indeterminate) {
      return `${baseStyles} bg-primary-azul-proteccion-500 border-primary-azul-proteccion-500 hover:bg-primary-azul-proteccion-600 hover:border-primary-azul-proteccion-600 focus:outline-none focus:ring-2 focus:ring-primary-azul-proteccion-500 focus:ring-offset-2`;
    }
    
    return `${baseStyles} bg-white border-basic-neutral-400 hover:border-primary-azul-proteccion-500 focus:outline-none focus:ring-2 focus:ring-primary-azul-proteccion-500 focus:ring-offset-2`;
  };

  const renderIcon = () => {
    const iconColor = variant === 'inversion' ? 'text-white' : 'text-white';
    
    if (indeterminate) {
      return (
        <svg
          className={`w-3 h-3 ${iconColor}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    
    if (checked) {
      return (
        <svg
          className={`w-3 h-3 ${iconColor}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    
    return null;
  };

  const getLabelStyles = () => {
    const baseStyles = 'text-base font-medium cursor-pointer transition-colors duration-200 leading-5';
    
    if (disabled) {
      return `${baseStyles} text-basic-neutral-400`;
    }
    
    if (variant === 'inversion') {
      return `${baseStyles} text-basic-neutral-900 hover:text-basic-neutral-700`;
    }
    
    return `${baseStyles} text-basic-neutral-900 hover:text-primary-azul-proteccion-600`;
  };

  return (
    <div className={`flex items-start space-x-3 ${className}`}>
      <div className="relative flex-shrink-0 mt-0.5">
        <input
          ref={inputRef}
          id={checkboxId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          className="sr-only"
          aria-describedby={label ? `${checkboxId}-label` : undefined}
          {...props}
        />
        <label
          htmlFor={checkboxId}
          className={getCheckboxStyles()}
          style={{ borderRadius: '3px' }}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              onChange?.(!checked);
            }
          }}
        >
          {renderIcon()}
        </label>
      </div>
      
      {label && (
        <label
          id={`${checkboxId}-label`}
          htmlFor={checkboxId}
          className={getLabelStyles()}
        >
          {label}
        </label>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox'; 