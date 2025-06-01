import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '../Card';

const mockCardProps = {
  id: 1,
  title: 'Test Product',
  description: 'Test Description',
  imageUrl: 'test-image.jpg',
  price: 99.99,
  category: 'Test Category',
};

describe('Card', () => {
  it('renderiza con props requeridos', () => {
    render(<Card {...mockCardProps} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test-image.jpg');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test Product');
  });

  it('renderiza con texto de botón por defecto', () => {
    render(<Card {...mockCardProps} />);
    expect(screen.getByRole('button', { name: /ver detalles/i })).toBeInTheDocument();
  });

  it('renderiza con texto de botón personalizado', () => {
    render(<Card {...mockCardProps} buttonText="Comprar" />);
    expect(screen.getByRole('button', { name: /comprar/i })).toBeInTheDocument();
  });

  it('renderiza con props de botón personalizados', () => {
    render(<Card {...mockCardProps} buttonProps={{ variant: 'secondary', size: 'sm' }} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gray-200'); // variante secundaria
    expect(button).toHaveClass('text-sm'); // tamaño pequeño
  });

  it('maneja eventos de clic', () => {
    const handleClick = jest.fn();
    render(<Card {...mockCardProps} onClick={handleClick} />);
    fireEvent.click(screen.getByRole('article'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('maneja eventos de mouse', () => {
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();
    render(
      <Card {...mockCardProps} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
    );
    const card = screen.getByRole('article');
    fireEvent.mouseEnter(card);
    expect(handleMouseEnter).toHaveBeenCalledTimes(1);
    fireEvent.mouseLeave(card);
    expect(handleMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('aplica className personalizado', () => {
    render(<Card {...mockCardProps} className="custom-class" />);
    expect(screen.getByRole('article').parentElement).toHaveClass('custom-class');
  });

  it('renderiza con aria-label', () => {
    render(<Card {...mockCardProps} ariaLabel="Product card" />);
    expect(screen.getByRole('article')).toHaveAttribute('aria-label', 'Product card');
  });

  it('formatea el precio correctamente', () => {
    const { rerender } = render(<Card {...mockCardProps} price={99.99} />);
    expect(screen.getByText('$99.99')).toBeInTheDocument();

    rerender(<Card {...mockCardProps} price={100} />);
    expect(screen.getByText('$100.00')).toBeInTheDocument();

    rerender(<Card {...mockCardProps} price={0} />);
    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });
});
