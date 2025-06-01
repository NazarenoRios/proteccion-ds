import React from 'react';
import { Input } from '../../atoms/Input/Input';
import { Button } from '../../atoms/Button/Button';
import type { SearchBarProps } from '../../../types';

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  onClear,
  className = '',
  ariaLabel,
}) => {
  const [searchValue, setSearchValue] = React.useState('');

  const handleSearch = () => {
    onSearch?.(searchValue);
  };

  const handleClear = () => {
    setSearchValue('');
    onClear?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`flex gap-2 ${className}`} role="search" aria-label={ariaLabel}>
      <Input
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        leftIcon="🔍"
        rightIcon={searchValue ? '✕' : undefined}
        fullWidth
        ariaLabel={`Search input: ${placeholder}`}
      />
      <Button variant="primary" onClick={handleSearch} ariaLabel="Search button">
        Search
      </Button>
      {searchValue && (
        <Button variant="ghost" onClick={handleClear} ariaLabel="Clear search">
          Clear
        </Button>
      )}
    </div>
  );
};
