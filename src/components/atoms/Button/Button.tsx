import React from 'react';
import type { ButtonProps } from '../../../types/common';
import { Icon } from '../Icon/Icon';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primaryGeneral',
  size = 'M',
  isLoading = false,
  leftIcon = "plus",
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
    '!text: !font-families-sura-sans-0 !inline-flex !items-center !justify-center !rounded-md !font-medium !transition-colors focus:!outline-nonen disabled:!bg-basic-neutral-200 disabled:!text-basic-neutral-700 disabled:!outline-nonen disabled:!border-basic-neutral-200';

  const variantStyles = {
    primaryGeneral: '!bg-primary-amarillo-proteccion-500 !text-primary-azul-proteccion-500 hover:!bg-primary-amarillo-proteccion-400 active:!bg-primary-amarillo-proteccion-600',
    primaryInverse: '!bg-primary-amarillo-proteccion-500 !text-primary-azul-proteccion-500 hover:!bg-primary-amarillo-proteccion-400 active:!bg-primary-amarillo-proteccion-600',
    secondaryGeneral:
      '!border !border-primary-azul-proteccion-500 !text-primary-azul-proteccion-500 hover:!bg-primary-azul-proteccion-500 hover:!text-primary-azul-proteccion-100 active:!bg-primary-azul-proteccion-600 active:!text-primary-azul-proteccion-100',
    secondaryInverse:
      '!border !border-basic-neutral-900 !text-basic-neutral-900 hover:!bg-basic-neutral-800 hover:!text-basic-neutral-100 active:!bg-basic-neutral-900 active:!text-basic-neutral-100',
    tertiaryGeneral: '!text-primary-azul-proteccion-500 hover:!text-primary-azul-proteccion-500 active:!text-primary-azul-proteccion-800',
    tertiaryInverse: '!text-basic-neutral-900 hover:!text-basic-neutral-900 active:!text-basic-neutral-900',
    };

  const sizeStyles = {
    S: '!text-size-10 !px-2 !py-1',
    M: '!text-size-10 !px-4 !py-2',
    L: '!text-size-10 !px-4 !py-3',
  };

  

  const widthStyles = fullWidth ? '!w-full' : '';
  const disabledStyles = disabled || isLoading ? '!opacity-50 !cursor-not-allowed' : '!cursor-pointer';

  const renderIcon = (icon: string | React.ReactNode) => {
    if (typeof icon === 'string') {
      const iconSet = 'custom';
      
      return (
        <Icon
          key={`${icon}-${iconSet}`} 
          name={icon}
          color="border-primary-azul-proteccion-500"
          set={iconSet}
          size={size === 'S' ? 16 : size === 'M' ? 24 : 24}
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
      <div className="!flex !items-center !justify-center !space-x-2">
        {isLoading && (
          <svg
            className="!animate-spin !h-4 !w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="!opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="!opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && (
          <span className="!flex !items-center">{renderIcon(leftIcon)}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="!flex !items-center">{renderIcon(rightIcon)}</span>
        )}
      </div>
    </button>
  );
};
