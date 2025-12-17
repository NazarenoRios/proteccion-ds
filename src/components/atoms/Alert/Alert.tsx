import React from 'react';
import { Icon } from '../Icon/Icon';

export type TipoAlerta = 'información' | 'advertencia' | 'éxito' | 'peligro';

export interface AlertaProps {
  /**
   * Contenido/mensaje de la alerta (máximo 350 caracteres)
   */
  children: React.ReactNode;
  /**
   * Tipo de alerta que determina el color e icono
   */
  tipo?: TipoAlerta;
  /**
   * Título opcional de la alerta
   */
  titulo?: string;
  /**
   * Indica si la alerta se puede cerrar
   */
  dismissible?: boolean;
  /**
   * Función que se ejecuta cuando se cierra la alerta
   */
  onDismiss?: () => void;
  /**
   * Clases CSS adicionales
   */
  className?: string;
  /**
   * Icono personalizado (anula el icono por defecto)
   */
  iconoPersonalizado?: string | React.ReactNode;
}

export const Alerta: React.FC<AlertaProps> = ({
  children,
  tipo = 'información',
  titulo,
  dismissible = false,
  onDismiss,
  className = '',
  iconoPersonalizado,
}) => {
  const configuracionTipos = {
    información: {
      backgroundColor: '#ebf6fd',
      borderColor: '#b6c5df',
      textColor: '#224b77',
      icon: 'info',
      iconColor: '#2d6b9c',
      closeButtonColor: '#2d6b9c',
    },
    advertencia: {
      backgroundColor: '#ffe9c2',
      borderColor: '#b6c5df',
      textColor: '#655718',
      icon: 'alert-triangle',
      iconColor: '#655718',
      closeButtonColor: '#655718',
    },
    éxito: {
      backgroundColor: '#f3fbe8',
      borderColor: '#b6c5df',
      textColor: '#3e5f15',
      icon: 'check-circle',
      iconColor: '#568312',
      closeButtonColor: '#568312',
    },
    peligro: {
      backgroundColor: '#ffeeee',
      borderColor: '#b6c5df',
      textColor: '#cb382b',
      icon: 'x-circle',
      iconColor: '#cb382b',
      closeButtonColor: '#cb382b',
    },
  };

  const config = configuracionTipos[tipo];

  const renderIcon = () => {
    if (iconoPersonalizado) {
      if (typeof iconoPersonalizado === 'string') {
        return (
          <Icon
            name={iconoPersonalizado}
            size={20}
            style={{ color: config.iconColor }}
          />
        );
      }
      return iconoPersonalizado;
    }

    return (
      <Icon
        name={config.icon}
        size={20}
        style={{ color: config.iconColor }}
      />
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onDismiss?.();
    }
  };

  return (
    <div
      className={`rounded border transition-all duration-200 max-w-2xl ${className}`}
      style={{
        backgroundColor: config.backgroundColor,
        borderColor: config.borderColor,
        borderRadius: '4px',
        padding: '4px',
      }}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start" style={{ gap: '4px' }}>
        {/* Icono */}
        <div className="flex-shrink-0 mt-0.5">
          {renderIcon()}
        </div>

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          {titulo && (
            <h3 className="mb-1" style={{ color: config.textColor, fontSize: '13px', lineHeight: '19px', fontWeight: 450 }}>
              {titulo}
            </h3>
          )}
          <div style={{ color: config.textColor, fontSize: '13px', lineHeight: '19px', fontWeight: 450 }}>
            {children}
          </div>
        </div>

        {/* Botón de cerrar */}
        {dismissible && (
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={onDismiss}
              onKeyDown={handleKeyDown}
              className="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent transition-colors duration-200 hover:opacity-80"
              style={{ color: config.closeButtonColor }}
              aria-label="Cerrar alerta"
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
  );
};

// Mantener compatibilidad con nombres anteriores
export const Alert = Alerta;
export type AlertProps = AlertaProps;
export type AlertType = TipoAlerta; 