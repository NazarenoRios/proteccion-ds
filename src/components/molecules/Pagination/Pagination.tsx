import React from 'react';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';

export interface PaginationProps {
  /**
   * Página actual (1-based)
   */
  currentPage: number;
  /**
   * Total de páginas
   */
  totalPages: number;
  /**
   * Función llamada cuando cambia la página
   */
  onPageChange: (page: number) => void;
  /**
   * Variante de estilo
   * @default 'general'
   */
  variant?: 'general' | 'inversion';
  /**
   * Mostrar botones de primera y última página
   * @default true
   */
  showFirstLast?: boolean;
  /**
   * Mostrar botones de navegación rápida (doble chevron)
   * @default true
   */
  showQuickNavigation?: boolean;
  /**
   * Número máximo de páginas a mostrar en desktop
   * @default 5
   */
  maxVisiblePages?: number;
  /**
   * Mostrar selector de filas por página
   * @default true
   */
  showPageSizeSelector?: boolean;
  /**
   * Opciones de filas por página
   * @default [10, 20, 30]
   */
  pageSizeOptions?: number[];
  /**
   * Filas por página actual
   * @default 10
   */
  pageSize?: number;
  /**
   * Función llamada cuando cambia el tamaño de página
   */
  onPageSizeChange?: (pageSize: number) => void;
  /**
   * Total de elementos (para mostrar información)
   */
  totalItems?: number;
  /**
   * Texto personalizable para "Mostrar"
   * @default 'Mostrar'
   */
  showText?: string;
  /**
   * Texto personalizable para "Filas por página"
   * @default 'Filas por página'
   */
  rowsPerPageText?: string;
  /**
   * Clases CSS adicionales
   */
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  variant = 'general',
  showFirstLast = true,
  showQuickNavigation = true,
  maxVisiblePages = 5,
  showPageSizeSelector = true,
  pageSizeOptions = [10, 20, 30],
  pageSize = 10,
  onPageSizeChange,
  totalItems,
  showText = 'Mostrar',
  rowsPerPageText = 'Filas por página',
  className = '',
}) => {
  // Calcular páginas visibles
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);
    
    // Ajustar si hay pocos elementos al inicio o final
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }
    
    // Agregar primera página y puntos suspensivos si es necesario
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }
    
    // Agregar páginas visibles
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Agregar puntos suspensivos y última página si es necesario
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    
    return pages;
  };

  // Estilos según la variante
  const getButtonVariant = (isActive: boolean = false) => {
    if (variant === 'inversion') {
      return isActive ? 'primaryInverse' : 'secondaryInverse';
    }
    return isActive ? 'primaryGeneral' : 'secondaryGeneral';
  };

  const getIconColor = () => {
    return variant === 'inversion' ? 'text-basic-neutral-900' : 'text-primary-azul-proteccion-500';
  };

  const getTextColor = () => {
    return variant === 'inversion' ? 'text-basic-neutral-900' : 'text-basic-neutral-600';
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleFirstPage = () => {
    if (currentPage > 1) {
      onPageChange(1);
    }
  };

  const handleLastPage = () => {
    if (currentPage < totalPages) {
      onPageChange(totalPages);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={`flex flex-col lg:flex-row items-center justify-between gap-4 w-full ${className}`}>
      {/* Información de página y selector de tamaño - Solo en desktop */}
      {showPageSizeSelector && (
        <div className="hidden lg:flex items-center gap-4">
          <span className={`text-sm ${getTextColor()}`}>
            Página {currentPage} de {totalPages}
          </span>
          
          <div className="flex items-center gap-2">
            <span className={`text-sm ${getTextColor()}`}>{showText}</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
              className={`
                border rounded px-2 py-1 text-sm
                ${variant === 'inversion' 
                  ? 'border-basic-neutral-900 text-basic-neutral-900 bg-white' 
                  : 'border-basic-neutral-300 text-basic-neutral-900 bg-white'
                }
              `}
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className={`text-sm ${getTextColor()}`}>{rowsPerPageText}</span>
          </div>
        </div>
      )}

      {/* Controles de navegación */}
      <div className="flex items-center gap-1">
        {/* Primera página */}
        {showFirstLast && (
          <button
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            className={`
              p-2 rounded-md transition-colors
              ${currentPage === 1 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-basic-neutral-100'
              }
            `}
            aria-label="Primera página"
          >
            <Icon 
              name="first-page" 
              size={20} 
              color={getIconColor()}
            />
          </button>
        )}

        {/* Navegación rápida hacia atrás */}
        {showQuickNavigation && (
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 5))}
            disabled={currentPage <= 5}
            className={`
              p-2 rounded-md transition-colors
              ${currentPage <= 5 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-basic-neutral-100'
              }
            `}
            aria-label="Retroceder 5 páginas"
          >
            <Icon 
              name="chevrons-left" 
              size={20} 
              color={getIconColor()}
            />
          </button>
        )}

        {/* Página anterior */}
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`
            p-2 rounded-md transition-colors
            ${currentPage === 1 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-basic-neutral-100'
            }
          `}
          aria-label="Página anterior"
        >
          <Icon 
            name="chevron-left" 
            size={20} 
            color={getIconColor()}
          />
        </button>

        {/* Números de página */}
        <div className="flex items-center gap-1">
          {visiblePages.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className={`px-3 py-2 text-sm ${getTextColor()}`}>...</span>
              ) : (
                <button
                  onClick={() => handlePageClick(page)}
                  className={`
                    min-w-[40px] h-10 px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${page === currentPage
                      ? variant === 'inversion'
                        ? 'bg-basic-neutral-900 text-white'
                        : 'bg-primary-azul-proteccion-500 text-white'
                      : variant === 'inversion'
                        ? 'text-basic-neutral-900 hover:bg-basic-neutral-100'
                        : 'text-basic-neutral-600 hover:bg-basic-neutral-100'
                    }
                  `}
                  aria-label={`Página ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Página siguiente */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`
            p-2 rounded-md transition-colors
            ${currentPage === totalPages 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-basic-neutral-100'
            }
          `}
          aria-label="Página siguiente"
        >
          <Icon 
            name="chevron-right" 
            size={20} 
            color={getIconColor()}
          />
        </button>

        {/* Navegación rápida hacia adelante */}
        {showQuickNavigation && (
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 5))}
            disabled={currentPage > totalPages - 5}
            className={`
              p-2 rounded-md transition-colors
              ${currentPage > totalPages - 5 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-basic-neutral-100'
              }
            `}
            aria-label="Avanzar 5 páginas"
          >
            <Icon 
              name="chevrons-right" 
              size={20} 
              color={getIconColor()}
            />
          </button>
        )}

        {/* Última página */}
        {showFirstLast && (
          <button
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
            className={`
              p-2 rounded-md transition-colors
              ${currentPage === totalPages 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-basic-neutral-100'
              }
            `}
            aria-label="Última página"
          >
            <Icon 
              name="last-page" 
              size={20} 
              color={getIconColor()}
            />
          </button>
        )}
      </div>

      {/* Información móvil */}
      <div className="lg:hidden">
        <span className={`text-sm ${getTextColor()}`}>
          {totalItems ? 
            `${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, totalItems)} de ${totalItems}` :
            `Página ${currentPage} de ${totalPages}`
          }
        </span>
      </div>
    </div>
  );
}; 