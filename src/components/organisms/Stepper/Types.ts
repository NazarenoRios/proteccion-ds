import { Step, StepperVariant } from '../../../types/common';

export interface StepperProps {
  /**
   * Lista de pasos del stepper
   */
  steps: Step[];
  /**
   * Variante del stepper (horizontal o vertical)
   * @default 'number'
   */
  variant?: StepperVariant;
  /**
   * Clase CSS adicional
   */
  className?: string;
  /**
   * Función que se ejecuta al hacer clic en un paso
   */
  onStepClick?: (step: Step) => void;
}
