import { ReactNode, ReactElement } from 'react';

export type TooltipVariant = 
  | 'arriba-izquierda' | 'arriba-centro' | 'arriba-derecha'
  | 'abajo-izquierda' | 'abajo-centro' | 'abajo-derecha'
  | 'izquierda-arriba' | 'izquierda-centro' | 'izquierda-abajo'
  | 'derecha-arriba' | 'derecha-centro' | 'derecha-abajo';

export interface TooltipProps {
  /**
   * Contenido que se mostrará en el tooltip
   */
  content: ReactNode;
  /**
   * Si es true, el tooltip estará siempre visible
   * @default false
   */
  active?: boolean;
  /**
   * Posición del tooltip respecto al elemento hijo
   * @default 'arriba-centro'
   */
  variant?: TooltipVariant;
  /**
   * Tamaño del tooltip
   * @default 'M'
   */
  size?: 'M';
  /**
   * Estilo de animación
   * @default 'fade'
   */
  animation?: 'fade' | 'scale' | 'none';
  /**
   * Tiempo de retraso para mostrar/ocultar el tooltip (ms)
   * @default 200
   */
  delay?: number;
  /**
   * Clases CSS adicionales
   */
  className?: string;
  /**
   * Elemento que activa el tooltip al hacer hover
   */
  children: ReactElement;
}
