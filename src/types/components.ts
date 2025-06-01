import { ButtonVariant, ButtonSize, InputVariant, InputSize } from './common';

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
