import React, { useEffect, useCallback } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import type { ButtonVariant } from '../../../types/common';

export interface ModalAction {
  /**
   * Texto del botón de acción
   */
  label: string;
  /**
   * Variante visual del botón
   * @default 'secondaryGeneral'
   */
  variant?: ButtonVariant;
  /**
   * Función que se ejecuta al hacer clic en el botón
   */
  onClick: () => void;
  /**
   * Indica si la acción está deshabilitada
   * @default false
   */
  disabled?: boolean;
  /**
   * Indica si la acción está en estado de carga
   * @default false
   */
  isLoading?: boolean;
  /**
   * Icono del botón (opcional)
   */
  icon?: string;
}

export type ModalVariant = 'general' | 'inversion';

export interface ModalProps {
  /**
   * Controla si el modal está abierto
   */
  isOpen: boolean;
  /**
   * Función que se ejecuta al cerrar el modal
   */
  onClose: () => void;
  /**
   * Título principal del modal (ej: "Protección")
   * @default "Protección"
   */
  mainTitle?: string;
  /**
   * Subtítulo del modal (ej: "Título de notificación")
   */
  subtitle?: string;
  /**
   * Contenido del modal
   */
  children: React.ReactNode;
  /**
   * Acciones del modal (botones)
   */
  actions?: ModalAction[];
  /**
   * Variante del modal
   * @default 'general'
   */
  variant?: ModalVariant;
  /**
   * Indica si se puede cerrar haciendo clic fuera del modal
   * @default true
   */
  closeOnBackdropClick?: boolean;
  /**
   * Indica si se puede cerrar con la tecla Escape
   * @default true
   */
  closeOnEscape?: boolean;
  /**
   * Indica si se muestra el botón de cerrar (X)
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Tamaño del modal
   * @default 'M'
   */
  size?: 'S' | 'M' | 'L';
  /**
   * Clases CSS adicionales para el contenedor del modal
   */
  className?: string;
  /**
   * ID para accesibilidad
   */
  ariaLabelledBy?: string;
  /**
   * Descripción para accesibilidad
   */
  ariaDescribedBy?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  mainTitle = "Protección",
  subtitle,
  children,
  actions = [],
  variant = 'general',
  closeOnBackdropClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  size = 'M',
  className = '',
  ariaLabelledBy,
  ariaDescribedBy,
}) => {
  const modalId = React.useId();
  const titleId = ariaLabelledBy || `${modalId}-title`;
  const descriptionId = ariaDescribedBy || `${modalId}-description`;

  // Manejar cierre con tecla Escape
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    },
    [onClose, closeOnEscape]
  );

  // Manejar clic en el backdrop
  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget && closeOnBackdropClick) {
        onClose();
      }
    },
    [onClose, closeOnBackdropClick]
  );

  // Efectos para manejar eventos globales
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, handleEscape]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Enfocar el modal cuando se abre
      const modalElement = document.getElementById(modalId);
      if (modalElement) {
        modalElement.focus();
      }
    }
  }, [isOpen, modalId]);

  if (!isOpen) return null;

  const sizeStyles = {
    S: 'max-w-md',
    M: 'max-w-lg',
    L: 'max-w-2xl',
  };

  const variantStyles = {
    general: {
      topBar: 'bg-primary-amarillo-proteccion-500',
      background: 'bg-white',
      titleColor: 'text-primary-azul-proteccion-500',
    },
    inversion: {
      topBar: 'bg-primary-azul-proteccion-500', 
      background: 'bg-primary-azul-proteccion-500',
      titleColor: 'text-white',
    }
  };

  const currentVariant = variantStyles[variant];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div
        id={modalId}
        className={`
          relative ${currentVariant.background} rounded-lg shadow-xl w-full ${sizeStyles[size]}
          transform transition-all duration-300 ease-out overflow-hidden
          ${className}
        `}
        tabIndex={-1}
      >
        {/* Barra superior amarilla/azul */}
        <div className={`h-1 w-full ${currentVariant.topBar}`} />

        {/* Header con título principal */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div className="flex items-center justify-center w-full">
            <h1
              id={titleId}
              className={`text-xl font-semibold ${currentVariant.titleColor} font-families-sura-sans-0 text-center`}
            >
              {mainTitle}
            </h1>
          </div>

          {/* Close button */}
          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-basic-neutral-400 hover:text-basic-neutral-600 hover:bg-basic-neutral-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-azul-proteccion-500 focus:ring-offset-2"
              aria-label="Cerrar modal"
            >
              <Icon name="x" size={20} color="currentColor" />
            </button>
          )}
        </div>

        {/* Ícono circular centrado */}
        <div className="flex justify-center pb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white">
            <Icon
              name="info"
              size={32}
              color="text-basic-neutral-600"
              ariaLabel="Información"
            />
          </div>
        </div>

        {/* Subtítulo centrado */}
        {subtitle && (
          <div className="text-center px-6 pb-4">
            <h2 className={`text-lg font-medium ${currentVariant.titleColor} font-families-sura-sans-0`}>
              {subtitle}
            </h2>
          </div>
        )}

        {/* Content */}
        <div
          id={descriptionId}
          className={`px-6 pb-6 text-center ${variant === 'inversion' ? 'text-white' : 'text-basic-neutral-700'} font-families-sura-sans-0`}
        >
          {children}
        </div>

        {/* Actions */}
        {actions.length > 0 && (
          <div className="flex justify-center space-x-3 px-6 pb-6">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'secondaryGeneral'}
                onClick={action.onClick}
                disabled={action.disabled}
                isLoading={action.isLoading}
                leftIcon={action.icon}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};