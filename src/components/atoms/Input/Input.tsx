import React from 'react';

export type InputVariant = 'default' | 'outline' | 'filled';
export type InputSize = 'sm' | 'md' | 'lg';

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

export const Input: React.FC<InputProps> = ({
  variant = 'default',
  size = 'md',
  label,
  error,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ariaLabel,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const baseStyles =
    'rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    default: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500',
    outline: 'border-2 border-blue-600 focus:ring-blue-500',
    filled:
      'bg-gray-100 border-transparent focus:ring-blue-500 focus:bg-white focus:border-blue-500',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const widthStyles = fullWidth ? 'w-full' : '';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'cursor-text';
  const errorStyles = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '';

  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${errorStyles} ${
            leftIcon ? 'pl-10' : ''
          } ${rightIcon ? 'pr-10' : ''} ${className}`}
          disabled={disabled}
          aria-label={ariaLabel}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
