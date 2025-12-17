import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';
import { useState } from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'Molecules/Pagination',
  component: Pagination,
  parameters: {
    figma:
      'https://www.figma.com/design/sMJTAQgPqMvxAEgqAIgVTA/Protecci%C3%B3n---Sistema-de-Dise%C3%B1o--Copy-?node-id=2334-15168&t=64GXAX431PIpDkqA-4',
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['general', 'inversion'],
      description: 'Variante de estilo',
    },
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'Página actual',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Total de páginas',
    },
    showFirstLast: {
      control: { type: 'boolean' },
      description: 'Mostrar botones de primera y última página',
    },
    showQuickNavigation: {
      control: { type: 'boolean' },
      description: 'Mostrar navegación rápida (doble chevron)',
    },
    showPageSizeSelector: {
      control: { type: 'boolean' },
      description: 'Mostrar selector de filas por página',
    },
    maxVisiblePages: {
      control: { type: 'number', min: 3, max: 10 },
      description: 'Número máximo de páginas visibles',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// Template para paginación controlada
const ControlledTemplate = (args: any) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage || 1);
  const [pageSize, setPageSize] = useState(args.pageSize || 10);

  return (
    <div className="w-full">
      <Pagination
        {...args}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
};

// Variante General
export const General: Story = {
  render: ControlledTemplate,
  args: {
    currentPage: 1,
    totalPages: 10,
    variant: 'general',
    totalItems: 100,
  },
};

// Variante Inversión
export const Inversion: Story = {
  render: ControlledTemplate,
  args: {
    currentPage: 1,
    totalPages: 10,
    variant: 'inversion',
    totalItems: 100,
  },
};

// Aplicación ejemplo - Como se ve en el diseño
export const AplicacionEjemplo: Story = {
  render: () => {
    const [currentPageGeneral, setCurrentPageGeneral] = useState(1);
    const [currentPageInversion, setCurrentPageInversion] = useState(1);

    return (
      <div className="space-y-8">
        {/* Versión General */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4 text-primary-azul-proteccion-800">General</h3>
          <Pagination
            currentPage={currentPageGeneral}
            totalPages={10}
            onPageChange={setCurrentPageGeneral}
            variant="general"
            totalItems={300}
          />
        </div>

        {/* Versión Inversión */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4 text-basic-neutral-900">Inversión</h3>
          <Pagination
            currentPage={currentPageInversion}
            totalPages={10}
            onPageChange={setCurrentPageInversion}
            variant="inversion"
            totalItems={300}
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

// Átomos de barra paginador - Componentes individuales
export const AtomosDeBarra: Story = {
  render: () => {
    const [selector1, setSelector1] = useState(10);
    const [selector2, setSelector2] = useState(10);
    const [selector3, setSelector3] = useState(30);
    const [selector4, setSelector4] = useState(10);
    const [selector5, setSelector5] = useState(10);
    const [selector6, setSelector6] = useState(10);

    return (
      <div className="space-y-8 bg-gray-50 p-8">
        <h3 className="text-lg font-semibold text-center mb-8">Átomos de barra paginador</h3>

        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          {/* Selector con fondo gris */}
          <div className="flex justify-center">
            <select
              value={selector1}
              onChange={e => setSelector1(Number(e.target.value))}
              className="bg-basic-neutral-200 border border-basic-neutral-300 rounded px-3 py-2 text-primary-azul-proteccion-500 font-medium min-w-[80px] text-center appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 8px center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '16px',
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>

          {/* Selector con borde */}
          <div className="flex justify-center">
            <select
              value={selector2}
              onChange={e => setSelector2(Number(e.target.value))}
              className="bg-white border border-basic-neutral-300 rounded px-3 py-2 text-primary-azul-proteccion-500 font-medium min-w-[80px] text-center appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 8px center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '16px',
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>

          {/* Selector activo/enfocado */}
          <div className="flex justify-center">
            <select
              value={selector3}
              onChange={e => setSelector3(Number(e.target.value))}
              className="bg-white border-2 border-primary-azul-proteccion-500 rounded px-3 py-2 text-primary-azul-proteccion-500 font-medium min-w-[80px] text-center appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23004581' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 8px center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '16px',
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>

          {/* Dropdown expandido (simulado) */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="bg-white border border-basic-neutral-300 rounded px-3 py-2 text-primary-azul-proteccion-500 font-medium min-w-[80px] text-center relative">
                {selector4}
                <svg
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="#6b7280"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m6 8 4 4 4-4"
                  />
                </svg>
              </div>
              {/* Simulación de dropdown expandido */}
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-basic-neutral-300 rounded shadow-lg z-10">
                <div className="py-1">
                  <div
                    className="px-3 py-2 text-primary-azul-proteccion-500 hover:bg-basic-neutral-50 cursor-pointer"
                    onClick={() => setSelector4(10)}
                  >
                    10
                  </div>
                  <div
                    className="px-3 py-2 text-primary-azul-proteccion-500 hover:bg-basic-neutral-50 cursor-pointer"
                    onClick={() => setSelector4(20)}
                  >
                    20
                  </div>
                  <div
                    className="px-3 py-2 text-primary-azul-proteccion-500 hover:bg-basic-neutral-50 cursor-pointer"
                    onClick={() => setSelector4(30)}
                  >
                    30
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Selector con borde básico */}
          <div className="flex justify-center">
            <select
              value={selector5}
              onChange={e => setSelector5(Number(e.target.value))}
              className="bg-white border border-basic-neutral-300 rounded px-3 py-2 text-primary-azul-proteccion-500 font-medium min-w-[80px] text-center appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 8px center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '16px',
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>

          {/* Selector con flecha hacia arriba */}
          <div className="flex justify-center">
            <select
              value={selector6}
              onChange={e => setSelector6(Number(e.target.value))}
              className="bg-white border border-basic-neutral-300 rounded px-3 py-2 text-primary-azul-proteccion-500 font-medium min-w-[80px] text-center appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m14 12-4-4-4 4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 8px center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '16px',
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>
        </div>

        <div className="text-center text-sm text-basic-neutral-600 mt-4">
          Diferentes estados y variantes de los selectores de filas por página
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

// Paginador por versión de Dispositivos
export const PaginadorPorDispositivos: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
      <div className="space-y-8 p-6">
        <h3 className="text-xl font-semibold text-center">Paginador por versión de Dispositivos</h3>

        {/* Desktop */}
        <div className="border-2 border-dashed border-gray-300 p-4">
          <h4 className="text-lg font-medium mb-4">Desktop (1200px+)</h4>
          <div className="max-w-6xl">
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={setCurrentPage}
              variant="general"
              totalItems={1000}
              showText="Mostrar"
              rowsPerPageText="Filas por página"
            />
          </div>
        </div>

        {/* Tablet */}
        <div className="border-2 border-dashed border-gray-300 p-4">
          <h4 className="text-lg font-medium mb-4">Tablet (768px - 1199px)</h4>
          <div className="max-w-4xl">
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={setCurrentPage}
              variant="general"
              totalItems={1000}
              maxVisiblePages={3}
              showPageSizeSelector={false}
            />
          </div>
        </div>

        {/* Mobile */}
        <div className="border-2 border-dashed border-gray-300 p-4">
          <h4 className="text-lg font-medium mb-4">Mobile (360px - 767px)</h4>
          <div className="max-w-sm">
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={setCurrentPage}
              variant="general"
              totalItems={1000}
              maxVisiblePages={1}
              showFirstLast={false}
              showQuickNavigation={false}
              showPageSizeSelector={false}
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

// Estados interactivos
export const EstadosInteractivos: Story = {
  render: () => {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(5);
    const [page3, setPage3] = useState(10);

    return (
      <div className="space-y-8 p-6">
        <h3 className="text-xl font-semibold text-center">Estados Interactivos</h3>

        {/* Primera página */}
        <div>
          <h4 className="text-lg font-medium mb-4">
            Primera página (botones de inicio deshabilitados)
          </h4>
          <Pagination
            currentPage={page1}
            totalPages={10}
            onPageChange={setPage1}
            variant="general"
            totalItems={100}
          />
        </div>

        {/* Página intermedia */}
        <div>
          <h4 className="text-lg font-medium mb-4">
            Página intermedia (todos los controles activos)
          </h4>
          <Pagination
            currentPage={page2}
            totalPages={10}
            onPageChange={setPage2}
            variant="general"
            totalItems={100}
          />
        </div>

        {/* Última página */}
        <div>
          <h4 className="text-lg font-medium mb-4">
            Última página (botones de final deshabilitados)
          </h4>
          <Pagination
            currentPage={page3}
            totalPages={10}
            onPageChange={setPage3}
            variant="general"
            totalItems={100}
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

// Uso en tabla de datos
export const UsoTabla: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Datos de ejemplo
    const data = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      nombre: `Usuario ${i + 1}`,
      email: `usuario${i + 1}@email.com`,
      estado: i % 3 === 0 ? 'Activo' : 'Inactivo',
    }));

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / pageSize);

    return (
      <div className="space-y-4 p-6 bg-green-50 rounded-lg">
        <div className="flex items-center mb-2">
          <span className="text-green-600 mr-2">✓</span>
          <span className="font-medium text-green-800">Correcto</span>
        </div>

        {/* Tabla de ejemplo */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Nombre</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentData.map(row => (
                <tr key={row.id}>
                  <td className="px-4 py-3 text-sm text-gray-900">{row.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{row.nombre}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{row.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        row.estado === 'Activo'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {row.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación en la parte inferior */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-end">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                pageSize={pageSize}
                onPageSizeChange={setPageSize}
                totalItems={data.length}
                variant="general"
              />
            </div>
          </div>
        </div>

        <p className="text-sm text-blue-600">
          Tanto como en una página de información archivada como en una tabla de datos, el
          componente de paginador debe estar dentro de un contenedor y justificado a la derecha. El
          paginador debe estar ubicado en la parte inferior.
        </p>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Ejemplo de uso correcto en una tabla de datos, con el paginador justificado a la derecha y ubicado en la parte inferior.',
      },
    },
  },
};

// Configuraciones de filas por página
export const FilasPorPagina: Story = {
  render: ControlledTemplate,
  args: {
    currentPage: 1,
    totalPages: 15,
    variant: 'general',
    totalItems: 300,
    pageSizeOptions: [10, 20, 30, 50],
    pageSize: 20,
  },
};

// Navegación con muchas páginas
export const MuchasPaginas: Story = {
  render: ControlledTemplate,
  args: {
    currentPage: 25,
    totalPages: 50,
    variant: 'general',
    totalItems: 1000,
    maxVisiblePages: 5,
  },
};
