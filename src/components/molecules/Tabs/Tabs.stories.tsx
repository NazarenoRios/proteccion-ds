import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pestañas } from './Tabs';

// Iconos de ejemplo usando SVG simples
const IconoInicio = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const IconoProductos = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />
  </svg>
);

const IconoServicios = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const IconoConfiguracion = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
  </svg>
);

const meta: Meta<typeof Pestañas> = {
  title: 'Molecules/Pestañas',
  component: Pestañas,
  parameters: {
    figma:
      'https://www.figma.com/design/sMJTAQgPqMvxAEgqAIgVTA/Protecci%C3%B3n---Sistema-de-Dise%C3%B1o--Copy-?node-id=568-4143&t=64GXAX431PIpDkqA-4',
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    pestañas: {
      control: 'object',
      description: 'Array de pestañas con etiquetas y valores (mínimo 3, máximo 6)',
    },
    pestañaActiva: {
      control: 'text',
      description: 'Pestaña activa actual',
    },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Pestañas>;

// Datos de ejemplo siguiendo las reglas de negocio
const pestañasMinimas = [
  { etiqueta: 'INICIO', valor: 'inicio' },
  { etiqueta: 'PRODUCTOS', valor: 'productos' },
  { etiqueta: 'SERVICIOS', valor: 'servicios' },
];

const pestañasConIconos = [
  { etiqueta: 'INICIO', valor: 'inicio', icono: <IconoInicio /> },
  { etiqueta: 'PRODUCTOS', valor: 'productos', icono: <IconoProductos /> },
  { etiqueta: 'SERVICIOS', valor: 'servicios', icono: <IconoServicios /> },
  { etiqueta: 'CONFIGURACIÓN', valor: 'configuracion', icono: <IconoConfiguracion /> },
];

const pestañasMaximas = [
  { etiqueta: 'DASHBOARD', valor: 'dashboard' },
  { etiqueta: 'ANALÍTICAS', valor: 'analytics' },
  { etiqueta: 'REPORTES', valor: 'reports' },
  { etiqueta: 'CONFIGURACIÓN', valor: 'settings' },
  { etiqueta: 'USUARIOS', valor: 'users' },
  { etiqueta: 'FACTURACIÓN', valor: 'billing' },
];

// Stories con state management
export const Predeterminado: Story = {
  render: args => {
    const [pestañaActiva, setPestañaActiva] = useState(args.pestañaActiva || 'inicio');

    return (
      <div className="w-full max-w-4xl">
        <Pestañas {...args} pestañaActiva={pestañaActiva} onChange={setPestañaActiva} />
        <div className="mt-6 p-6 bg-primary-azul-proteccion-50 rounded-lg">
          <h3 className="text-lg font-semibold text-primary-azul-proteccion-800 mb-2">
            Pestaña Activa: {pestañaActiva.toUpperCase()}
          </h3>
          <p className="text-primary-azul-proteccion-600">
            Contenido dinámico que cambia según la pestaña seleccionada.
          </p>
        </div>
      </div>
    );
  },
  args: {
    pestañas: pestañasMinimas,
    pestañaActiva: 'inicio',
  },
};

export const ConIconos: Story = {
  render: args => {
    const [pestañaActiva, setPestañaActiva] = useState(args.pestañaActiva || 'inicio');

    return (
      <div className="w-full max-w-4xl">
        <Pestañas {...args} pestañaActiva={pestañaActiva} onChange={setPestañaActiva} />
        <div className="mt-6 p-6 bg-primary-azul-proteccion-50 rounded-lg">
          <h3 className="text-lg font-semibold text-primary-azul-proteccion-800 mb-2">
            {pestañasConIconos.find(p => p.valor === pestañaActiva)?.etiqueta}
          </h3>
          <p className="text-primary-azul-proteccion-600">
            Pestañas con iconos opcionales a la izquierda del texto.
          </p>
        </div>
      </div>
    );
  },
  args: {
    pestañas: pestañasConIconos,
    pestañaActiva: 'inicio',
  },
};

export const SeisPestañas: Story = {
  render: args => {
    const [pestañaActiva, setPestañaActiva] = useState(args.pestañaActiva || 'dashboard');

    return (
      <div className="w-full max-w-6xl">
        <Pestañas {...args} pestañaActiva={pestañaActiva} onChange={setPestañaActiva} />
        <div className="mt-6 p-6 bg-primary-azul-proteccion-50 rounded-lg">
          <h3 className="text-lg font-semibold text-primary-azul-proteccion-800 mb-2">
            {pestañasMaximas.find(p => p.valor === pestañaActiva)?.etiqueta}
          </h3>
          <p className="text-primary-azul-proteccion-600">
            Ejemplo con el máximo de 6 pestañas permitidas.
          </p>
        </div>
      </div>
    );
  },
  args: {
    pestañas: pestañasMaximas,
    pestañaActiva: 'dashboard',
  },
};

// Ejemplo interactivo completo con contenido dinámico
export const Interactivo: Story = {
  render: () => {
    const [pestañaActiva, setPestañaActiva] = useState('inicio');

    const contenidoPorPestaña = {
      inicio: {
        titulo: '🏠 INICIO',
        contenido:
          'Bienvenido a la página principal. Aquí encontrarás un resumen de todas las funcionalidades disponibles.',
        items: [
          'Dashboard principal',
          'Accesos rápidos',
          'Notificaciones recientes',
          'Estadísticas en tiempo real',
        ],
      },
      productos: {
        titulo: '📦 PRODUCTOS',
        contenido:
          'Explora nuestro catálogo completo de productos y servicios diseñados para satisfacer tus necesidades.',
        items: [
          'Productos destacados',
          'Categorías',
          'Ofertas especiales',
          'Nuevos lanzamientos',
          'Comparador de productos',
        ],
      },
      servicios: {
        titulo: '🛠️ SERVICIOS',
        contenido:
          'Descubre los servicios profesionales que ofrecemos para ayudarte a alcanzar tus objetivos empresariales.',
        items: [
          'Consultoría especializada',
          'Soporte técnico 24/7',
          'Capacitación personalizada',
          'Mantenimiento programado',
        ],
      },
      configuracion: {
        titulo: '⚙️ CONFIGURACIÓN',
        contenido:
          'Personaliza tu experiencia y configura las opciones del sistema según tus preferencias.',
        items: [
          'Configuración de usuario',
          'Preferencias del sistema',
          'Gestión de permisos',
          'Configuración de seguridad',
        ],
      },
    };

    const contenidoActual = contenidoPorPestaña[pestañaActiva as keyof typeof contenidoPorPestaña];

    return (
      <div className="w-full max-w-5xl">
        <Pestañas
          pestañas={pestañasConIconos}
          pestañaActiva={pestañaActiva}
          onChange={setPestañaActiva}
        />

        <div className="mt-8 p-6 bg-gradient-to-br from-primary-azul-proteccion-50 to-primary-azul-proteccion-100 rounded-xl border border-primary-azul-proteccion-200">
          <h3 className="text-2xl font-bold text-primary-azul-proteccion-800 mb-4">
            {contenidoActual.titulo}
          </h3>
          <p className="text-primary-azul-proteccion-700 mb-6 text-lg">
            {contenidoActual.contenido}
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-primary-azul-proteccion-800">Características:</h4>
              <ul className="space-y-2">
                {contenidoActual.items.map((item, index) => (
                  <li key={index} className="flex items-center text-primary-azul-proteccion-700">
                    <span className="w-2 h-2 bg-primary-azul-proteccion-500 rounded-full mr-3 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/70 p-4 rounded-lg border border-primary-azul-proteccion-300">
              <h4 className="font-semibold text-primary-azul-proteccion-800 mb-3">
                Información del Tab:
              </h4>
              <div className="space-y-2 text-sm text-primary-azul-proteccion-600">
                <div>
                  <strong>ID:</strong> {pestañaActiva}
                </div>
                <div>
                  <strong>Título:</strong> {contenidoActual.titulo}
                </div>
                <div>
                  <strong>Elementos:</strong> {contenidoActual.items.length}
                </div>
                <div>
                  <strong>Tiene ícono:</strong>{' '}
                  {pestañasConIconos.find(p => p.valor === pestañaActiva)?.icono ? 'Sí' : 'No'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white rounded-lg border border-basic-neutral-200">
          <p className="text-sm text-basic-neutral-600 mb-2">
            <strong>💡 Navegación por teclado:</strong>
          </p>
          <div className="text-xs text-basic-neutral-500 space-y-1">
            <p>• Usa las teclas de flecha ← → para navegar entre pestañas</p>
            <p>• Presiona Enter o Espacio para seleccionar una pestaña</p>
            <p>• Usa Home/End para ir a la primera/última pestaña</p>
            <p>
              • Las pestañas siguen las reglas: 3-6 tabs, máx. 25 caracteres, títulos en MAYÚSCULAS
            </p>
          </div>
        </div>
      </div>
    );
  },
};

// Ejemplo de validación de reglas de negocio
export const EjemploValidacion: Story = {
  render: () => {
    const [pestañaActiva, setPestañaActiva] = useState('valida1');

    // Ejemplo que viola las reglas para mostrar warnings
    const pestañasConProblemas = [
      { etiqueta: 'VÁLIDA 1', valor: 'valida1' },
      { etiqueta: 'ESTA ETIQUETA ES DEMASIADO LARGA Y EXCEDE LOS 25 CARACTERES', valor: 'larga' },
      { etiqueta: 'VÁLIDA 3', valor: 'valida3' },
    ];

    return (
      <div className="w-full max-w-4xl">
        <div className="mb-4 p-4 bg-secondary-advertencia-100 border border-secondary-advertencia-300 rounded-lg">
          <h4 className="font-semibold text-secondary-advertencia-800 mb-2">
            ⚠️ Ejemplo de Validación:
          </h4>
          <p className="text-sm text-secondary-advertencia-700">
            Esta story demuestra las validaciones del componente. Revisa la consola para ver los
            warnings sobre etiquetas muy largas.
          </p>
        </div>

        <Pestañas
          pestañas={pestañasConProblemas}
          pestañaActiva={pestañaActiva}
          onChange={setPestañaActiva}
        />

        <div className="mt-6 p-4 bg-basic-neutral-50 rounded-lg">
          <h4 className="font-semibold text-basic-neutral-800 mb-3">Reglas de Negocio:</h4>
          <ul className="text-sm text-basic-neutral-600 space-y-1">
            <li>✅ Mínimo 3 pestañas, máximo 6</li>
            <li>✅ Títulos automáticamente en MAYÚSCULAS</li>
            <li>⚠️ Máximo 25 caracteres por título (genera warning si se excede)</li>
            <li>✅ Iconos opcionales a la izquierda</li>
            <li>✅ Estado coherente en todas las pestañas</li>
            <li>✅ Navegación por teclado completa</li>
          </ul>
        </div>
      </div>
    );
  },
};
