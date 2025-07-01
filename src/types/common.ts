import React, { ReactNode, ButtonHTMLAttributes } from 'react';

// Tipos comunes para variantes y tamaños
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'outline' | 'filled';
export type InputSize = 'sm' | 'md' | 'lg';

// Button types
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Contenido del botón
   */
  children: ReactNode;
  /**
   * Variante visual del botón
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /**
   * Tamaño del botón
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Indica si el botón está en estado de carga
   * @default false
   */
  isLoading?: boolean;
  /**
   * Icono a mostrar a la izquierda del texto
   */
  leftIcon?: string | ReactNode;
  /**
   * Icono a mostrar a la derecha del texto
   */
  rightIcon?: string | ReactNode;
  /**
   * Hace que el botón ocupe todo el ancho disponible
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Etiqueta ARIA para accesibilidad
   */
  ariaLabel?: string;
}
