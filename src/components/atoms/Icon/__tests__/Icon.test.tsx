import React from 'react';
import { render, screen } from '@testing-library/react';
import { Icon } from '../Icon';

describe('Icon', () => {
  it('renders with default props', () => {
    render(<Icon name="FaHome" />);
    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('text-current'); // default color
  });

  it('renders with different icon sets', () => {
    const { rerender } = render(<Icon name="HiHome" set="hi" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();

    rerender(<Icon name="MdHome" set="md" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();

    rerender(<Icon name="FaHome" set="fa" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Icon name="FaHome" size={16} />);
    expect(screen.getByTestId('icon')).toHaveStyle({ width: '16px', height: '16px' });

    rerender(<Icon name="FaHome" size={24} />);
    expect(screen.getByTestId('icon')).toHaveStyle({ width: '24px', height: '24px' });

    rerender(<Icon name="FaHome" size={32} />);
    expect(screen.getByTestId('icon')).toHaveStyle({ width: '32px', height: '32px' });
  });

  it('renders with custom color', () => {
    render(<Icon name="FaHome" color="red" />);
    expect(screen.getByTestId('icon')).toHaveClass('text-red-500');
  });

  it('applies custom className', () => {
    render(<Icon name="FaHome" className="custom-class" />);
    expect(screen.getByTestId('icon')).toHaveClass('custom-class');
  });

  it('handles invalid icon names gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Icon name="InvalidIcon" />);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('renders with aria-hidden by default', () => {
    render(<Icon name="FaHome" />);
    expect(screen.getByTestId('icon')).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders with aria-label when provided', () => {
    render(<Icon name="FaHome" ariaLabel="Home icon" />);
    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('aria-label', 'Home icon');
    expect(icon).not.toHaveAttribute('aria-hidden');
  });
});
