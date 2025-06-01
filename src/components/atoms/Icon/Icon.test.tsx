import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
  it('debería renderizar con las props por defecto', () => {
    render(<Icon name="FaHome" />);
    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('text-current'); // color por defecto
  });

  it('debería renderizar con diferentes conjuntos de iconos', () => {
    const { rerender } = render(<Icon name="HiHome" set="hi" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();

    rerender(<Icon name="MdHome" set="md" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();

    rerender(<Icon name="FaHome" set="fa" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('debería renderizar con diferentes tamaños', () => {
    const { rerender } = render(<Icon name="FaHome" size={16} />);
    expect(screen.getByTestId('icon')).toHaveStyle({ width: '16px', height: '16px' });

    rerender(<Icon name="FaHome" size={24} />);
    expect(screen.getByTestId('icon')).toHaveStyle({ width: '24px', height: '24px' });

    rerender(<Icon name="FaHome" size={32} />);
    expect(screen.getByTestId('icon')).toHaveStyle({ width: '32px', height: '32px' });
  });

  it('debería renderizar con color personalizado', () => {
    render(<Icon name="FaHome" color="red" />);
    expect(screen.getByTestId('icon')).toHaveClass('text-red-500');
  });

  it('debería aplicar className personalizado', () => {
    render(<Icon name="FaHome" className="clase-personalizada" />);
    expect(screen.getByTestId('icon')).toHaveClass('clase-personalizada');
  });

  it('debería manejar nombres de iconos inválidos de forma elegante', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Icon name="IconoInvalido" />);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('debería renderizar con aria-hidden por defecto', () => {
    render(<Icon name="FaHome" />);
    expect(screen.getByTestId('icon')).toHaveAttribute('aria-hidden', 'true');
  });

  it('debería renderizar con aria-label cuando se proporciona', () => {
    render(<Icon name="FaHome" ariaLabel="Icono de inicio" />);
    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('aria-label', 'Icono de inicio');
    expect(icon).not.toHaveAttribute('aria-hidden');
  });
});
