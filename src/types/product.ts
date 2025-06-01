// Tipos relacionados con productos
export interface Product {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
}

export interface ProductGridProps {
  products: Product[];
  title?: string;
  description?: string;
  onLoadMore?: () => void;
  isLoading?: boolean;
  className?: string;
}

export interface ProductsPageProps {
  initialProducts: Product[];
  categories: string[];
  className?: string;
  onClick?: (index: number) => void;
  onMouseEnter?: (index: number) => void;
  onMouseLeave?: (index: number) => void;
  ariaLabel?: string;
}
