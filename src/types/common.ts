import React from 'react';

// Tipos comunes para variantes y tamaños
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'outline' | 'filled';
export type InputSize = 'sm' | 'md' | 'lg';

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
