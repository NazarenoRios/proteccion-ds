import React, { useEffect, useState } from 'react';
import { Icon } from '../../atoms/Icon/Icon';

export type TipoToast = 'información' | 'advertencia' | 'éxito' | 'peligro';

export interface ToastProps {
  /**
   * Contenido/mensaje del toast
   */
  children: React.ReactNode;
  /**
   * Tipo de toast que determina el color e icono
   */
  tipo?: TipoToast;
  /**
   * Título opcional del toast
   */
  titulo?: string;
  /**
   * Indica si el toast se puede cerrar manualmente
   */
  dismissible?: boolean;
  /**
   * Tiempo en milisegundos antes de que se cierre automáticamente (0 = no auto cerrar)
   */
  autoCloseDelay?: number;
  /**
   * Función que se ejecuta cuando se cierra el toast
   */
  onClose?: () => void;
  /**
   * Posición del toast en la pantalla
   */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  /**
   * Indica si el toast está visible
   */
  visible?: boolean;
  /**
   * Clases CSS adicionales
   */
  className?: string;
  /**
   * Icono personalizado (anula el icono por defecto)
   */
  iconoPersonalizado?: string | React.ReactNode;
}

export const Toast: React.FC<ToastProps> = ({
  children,
  tipo = 'información',
  titulo,
  dismissible = true,
  autoCloseDelay = 5000,
  onClose,
  position = 'top-right',
  visible = true,
  className = '',
  iconoPersonalizado,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (visible && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [visible, autoCloseDelay]);

  useEffect(() => {
    setIsVisible(visible);
    if (visible) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const configuracionTipos = {
    información: {
      bg: 'bg-white',
      text: '#224b77',
      titleText: '#224b77',
      icon: 'info',
      iconColor: '#2d6b9c',
      iconBackground: '#ebf6fd',
      topBorder: '#41b6e6',
      progressBar: '#41b6e6',
      closeButtonColor: '#3f66b3',
    },
    advertencia: {
      bg: 'bg-white',
      text: '#655718',
      titleText: '#655718',
      icon: 'alert-triangle',
      iconColor: '#957d27',
      iconBackground: '#fff9ef',
      topBorder: '#f1be48',
      progressBar: '#f1be48',
      closeButtonColor: '#3f66b3',
    },
    éxito: {
      bg: 'bg-white',
      text: '#3e5f15',
      titleText: '#3e5f15',
      icon: 'check-circle',
      iconColor: '#568312',
      iconBackground: '#f3fbe8',
      topBorder: '#97d700',
      progressBar: '#97d700',
      closeButtonColor: '#3f66b3',
    },
    peligro: {
      bg: 'bg-white',
      text: '#cb382b',
      titleText: '#cb382b',
      icon: 'x-circle',
      iconColor: '#992d1e',
      iconBackground: '#ffeeee',
      topBorder: '#f9423a',
      progressBar: '#f9423a',
      closeButtonColor: '#3f66b3',
    },
  };

  const config = configuracionTipos[tipo];

  const positionStyles = {
    'top-left': 'fixed top-4 left-4 z-50',
    'top-right': 'fixed top-4 right-4 z-50',
    'bottom-left': 'fixed bottom-4 left-4 z-50',
    'bottom-right': 'fixed bottom-4 right-4 z-50',
    'top-center': 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50',
    'bottom-center': 'fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50',
  };

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClose();
    }
  };

  const renderIcon = () => {
    const iconElement = iconoPersonalizado ? (
      typeof iconoPersonalizado === 'string' ? (
        <Icon name={iconoPersonalizado} size={20} style={{ color: config.iconColor }} />
      ) : (
        iconoPersonalizado
      )
    ) : (
      <Icon name={config.icon} size={20} style={{ color: config.iconColor }} />
    );

    // Wrap icon in circular background (como en Figma)
    return (
      <div
        className="flex items-center justify-center rounded-full w-12 h-12"
        style={{ backgroundColor: config.iconBackground }}
      >
        {iconElement}
      </div>
    );
  };

  if (!isVisible) {
    return null;
  }

  const animationClasses = isAnimating 
    ? 'transform transition-all duration-300 ease-out scale-95 opacity-0' 
    : 'transform transition-all duration-300 ease-out scale-100 opacity-100';

  return (
    <div className={`${positionStyles[position]} max-w-sm w-full ${className}`}>
      <div
        className={`rounded-[5px] shadow-lg transition-all duration-200 ${config.bg} ${animationClasses} relative overflow-hidden`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        {/* Línea de color superior */}
        <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: config.topBorder }} />
        
        {/* Barra de progreso para auto-close */}
        {autoCloseDelay > 0 && visible && (
          <div className="absolute top-1 left-0 h-0.5 bg-gray-200 w-full overflow-hidden">
            <div
              className={`h-full ${config.progressBar} transition-all ease-linear`}
              style={{
                animation: `toast-progress ${autoCloseDelay}ms linear forwards`,
              }}
            />
          </div>
        )}
        
        {/* Contenido principal con padding */}
        <div className="p-4 pt-5">
          <div className="flex items-center space-x-3">
            {/* Icono */}
            <div className="flex-shrink-0">
              {renderIcon()}
            </div>

            {/* Contenido */}
            <div className="flex-1 min-w-0">
              {titulo && (
                <h4 className="text-sm font-semibold mb-1" style={{ color: config.titleText }}>
                  {titulo}
                </h4>
              )}
              <div className="text-sm" style={{ color: config.text }}>
                {children}
              </div>
            </div>

            {/* Botón de cerrar */}
            {dismissible && (
              <div className="flex-shrink-0">
                <button
                  type="button"
                  onClick={handleClose}
                  onKeyDown={handleKeyDown}
                  className="inline-flex items-center justify-center rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 hover:bg-gray-100"
                  style={{ color: config.closeButtonColor }}
                  aria-label="Cerrar notificación"
                >
                  <Icon
                    name="x"
                    size={16}
                    style={{ color: config.closeButtonColor }}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes toast-progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
};

// Hook personalizado para manejar múltiples toasts
export const useToast = () => {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: string }>>([]);

  const addToast = (toastProps: Omit<ToastProps, 'onClose' | 'visible'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = {
      ...toastProps,
      id,
      visible: true,
      onClose: () => removeToast(id),
    };
    
    setToasts(prev => [...prev, newToast]);
    return id;
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const removeAllToasts = () => {
    setToasts([]);
  };

  return {
    toasts,
    addToast,
    removeToast,
    removeAllToasts,
  };
};

// Componente contenedor para múltiples toasts
export const ToastContainer: React.FC<{
  toasts: Array<ToastProps & { id: string }>;
  position?: ToastProps['position'];
}> = ({ toasts, position = 'top-right' }) => {
  const positionStyles = {
    'top-left': 'fixed top-4 left-4 z-50 space-y-2',
    'top-right': 'fixed top-4 right-4 z-50 space-y-2',
    'bottom-left': 'fixed bottom-4 left-4 z-50 space-y-2',
    'bottom-right': 'fixed bottom-4 right-4 z-50 space-y-2',
    'top-center': 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2',
    'bottom-center': 'fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2',
  };

  return (
    <div className={positionStyles[position]}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} position={undefined} />
      ))}
    </div>
  );
}; 