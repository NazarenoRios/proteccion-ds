// Endpoints de la API
export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  CATEGORIES: '/api/categories',
  SEARCH: '/api/search',
} as const;

// Paginación
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1,
} as const;

// Validación
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_TITLE_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  PRICE_MIN: 0,
  PRICE_MAX: 999999.99,
} as const;

// Categorías
export const CATEGORIES = {
  ALL: 'all',
  FEATURED: 'featured',
  NEW: 'new',
  SALE: 'sale',
} as const;

// Variantes de botón
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  OUTLINE: 'outline',
  GHOST: 'ghost',
} as const;

// Variantes de input
export const INPUT_VARIANTS = {
  DEFAULT: 'default',
  OUTLINE: 'outline',
  FILLED: 'filled',
} as const;

// Tamaños de componentes
export const SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

// Configuraciones de grid
export const GRID = {
  COLUMNS: {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
  },
  GAPS: {
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
  },
} as const;
