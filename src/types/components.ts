import { ButtonVariant, ButtonSize, InputVariant, InputSize } from './common';
import type { IconName } from '../utils/iconUtils';

// Tipos para componentes
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  ariaLabel?: string;
}

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  ariaLabel?: string;
}

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  className?: string;
  ariaLabel?: string;
}

export interface CardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  buttonText?: string;
  buttonProps?: Omit<ButtonProps, 'children'>;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  ariaLabel?: string;
}

export interface CardGridProps {
  cards: Omit<CardProps, 'className'>[];
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: (index: number) => void;
  onMouseEnter?: (index: number) => void;
  onMouseLeave?: (index: number) => void;
  ariaLabel?: string;
}

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
  set?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export interface ModalProps {
  /**
   * Indica si el modal está abierto
   */
  isOpen: boolean;
  /**
   * Función para cerrar el modal
   */
  onClose: () => void;
  /**
   * Título del modal
   */
  title: string;
  /**
   * Contenido del modal
   */
  children: React.ReactNode;
  /**
   * Tipo de modal basado en el diseño
   */
  variant?: 'content' | 'prevention' | 'mobile';
  /**
   * Texto del botón principal
   */
  primaryButtonText?: string;
  /**
   * Función del botón principal
   */
  onPrimaryAction?: () => void;
  /**
   * Texto del botón secundario
   */
  secondaryButtonText?: string;
  /**
   * Función del botón secundario
   */
  onSecondaryAction?: () => void;
  /**
   * Icono del modal
   */
  icon?: string;
  /**
   * Clase CSS adicional
   */
  className?: string;
  /**
   * Indica si se puede cerrar haciendo clic fuera del modal
   */
  closeOnOverlayClick?: boolean;
  /**
   * Etiqueta ARIA para accesibilidad
   */
  ariaLabel?: string;
}
