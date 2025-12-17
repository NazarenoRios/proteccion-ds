import React, { useState, useRef, useEffect } from 'react';

export interface Pestaña {
  etiqueta: string;
  valor: string;
  icono?: React.ReactNode;
}

export interface PestañasProps {
  /**
   * Array de pestañas con etiquetas y valores (mínimo 3, máximo 6)
   */
  pestañas: Pestaña[];
  /**
   * Pestaña activa actual
   */
  pestañaActiva: string;
  /**
   * Función que se ejecuta cuando cambia la pestaña activa
   */
  onChange: (valor: string) => void;
  /**
   * Clases CSS adicionales
   */
  className?: string;
}

// English interfaces for compatibility
export interface Tab {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  /**
   * Array of tabs with labels and values (minimum 3, maximum 6)
   */
  tabs: Tab[];
  /**
   * Currently active tab
   */
  activeTab: string;
  /**
   * Function called when active tab changes
   */
  onChange: (value: string) => void;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const Pestañas: React.FC<PestañasProps> = ({
  pestañas,
  pestañaActiva,
  onChange,
  className = '',
}) => {
  // Validaciones de negocio
  if (pestañas.length < 3 || pestañas.length > 6) {
    console.warn('Las pestañas deben tener entre 3 y 6 elementos');
  }

  // Validar que las etiquetas no excedan 25 caracteres y estén en mayúsculas
  const pestañasValidadas = pestañas.map(pestaña => {
    if (pestaña.etiqueta.length > 25) {
      console.warn(`La etiqueta "${pestaña.etiqueta}" excede los 25 caracteres permitidos`);
    }
    
    return {
      ...pestaña,
      etiqueta: pestaña.etiqueta.toUpperCase()
    };
  });

  const [focusedIndex, setFocusedIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = pestañasValidadas.findIndex(pestaña => pestaña.valor === pestañaActiva);
    if (activeIndex >= 0) {
      setFocusedIndex(activeIndex);
    }
  }, [pestañaActiva, pestañasValidadas]);

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        const prevIndex = index > 0 ? index - 1 : pestañasValidadas.length - 1;
        setFocusedIndex(prevIndex);
        tabRefs.current[prevIndex]?.focus();
        break;
      case 'ArrowRight':
        event.preventDefault();
        const nextIndex = index < pestañasValidadas.length - 1 ? index + 1 : 0;
        setFocusedIndex(nextIndex);
        tabRefs.current[nextIndex]?.focus();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        onChange(pestañasValidadas[index].valor);
        break;
      case 'Home':
        event.preventDefault();
        setFocusedIndex(0);
        tabRefs.current[0]?.focus();
        break;
      case 'End':
        event.preventDefault();
        const lastIndex = pestañasValidadas.length - 1;
        setFocusedIndex(lastIndex);
        tabRefs.current[lastIndex]?.focus();
        break;
    }
  };

  const getTabStyles = (isActive: boolean) => {
    const baseStyles = 'px-6 py-3 text-base font-medium border-b-2 transition-all duration-200 cursor-pointer focus:outline-none relative flex items-center gap-2';
    
    if (isActive) {
      return `${baseStyles} text-primary-azul-proteccion-600 border-primary-azul-proteccion-500 bg-primary-azul-proteccion-100 font-semibold`;
    }
    
    return `${baseStyles} text-basic-neutral-600 border-transparent hover:text-primary-azul-proteccion-500 hover:border-primary-azul-proteccion-300 hover:bg-primary-azul-proteccion-100/30 bg-white`;
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className="flex border-b border-basic-neutral-200 bg-white"
        role="tablist"
        aria-orientation="horizontal"
      >
        {pestañasValidadas.map((pestaña, index) => {
          const isActive = pestaña.valor === pestañaActiva;
          const isFocused = index === focusedIndex;
          
          return (
            <button
              key={pestaña.valor}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${pestaña.valor}`}
              id={`tab-${pestaña.valor}`}
              tabIndex={isFocused ? 0 : -1}
              className={getTabStyles(isActive)}
              onClick={() => onChange(pestaña.valor)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={() => setFocusedIndex(index)}
            >
              {pestaña.icono && (
                <span className="w-4 h-4 flex-shrink-0">
                  {pestaña.icono}
                </span>
              )}
              <span className="truncate">{pestaña.etiqueta}</span>
              {isActive && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-azul-proteccion-500"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Mantener compatibilidad con nombres anteriores
export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
}) => {
  // Convert English props to Spanish props
  const pestañas: Pestaña[] = tabs.map(tab => ({
    etiqueta: tab.label,
    valor: tab.value,
  }));

  return (
    <Pestañas
      pestañas={pestañas}
      pestañaActiva={activeTab}
      onChange={onChange}
      className={className}
    />
  );
};

// Keep legacy aliases
export const TabsLegacy = Pestañas;
export type TabsPropsLegacy = PestañasProps;
export type TabLegacy = Pestaña; 