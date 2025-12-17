export type RadioButtonVariant = 'normal' | 'inversion';

export interface RadioButtonProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /**
   * Indica si el radio está seleccionado
   */
  checked?: boolean;
  /**
   * Variante de estilo - normal o inversion (fondo oscuro)
   */
  variant?: RadioButtonVariant;
  /**
   * Función que se ejecuta cuando cambia el estado
   */
  onChange?: (checked: boolean) => void;
  /**
   * Etiqueta del radio
   */
  label?: string;
  /**
   * Indica si el radio está deshabilitado
   */
  disabled?: boolean;
  /**
   * Clases CSS adicionales
   */
  className?: string;
}
