import React, { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

// Tipos comunes para variantes y tamaños
export type ButtonVariant = 
  | 'primaryGeneral' 
  | 'primaryInverse'
  | 'secondaryGeneral'
  | 'secondaryInverse'
  | 'tertiaryGeneral'
  | 'tertiaryInverse';
export type ButtonSize = 'S' | 'M' | 'L';
export type InputVariant = 'text' | 'select' | 'textarea';
export type InputSize = 'S' | 'M' | 'L';
export type RadioButtonVariant = 'general' | 'inversion';
export type BadgeSize = 'S' | 'M' | 'L';
export type BadgeColor = 'basic-neutral-regular' | 'basic-neutral-bold' | 'primary' | 'secondary' | 'secondary-info' | 'secondary-exito' | 'secondary-advertencia' | 'secondary-peligro';

export type StepStatus = 'Activo' | 'Realizado' | 'Inactivo';

export interface Step {
  /**
   * Identificador único del paso
   */
  id: string | number;
  /**
   * Título del paso
   */
  title: string;
  /**
   * Icono opcional para el paso (solo aplica en variante vertical)
   */
  icon?: string;
  /**
   * Descripción opcional del paso
   */
  description?: string;
  /**
   * Estado del paso
   * @default 'pending'
   */
  status?: StepStatus;
  /**
   * Indica si el paso está deshabilitado
   * @default false
   */
  disabled?: boolean;
}

export type StepperVariant = 'number' | 'icon' | 'inversion';




// Button types
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Contenido del botón
   */
  children: ReactNode;
  /**
   * Variante visual del botón
   * @default 'primary-general'
   */
  variant?: ButtonVariant;
  /**
   * Tamaño del botón
   * @default 'md'
   */
  size?: 'S' | 'M' | 'L';
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

export interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Contenido del radio button
   */
  children?: React.ReactNode;
  /**
   * Variante visual del radio button
   * @default 'general'
   */
  variant?: 'general' | 'inversion';
  /**
   * Etiqueta del radio button
   */
  label?: string;
  /**
   * Indica si el radio button está deshabilitado
   * @default false
   */
  disabled?: boolean;
  /**
   * Etiqueta ARIA para accesibilidad
   */
  ariaLabel?: string;
}




export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tamaño del badge
   * @default 'M'
   */
  size?: BadgeSize;
  /**
   * Color del texto del badge
   * @default 'neutral-700'
   */
  color?: BadgeColor;
  /**
   * Contenido del badge
   */
  children: React.ReactNode;
  /**
   * Texto que aparece sobre el badge
   */
  label?: string;
  /**
   * Clase CSS adicional
   */
  className?: string;
}