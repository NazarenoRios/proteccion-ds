import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renderiza con propiedades por defecto', () => {
    render(<Input placeholder="Ingrese texto" />);
    const input = screen.getByPlaceholderText('Ingrese texto');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('border-gray-300'); // variante por defecto
  });

  it('renderiza con diferentes variantes', () => {
    const { rerender } = render(<Input variant="outline" placeholder="Contorno" />);
    expect(screen.getByPlaceholderText('Contorno')).toHaveClass('border-2');

    rerender(<Input variant="filled" placeholder="Relleno" />);
    expect(screen.getByPlaceholderText('Relleno')).toHaveClass('bg-gray-100');
  });

  it('renderiza con diferentes tamaños', () => {
    const { rerender } = render(<Input size="sm" placeholder="Pequeño" />);
    expect(screen.getByPlaceholderText('Pequeño')).toHaveClass('text-sm');

    rerender(<Input size="lg" placeholder="Grande" />);
    expect(screen.getByPlaceholderText('Grande')).toHaveClass('text-lg');
  });

  it('renderiza con etiqueta', () => {
    render(<Input label="Nombre de usuario" placeholder="Ingrese nombre de usuario" />);
    expect(screen.getByLabelText('Nombre de usuario')).toBeInTheDocument();
  });

  it('muestra mensaje de error', () => {
    render(<Input error="Este campo es requerido" placeholder="Entrada con error" />);
    expect(screen.getByText('Este campo es requerido')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Entrada con error')).toHaveClass('border-red-500');
  });

  it('renderiza con iconos izquierdo y derecho', () => {
    const leftIcon = <span data-testid="left-icon">🔍</span>;
    const rightIcon = <span data-testid="right-icon">✓</span>;
    render(<Input leftIcon={leftIcon} rightIcon={rightIcon} placeholder="Con Iconos" />);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Con Iconos')).toHaveClass('pl-10 pr-10');
  });

  it('maneja cambios en la entrada', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} placeholder="Escriba aquí" />);
    fireEvent.change(screen.getByPlaceholderText('Escriba aquí'), {
      target: { value: 'test' },
    });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('aplica la clase fullWidth cuando la propiedad fullWidth es true', () => {
    render(<Input fullWidth placeholder="Ancho completo" />);
    expect(screen.getByPlaceholderText('Ancho completo')).toHaveClass('w-full');
    expect(screen.getByPlaceholderText('Ancho completo').parentElement?.parentElement).toHaveClass(
      'w-full'
    );
  });

  it('aplica className personalizado', () => {
    render(<Input className="custom-class" placeholder="Personalizado" />);
    expect(screen.getByPlaceholderText('Personalizado')).toHaveClass('custom-class');
  });

  it('renderiza con aria-label', () => {
    render(<Input ariaLabel="Etiqueta Personalizada" placeholder="Etiqueta Aria" />);
    expect(screen.getByPlaceholderText('Etiqueta Aria')).toHaveAttribute(
      'aria-label',
      'Etiqueta Personalizada'
    );
  });

  it('maneja estado deshabilitado', () => {
    render(<Input disabled placeholder="Deshabilitado" />);
    const input = screen.getByPlaceholderText('Deshabilitado');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('opacity-50');
    expect(input).toHaveClass('cursor-not-allowed');
  });
});
