import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renderiza con props por defecto', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search button' })).toBeInTheDocument();
  });

  it('renderiza con placeholder personalizado', () => {
    render(<SearchBar placeholder="Custom search..." />);
    expect(screen.getByPlaceholderText('Custom search...')).toBeInTheDocument();
  });

  it('maneja cambios en el input de búsqueda', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test search' } });
    expect(input).toHaveValue('test search');
  });

  it('llama a onSearch cuando se hace clic en el botón de búsqueda', () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search button' }));
    expect(handleSearch).toHaveBeenCalledWith('test search');
  });

  it('llama a onSearch cuando se presiona la tecla Enter', () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(handleSearch).toHaveBeenCalledWith('test search');
  });

  it('muestra el botón de limpiar cuando el input tiene valor', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test search' } });
    expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument();
  });

  it('limpia el input y llama a onClear cuando se hace clic en el botón de limpiar', () => {
    const handleClear = jest.fn();
    render(<SearchBar onClear={handleClear} />);
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(input).toHaveValue('');
    expect(handleClear).toHaveBeenCalled();
  });

  it('aplica className personalizado', () => {
    render(<SearchBar className="custom-class" />);
    expect(screen.getByRole('search')).toHaveClass('custom-class');
  });

  it('renderiza con aria-label', () => {
    render(<SearchBar ariaLabel="Custom search bar" />);
    expect(screen.getByRole('search')).toHaveAttribute('aria-label', 'Custom search bar');
  });

  it('renderiza con aria-label en el input de búsqueda', () => {
    render(<SearchBar placeholder="Search products" />);
    expect(screen.getByPlaceholderText('Search products')).toHaveAttribute(
      'aria-label',
      'Search input: Search products'
    );
  });
});
