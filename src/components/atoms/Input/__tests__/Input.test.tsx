import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../Input';

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('border-gray-300'); // default variant
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Input variant="outline" placeholder="Outline" />);
    expect(screen.getByPlaceholderText('Outline')).toHaveClass('border-2');

    rerender(<Input variant="filled" placeholder="Filled" />);
    expect(screen.getByPlaceholderText('Filled')).toHaveClass('bg-gray-100');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Input size="sm" placeholder="Small" />);
    expect(screen.getByPlaceholderText('Small')).toHaveClass('text-sm');

    rerender(<Input size="lg" placeholder="Large" />);
    expect(screen.getByPlaceholderText('Large')).toHaveClass('text-lg');
  });

  it('renders with label', () => {
    render(<Input label="Username" placeholder="Enter username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Input error="This field is required" placeholder="Error input" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Error input')).toHaveClass('border-red-500');
  });

  it('renders with left and right icons', () => {
    const leftIcon = <span data-testid="left-icon">🔍</span>;
    const rightIcon = <span data-testid="right-icon">✓</span>;
    render(<Input leftIcon={leftIcon} rightIcon={rightIcon} placeholder="With Icons" />);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('With Icons')).toHaveClass('pl-10 pr-10');
  });

  it('handles input changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} placeholder="Type here" />);
    fireEvent.change(screen.getByPlaceholderText('Type here'), {
      target: { value: 'test' },
    });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies fullWidth class when fullWidth prop is true', () => {
    render(<Input fullWidth placeholder="Full Width" />);
    expect(screen.getByPlaceholderText('Full Width')).toHaveClass('w-full');
    expect(screen.getByPlaceholderText('Full Width').parentElement?.parentElement).toHaveClass(
      'w-full'
    );
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" placeholder="Custom" />);
    expect(screen.getByPlaceholderText('Custom')).toHaveClass('custom-class');
  });

  it('renders with aria-label', () => {
    render(<Input ariaLabel="Custom Label" placeholder="Aria Label" />);
    expect(screen.getByPlaceholderText('Aria Label')).toHaveAttribute('aria-label', 'Custom Label');
  });

  it('handles disabled state', () => {
    render(<Input disabled placeholder="Disabled" />);
    const input = screen.getByPlaceholderText('Disabled');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('opacity-50');
    expect(input).toHaveClass('cursor-not-allowed');
  });
});
