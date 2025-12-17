import React, { forwardRef } from 'react';

export interface InterruptorProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /**
   * Indica si el interruptor está activado
   */
  checked?: boolean;
  /**
   * Variante de estilo - general o inversión
   */
  variant?: 'general' | 'inversion';
  /**
   * Función que se ejecuta cuando cambia el estado
   */
  onChange?: (checked: boolean) => void;
  /**
   * Etiqueta del interruptor (se posiciona a la izquierda)
   */
  label?: string;
  /**
   * Indica si el interruptor está deshabilitado
   */
  disabled?: boolean;
  /**
   * Clases CSS adicionales
   */
  className?: string;
}

export const Interruptor = forwardRef<HTMLInputElement, InterruptorProps>(({
  checked = false,
  variant = 'general',
  onChange,
  label,
  disabled = false,
  className = '',
  id,
  ...props
}, ref) => {
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(event.target.checked);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      onChange?.(!checked);
    }
  };

  const getSwitchStyles = () => {
    const baseStyles = 'relative inline-flex items-center border transition-all duration-200 ease-in-out cursor-pointer focus:outline-none';
    
    if (disabled) {
      if (variant === 'inversion') {
        return `${baseStyles} opacity-50 cursor-not-allowed ${
          checked 
            ? 'bg-basic-neutral-600 border-basic-neutral-600' 
            : 'bg-basic-neutral-300 border-basic-neutral-400'
        }`;
      }
      return `${baseStyles} opacity-50 cursor-not-allowed ${
        checked 
          ? 'bg-primary-azul-proteccion-300 border-primary-azul-proteccion-300' 
          : 'bg-basic-neutral-200 border-basic-neutral-300'
      }`;
    }
    
    if (variant === 'inversion') {
      if (checked) {
        return `${baseStyles} bg-basic-neutral-900 border-basic-neutral-900 hover:bg-basic-neutral-800 hover:border-basic-neutral-800`;
      }
      return `${baseStyles} bg-basic-neutral-200 border-basic-neutral-400 hover:bg-basic-neutral-300 hover:border-basic-neutral-500`;
    }
    
    // Variante general
    if (checked) {
      return `${baseStyles} bg-primary-azul-proteccion-500 border-primary-azul-proteccion-500 hover:bg-primary-azul-proteccion-600 hover:border-primary-azul-proteccion-600`;
    }
    
    return `${baseStyles} bg-basic-neutral-200 border-basic-neutral-400 hover:bg-basic-neutral-300 hover:border-basic-neutral-500`;
  };

  const getThumbStyles = () => {
    const baseStyles = 'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out shadow-md';
    
    if (checked) {
      return `${baseStyles} translate-x-5`;
    }
    
    return `${baseStyles} translate-x-0.5`;
  };

  const getLabelStyles = () => {
    const baseStyles = 'text-base font-medium cursor-pointer transition-colors duration-200';
    
    if (disabled) {
      return `${baseStyles} text-basic-neutral-400`;
    }
    
    if (variant === 'inversion') {
      return `${baseStyles} text-basic-neutral-900 hover:text-basic-neutral-700`;
    }
    
    return `${baseStyles} text-basic-neutral-900 hover:text-primary-azul-proteccion-600`;
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Etiqueta a la izquierda según especificaciones */}
      {label && (
        <label
          id={`${switchId}-label`}
          htmlFor={switchId}
          className={getLabelStyles()}
        >
          {label}
        </label>
      )}
      
      <div className="relative flex-shrink-0">
        <input
          ref={ref}
          id={switchId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          className="sr-only"
          role="switch"
          aria-checked={checked}
          aria-labelledby={label ? `${switchId}-label` : undefined}
          {...props}
        />
        <button
          type="button"
          onClick={() => !disabled && onChange?.(!checked)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={getSwitchStyles()}
          style={{
            width: '42px',
            height: '20px',
            borderRadius: '12px'
          }}
          aria-labelledby={label ? `${switchId}-label` : undefined}
          role="switch"
          aria-checked={checked}
        >
          <span className={getThumbStyles()} />
        </button>
      </div>
    </div>
  );
});

Interruptor.displayName = 'Interruptor';

// Mantener compatibilidad con el nombre anterior
export const Switch = Interruptor;
export type SwitchProps = InterruptorProps; 