import React from 'react';

export type CheckboxVariant = 'normal' | 'inversion';
export type CheckboxState = 'checked' | 'unchecked' | 'indeterminate';

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
   * @default 'normal'
   */
  variant?: CheckboxVariant;
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
   * @default false
   */
  disabled?: boolean;
  /**
   * Clases CSS adicionales
   */
  className?: string;
}

// Tipos legacy para compatibilidad
export type CheckboxSize = 'S' | 'M' | 'L';

export interface CheckboxPropsLegacy extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange'> {
  /**
   * Variante visual del checkbox
   * @default 'general'
   */
  variant?: 'general' | 'inversion';
  /**
   * Estado del checkbox
   * @default 'unchecked'
   */
  state?: CheckboxState;
  /**
   * Tamaño del checkbox
   * @default 'M'
   */
  size?: CheckboxSize;
  /**
   * Etiqueta del checkbox
   */
  label?: string;
  /**
   * Indica si el checkbox está deshabilitado
   * @default false
   */
  disabled?: boolean;
  /**
   * Texto de ayuda o descripción
   */
  helperText?: string;
  /**
   * Indica si hay un error
   * @default false
   */
  error?: boolean;
  /**
   * Mensaje de error
   */
  errorMessage?: string;
  /**
   * Indica si el checkbox es requerido
   * @default false
   */
  required?: boolean;
  /**
   * Nombre del campo para formularios
   */
  name?: string;
  /**
   * Valor del checkbox
   */
  value?: string;
  /**
   * Función que se ejecuta cuando cambia el estado
   */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Función que se ejecuta cuando se hace clic
   */
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  /**
   * Función que se ejecuta cuando se enfoca
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Función que se ejecuta cuando se pierde el foco
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Clases CSS adicionales
   */
  className?: string;
  /**
   * Etiqueta ARIA para accesibilidad
   */
  ariaLabel?: string;
} 