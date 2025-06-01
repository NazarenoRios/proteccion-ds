import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('debería renderizar con las props por defecto', () => {
    render(<Button>Haz clic</Button>);
    const button = screen.getByRole('button', { name: /haz clic/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-blue-600'); // variante primaria
  });

  it('debería renderizar con diferentes variantes', () => {
    const { rerender } = render(<Button variant="secondary">Secundario</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-gray-200');

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-2');

    rerender(<Button variant="ghost">Fantasma</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-blue-600');
  });

  it('debería renderizar con diferentes tamaños', () => {
    const { rerender } = render(<Button size="sm">Pequeño</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-sm');

    rerender(<Button size="lg">Grande</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-lg');
  });

  it('debería manejar eventos de clic', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Haz clic</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('debería mostrar el estado de carga', () => {
    render(<Button isLoading>Cargando</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveClass('opacity-50');
    expect(screen.getByRole('button')).toHaveClass('cursor-not-allowed');
  });

  it('debería renderizar con iconos izquierdo y derecho', () => {
    render(
      <Button leftIcon="HiHome" rightIcon="HiChevronRight">
        Con Iconos
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Con Iconos');
    expect(button.querySelectorAll('svg')).toHaveLength(2);
  });

  it('debería aplicar la clase de ancho completo cuando fullWidth es true', () => {
    render(<Button fullWidth>Ancho Completo</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  it('debería aplicar className personalizado', () => {
    render(<Button className="clase-personalizada">Personalizado</Button>);
    expect(screen.getByRole('button')).toHaveClass('clase-personalizada');
  });

  it('debería renderizar con aria-label', () => {
    render(<Button ariaLabel="Botón personalizado">Etiqueta Aria</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Botón personalizado');
  });

  it('debería manejar el estado deshabilitado', () => {
    render(<Button disabled>Deshabilitado</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50');
    expect(button).toHaveClass('cursor-not-allowed');
  });
});
