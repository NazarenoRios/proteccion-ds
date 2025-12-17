import React, { forwardRef, useState } from 'react';

export interface InputProps {
  /**
   * Etiqueta del campo de entrada
   */
  label?: string;
  /**
   * Texto de apoyo que brinda orientación adicional
   */
  helperText?: string;
  /**
   * Mensaje de error
   */
  errorMessage?: string;
  /**
   * Indica si el input está en estado de error
   */
  hasError?: boolean;
  /**
   * Variante de estilo
   * @default 'text'
   */
  variant?: 'text' | 'select' | 'textarea';
  /**
   * Tamaño del input
   * @default 'M'
   */
  size?: 'S' | 'M' | 'L';
  /**
   * Indica si el input está deshabilitado
   */
  disabled?: boolean;
  /**
   * Placeholder personalizado
   */
  placeholder?: string;
  /**
   * Clases CSS adicionales
   */
  className?: string;
  /**
   * Valor del input
   */
  value?: string;
  /**
   * Callback para cuando cambia el valor
   */
  onChange?: (value: string) => void;
  /**
   * Callback para el evento focus
   */
  onFocus?: () => void;
  /**
   * Callback para el evento blur
   */
  onBlur?: () => void;
  /**
   * ID del input
   */
  id?: string;
  /**
   * Name del input
   */
  name?: string;
  /**
   * Opciones para select (solo aplica cuando variant es 'select')
   */
  options?: Array<{ value: string; label: string }>;
  /**
   * Filas para textarea (solo aplica cuando variant es 'textarea')
   */
  rows?: number;
}

export const Input = forwardRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, InputProps>(({
  label,
  helperText,
  errorMessage,
  hasError = false,
  variant = 'text',
  size = 'M',
  disabled = false,
  placeholder,
  className = '',
  options = [],
  rows = 4,
  id,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  // Estilos base del input
  const baseInputStyles = 'w-full border transition-all duration-200 outline-none resize-none';
  
  // Estilos según el tamaño
  const sizeStyles = {
    S: 'px-3 py-2 text-sm',
    M: 'px-4 py-3 text-base',
    L: 'px-4 py-4 text-lg',
  };

  // Estilos según el estado
  const getInputStateStyles = () => {
    if (disabled) {
      return 'bg-basic-neutral-100 border-basic-neutral-300 text-basic-neutral-500 cursor-not-allowed';
    }
    
    if (hasError) {
      return 'bg-white border-secondary-peligro-700 text-basic-neutral-900 focus:border-secondary-peligro-700 focus:ring-2 focus:ring-secondary-peligro-100';
    }
    
    if (isFocused) {
      return 'bg-white border-primary-azul-proteccion-500 text-basic-neutral-900 ring-2 ring-primary-azul-proteccion-100';
    }
    
    // Estado activo (con contenido) o inactivo (sin contenido)
    return 'bg-white border-basic-neutral-300 text-basic-neutral-900 hover:border-basic-neutral-400 focus:border-primary-azul-proteccion-500 focus:ring-2 focus:ring-primary-azul-proteccion-100';
  };

  const inputStyles = `${baseInputStyles} ${sizeStyles[size]} ${getInputStateStyles()} ${className}`;

  // Estilos para la etiqueta
  const labelStyles = `block text-[15px] font-normal text-basic-neutral-900 mb-1 ${disabled ? 'text-basic-neutral-500' : ''}`;
  
  // Estilos para el texto de apoyo
  const helperTextStyles = `text-[13px] font-normal text-basic-neutral-600 mt-1 ${disabled ? 'text-basic-neutral-400' : ''}`;
  
  // Estilos para el mensaje de error
  const errorMessageStyles = 'text-[13px] font-normal text-secondary-peligro-700 mt-1';

  const handleFocus = (e: React.FocusEvent) => {
    if (!disabled) {
      setIsFocused(true);
      props.onFocus?.();
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    setIsFocused(false);
    props.onBlur?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!disabled) {
      props.onChange?.(e.target.value);
    }
  };

  const renderInput = () => {
    switch (variant) {
      case 'select':
        return (
          <select
            ref={ref as React.Ref<HTMLSelectElement>}
            id={inputId}
            name={props.name}
            value={props.value}
            disabled={disabled}
            className={inputStyles}
            style={{
              borderRadius: '3px',
              padding: '8px 12px',
              fontSize: '15px',
              lineHeight: '20px'
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'textarea':
        return (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={inputId}
            name={props.name}
            value={props.value}
            disabled={disabled}
            className={inputStyles}
            style={{
              borderRadius: '3px',
              padding: '8px 12px',
              fontSize: '15px',
              lineHeight: '20px'
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            rows={rows}
            placeholder={placeholder || 'Placeholder texto de área'}
          />
        );
      
      default:
        return (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            type="text"
            id={inputId}
            name={props.name}
            value={props.value}
            disabled={disabled}
            className={inputStyles}
            style={{
              borderRadius: '3px',
              padding: '8px 12px',
              fontSize: '15px',
              lineHeight: '20px'
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={placeholder || 'Text'}
          />
        );
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className={labelStyles}>
          {label}
        </label>
      )}
      
      {renderInput()}
      
      {hasError && errorMessage && (
        <p className={errorMessageStyles}>
          {errorMessage}
        </p>
      )}
      
      {!hasError && helperText && (
        <p className={helperTextStyles}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input'; 