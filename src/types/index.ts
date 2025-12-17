// Exporta todos los tipos desde sus respectivos archivos
export * from './common';
export * from './components';
export * from './product';

// Common types
export type ButtonVariant = 'primaryGeneral' | 'primaryInverse' | 'secondaryGeneral' | 'secondaryInverse' | 'tertiaryGeneral' | 'tertiaryInverse';
export type ButtonSize = 'S' | 'M' | 'L';
export type InputVariant = 'default' | 'outline' | 'filled';
export type InputSize = 'sm' | 'md' | 'lg';

// Product types
export interface Product {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
}

// Card types
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

// Button types
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  ariaLabel?: string;
}

// Input types
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

// SearchBar types
export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  className?: string;
  ariaLabel?: string;
}

// CardGrid types
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

// ProductGrid types
export interface ProductGridProps {
  products: Product[];
  title?: string;
  description?: string;
  onLoadMore?: () => void;
  isLoading?: boolean;
  className?: string;
}

// ProductsPage types
export interface ProductsPageProps {
  initialProducts: Product[];
  categories: string[];
  className?: string;
  onClick?: (index: number) => void;
  onMouseEnter?: (index: number) => void;
  onMouseLeave?: (index: number) => void;
  ariaLabel?: string;
}
