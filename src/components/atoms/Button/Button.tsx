import React from 'react';
import type { ButtonProps } from '../../../types/common';
import { Icon } from '../Icon/Icon';
import { getIconSetFromName } from '../../../utils/iconUtils';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ariaLabel,
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 min-w-[100px]';

  const variantStyles = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-400',
    secondary:
      'bg-primary-yellow-500 text-primary-500 hover:bg-primary-yellow-300 focus:ring-primary-yellow-400',
    outline:
      'border-2 border-primary-500 text-primary-500 hover:bg-primary-100 focus:ring-primary-400',
    ghost: 'text-primary-500 hover:bg-primary-100 focus:ring-primary-400',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-[var(--typography-fontSize-xxs-value)] leading-[var(--typography-lineHeight-s-value)] font-[var(--typography-fontWeight-regular-value)] min-h-[32px]',
    md: 'px-4 py-2 text-[var(--typography-fontSize-s-value)] leading-[var(--typography-lineHeight-button-value)] font-[var(--typography-fontWeight-regular-value)] min-h-[40px]',
    lg: 'px-6 py-3 text-[var(--typography-fontSize-m-value)] leading-[var(--typography-lineHeight-s-value)] font-[var(--typography-fontWeight-regular-value)] min-h-[48px]',
  };

  const widthStyles = fullWidth ? 'w-full' : '';
  const disabledStyles = disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const renderIcon = (icon: string | React.ReactNode) => {
    if (typeof icon === 'string') {
      return (
        <Icon
          name={icon}
          set={getIconSetFromName(icon)}
          size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20}
        />
      );
    }
    return icon;
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`}
      disabled={disabled || isLoading}
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-center justify-center space-x-2">
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && (
          <span className="flex items-center">{renderIcon(leftIcon)}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="flex items-center">{renderIcon(rightIcon)}</span>
        )}
      </div>
    </button>
  );
};
