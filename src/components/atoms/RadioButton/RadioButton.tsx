import React, { useState } from 'react';
import type { RadioButtonProps } from '../../../types/common';
import { Icon } from '../Icon/Icon';

export const RadioButton: React.FC<RadioButtonProps> = ({
  checked = false,
  variant = 'general',
  onChange,
  label,
  disabled,
  ariaLabel,
  id,
  type = 'radio',
  ...props
}) => {
  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

    const baseStyles = 'inline-flex items-center justify-center w-5 h-5 border transition-all duration-200';
  
    const variantStyles = {
      general: {
        base: `${baseStyles} bg-white border-primary-azul-proteccion-500`,
        hover: `${baseStyles} bg-primary-azul-proteccion-500 border-primary-azul-proteccion-500`,
        focus: `${baseStyles} bg-white border-primary-azul-proteccion-500 ring-2 ring-basic-neutral-200`,
        checked: `${baseStyles} bg-primary-azul-proteccion-500 border-primary-azul-proteccion-500`,
        checkedHover: `${baseStyles} bg-primary-azul-proteccion-500 border-primary-azul-proteccion-500 ring-2 ring-basic-neutral-200`,
        checkedFocus: `${baseStyles} bg-primary-azul-proteccion-500 border-primary-azul-proteccion-500 ring-2 ring-basic-neutral-200`,
        disabled: `${baseStyles} opacity-50 cursor-not-allowed bg-white border-basic-neutral-300`
      },
      inversion: {
        base: `${baseStyles} bg-white border-primary-neutral-500`,
        hover: `${baseStyles} bg-basic-neutral-900 border-basic-neutral-900`,
        focus: `${baseStyles} bg-white border-basic-neutral-900 ring-2 ring-basic-neutral-200`,
        checked: `${baseStyles} bg-primary-amarillo-proteccion-500 border-primary-amarillo-proteccion-500`,
        checkedHover: `${baseStyles} bg-primary-amarillo-proteccion-500 border-primary-amarillo-proteccion-500 ring-2 ring-basic-neutral-200`,
        checkedFocus: `${baseStyles} bg-primary-amarillo-proteccion-500 border-primary-amarillo-proteccion-500 ring-2 ring-basic-neutral-200`,
        disabled: `${baseStyles} opacity-50 cursor-not-allowed bg-basic-neutral-100 border-basic-neutral-300`
      }
    };
    
    const getRadioStyles = () => {
      if (disabled) {
        return variantStyles[variant].disabled;
      }
      
      if (checked) {
        if (isFocused) {
          return variantStyles[variant].checkedFocus;
        }
        if (isHovered) {
          return variantStyles[variant].checkedHover;
        }
        return variantStyles[variant].checked;
      }
    
      if (isFocused) {
        return variantStyles[variant].focus;
      }
      if (isHovered) {
        return variantStyles[variant].hover;
      }
    
      return variantStyles[variant].base;
    };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (onChange) {
        const syntheticEvent = {
          target: { checked: !checked },
          currentTarget: { checked: !checked },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    }
  };
  const renderIcon = (icon: string | React.ReactNode) => {
    const iconColor = variant === 'inversion' && checked ? 'text-primary-neutral-500' : 'text-white';
    const iconSize = isHovered ? 12 : 16; // 12 en hover, 16 por defecto
    
    if (typeof icon === 'string') {
      return (
        <Icon
          key={`${icon}-custom`} 
          name="check"
          color={iconColor}
          set="custom"
          size={iconSize}
        />
      );
    }
    return icon;
  };

  return (
    <div className="flex items-center">
      <div className="relative flex-shrink-0">
        <input
          id={radioId}
          type={type}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className="sr-only"
          onFocus={() => !disabled && setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-describedby={label ? `${radioId}-label` : undefined}
          {...props}
        />
        <label
          htmlFor={radioId}
          className={`${getRadioStyles()} flex items-center justify-center`}
          style={{ borderRadius: '10px' }}
          onMouseEnter={() => !disabled && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
          aria-label={ariaLabel}
        >
{checked && !disabled && renderIcon("check")}        </label>
      </div>
      {label && (
        <label
          htmlFor={radioId}
          id={`${radioId}-label`}
          className={`ml-2 text-sm font-medium ${
            disabled ? 'text-basic-neutral-400' : 'text-basic-neutral-900'
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};