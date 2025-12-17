import React, { useState, useRef, useEffect } from 'react';
import { TooltipProps, TooltipVariant } from './types';

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  active = false,
  variant = 'arriba-centro',
  size = 'M',
  animation = 'fade',
  delay = 200,
  className = '',
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const baseStyles = 'bg-primary-azul-proteccion-500 text-basic-blanco font-families-sura-sans-0';
  
  const variantClasses = {
    'arriba-izquierda': 'bottom-full left-0 mb-2',
    'arriba-centro': 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    'arriba-derecha': 'bottom-full right-0 mb-2',
    'abajo-izquierda': 'top-full left-0 mt-2',
    'abajo-centro': 'top-full left-1/2 -translate-x-1/2 mt-2',
    'abajo-derecha': 'top-full right-0 mt-2',
    'izquierda-arriba': 'right-full top-0 mr-2',
    'izquierda-centro': 'right-full top-1/2 -translate-y-1/2 mr-2',
    'izquierda-abajo': 'right-full bottom-0 mr-2',
    'derecha-arriba': 'left-full top-0 ml-2',
    'derecha-centro': 'left-full top-1/2 -translate-y-1/2 ml-2',
    'derecha-abajo': 'left-full bottom-0 ml-2',
  };

  const getArrowStyles = (pos: TooltipVariant) => {
    const base = 'absolute w-2 h-2 bg-primary-azul-proteccion-500';
    const styles = {
      'arriba-izquierda': `${base} -bottom-1 left-3 rotate-45`,
      'arriba-centro': `${base} -bottom-1 left-1/2 -translate-x-1/2 rotate-45`,
      'arriba-derecha': `${base} -bottom-1 right-3 rotate-45`,
      'abajo-izquierda': `${base} -top-1 left-3 -rotate-45`,
      'abajo-centro': `${base} -top-1 left-1/2 -translate-x-1/2 -rotate-45`,
      'abajo-derecha': `${base} -top-1 right-3 -rotate-45`,
      'izquierda-arriba': `${base} -right-1 top-3 -rotate-45`,
      'izquierda-centro': `${base} -right-1 top-1/2 -translate-y-1/2 -rotate-45`,
      'izquierda-abajo': `${base} -right-1 bottom-3 -rotate-45`,
      'derecha-arriba': `${base} -left-1 top-3 rotate-45`,
      'derecha-centro': `${base} -left-1 top-1/2 -translate-y-1/2 rotate-45`,
      'derecha-abajo': `${base} -left-1 bottom-3 rotate-45`,
    };
    return styles[pos];
  };

  const showTooltip = () => {
    if (active) return;
    setIsHovered(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (active) return;
    setIsHovered(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, delay);
  };

  // Efecto para manejar el estado activo
  useEffect(() => {
    if (active) {
      setIsVisible(true);
      setIsHovered(true);
    }
  }, [active]);

  // Cleanup del timeout al desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle window resize and scroll events
  useEffect(() => {
    if (isVisible) {
      // Force a reflow to ensure the tooltip is positioned correctly
      window.requestAnimationFrame(() => {
        if (tooltipRef.current) {
          // This will trigger a reflow which helps with positioning
          tooltipRef.current.style.opacity = '1';
        }
      });
    }
  }, [isVisible]);

  // Animaciones
  const animationClasses = {
    fade: isVisible ? 'opacity-100' : 'opacity-0',
    scale: isVisible ? 'scale-100' : 'scale-95',
    none: '',
  };
  
  // Clase de animación seleccionada
  const animationClass = animationClasses[animation];

  return (
    <div className="relative inline-block">
      {/* Elemento que activa el tooltip */}
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className="inline-block p-0"
        aria-describedby="tooltip"
      >
        {children}
      </div>

      {/* Tooltip */}
      {(isVisible || isHovered) && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 ${baseStyles} ${variantClasses[variant]} ${animationClass} ${className}`}
          style={{
            opacity: isVisible ? 1 : 0,
            pointerEvents: 'none',
            transition: 'opacity 200ms ease-in-out',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '13px',
            lineHeight: '19px',
            fontWeight: 400
          }}
          role="tooltip"
        >
          {content}
          {/* Flecha del tooltip */}
          <div className={getArrowStyles(variant)} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
