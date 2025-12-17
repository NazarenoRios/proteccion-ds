import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: [
            'accessibility',
            'accessible-icon-alt',
            'activity',
            'adjust-circle',
            'AI',
            'airplay',
            'alert-circle',
            'alert-octagon',
            'alert-triangle',
            'align-center',
            'align-justify',
            'align-left',
            'align-right',
            'anchor',
            'angry',
            'annoyed-alt',
            'annoyed',
            'aperture',
            'app-download',
            'archive',
            'arrow-down-circle',
            'arrow-down-left',
            'arrow-down-right',
            'arrow-down',
            'arrow-left-circle',
            'arrow-left',
            'arrow-right-circle',
            'arrow-right',
            'arrow-up-circle',
            'arrow-up-left',
            'arrow-up-right',
            'arrow-up',
            'arrows',
            'assistive-listening-systems',
            'at-sign',
            'award',
            'baby-carriage',
            'backpack',
            'balance-scale',
            'band-aid',
            'bar-chart-2',
            'bar-chart',
            'baseball-ball',
            'battery-charging',
            'battery',
            'beach',
            'bell-off',
            'bell',
            'bitcoin-circle',
            'bluetooth',
            'bold',
            'book-open',
            'book',
            'bookmark',
            'box',
            'brain',
            'briefcase',
            'brush-alt',
            'building',
            'bullet',
            'bus-1',
            'bus-alt',
            'bus-school',
            'bus',
            'buy-smart',
            'calculator',
            'calendar',
            'camera-off',
            'camera',
            'car-sideview',
            'car',
            'cast',
            'chart_data',
            'chart-arrow-1',
            'chart-arrow-2',
            'chart-arrow-3',
            'chart-arrow-4',
            'chart-arrow-5',
            'chart-bar',
            'chart-pie',
            'chat-bubble-user',
            'check-circle',
            'check-square',
            'check',
            'chef',
            'chevron-down',
            'chevron-left',
            'chevron-right',
            'chevron-up',
            'chevrons-down',
            'chevrons-left',
            'chevrons-right',
            'chevrons-up',
            'chrome',
            'chronometer-180°',
            'chronometer-270°',
            'chronometer-320°',
            'chronometer-45°',
            'chronometer-90°',
            'circle',
            'clipboard',
            'clock',
            'cloud-drizzle',
            'cloud-lightning',
            'cloud-off',
            'cloud-rain',
            'cloud-snow',
            'cloud',
            'clouds',
            'club',
            'code',
            'codepen',
            'coffee',
            'coin-dollar',
            'coin-purse',
            'command',
            'comment-dots',
            'comment-exclamation',
            'comment-info',
            'comment-message',
            'comment-plus',
            'comment-question',
            'comment-verify',
            'comment',
            'company',
            'compass',
            'confused',
            'constructor',
            'copy',
            'corner-down-left',
            'corner-down-right',
            'corner-left-down',
            'corner-left-up',
            'corner-right-down',
            'corner-right-up',
            'corner-up-left',
            'corner-up-right',
            'cpu',
            'credit-card',
            'crop',
            'crosshair',
            'crutch',
            'currency_exchange',
            'Data-Seguridad',
            'database',
            'delete',
            'desert',
            'desktop',
            'disc',
            'discount',
            'doc',
            'dollar-sign',
            'download-cloud',
            'download',
            'droplet',
            'edit-2',
            'edit-3',
            'edit',
            'enough-coins',
            'euro-circle',
            'Excel',
            'external-link',
            'eye-off',
            'eye',
            'facebook',
            'fast-forward',
            'feather',
            'few-coins',
            'file-bill',
            'file-certificate',
            'file-chart-bars',
            'file-edit',
            'file-minus',
            'file-plus',
            'file-pointer',
            'file-text',
            'file-user',
            'file',
            'film',
            'filter',
            'first-page',
            'flag',
            'flower',
            'folder-minus',
            'folder-plus',
            'folder',
            'font-size',
            'football-american',
            'football-ball',
            'Gavel-judge',
            'gift',
            'git-branch',
            'git-commit',
            'git-merge',
            'git-pull-request',
            'github',
            'gitlab',
            'globe',
            'golf-ball',
            'grid',
            'grin',
            'Group 1707478416',
            'hand-money',
            'hard-drive',
            'hard-hat',
            'hash',
            'headphones',
            'headset',
            'heart-break',
            'heart',
            'help-circle',
            'history-alt',
            'history',
            'home',
            'hourglass',
            'Huella-Check',
            'Huella-error',
            'Huella-User',
            'Huella',
            'image-broken',
            'image',
            'inbox',
            'info',
            'invoice',
            'italic',
            'key',
            'kid',
            'lamp',
            'last-page',
            'laughing-1',
            'laughing',
            'layers',
            'layout',
            'life-buoy',
            'lifejacket',
            'line-height',
            'link-2',
            'link',
            'list',
            'loader',
            'lock',
            'log-in',
            'log-out-2',
            'log-out',
            'mail',
            'manteinance',
            'many-coins',
            'map-pin',
            'map',
            'mars',
            'maximize-2',
            'maximize',
            'meh',
            'menu',
            'message-circle',
            'message-info',
            'message-square',
            'message-talk',
            'messenger',
            'mic-off',
            'mic',
            'minimize-2',
            'minimize',
            'minus-circle',
            'minus-square',
            'minus',
            'monetization_on',
            'monetization',
            'money-bag',
            'Money-change',
            'money-shield',
            'monitor',
            'moon-1',
            'moon',
            'moonset',
            'more-horizontal',
            'more-vertical',
            'motorcycle-courier',
            'mountains-sun',
            'mountains',
            'move',
            'music',
            'navigation-2',
            'navigation',
            'octagon',
            'package',
            'paperclip',
            'pause-circle',
            'pause',
            'pen-tool',
            'percent',
            'phone-call',
            'phone-forwarded',
            'phone-incoming',
            'phone-missed',
            'phone-off',
            'phone-outgoing',
            'phone',
            'pie-chart',
            'play-circle',
            'play',
            'plus-circle',
            'plus-square',
            'plus',
            'pocket',
            'power',
            'printer',
            'radio',
            'refresh-ccw',
            'refresh-cw',
            'repeat',
            'rewind',
            'rotate-ccw',
            'rotate-cw',
            'rss',
            'save',
            'scissors',
            'search',
            'send',
            'server',
            'settings',
            'share-2',
            'share',
            'shield-off',
            'shield',
            'shopping-bag',
            'shopping-cart',
            'shuffle',
            'sidebar',
            'skip-back',
            'skip-forward',
            'slack',
            'slash',
            'sliders',
            'smartphone',
            'smile',
            'speaker',
            'square',
            'star',
            'stop-circle',
            'sun',
            'sunrise',
            'sunset',
            'tablet',
            'tag',
            'target',
            'terminal',
            'thermometer',
            'thumbs-down',
            'thumbs-up',
            'toggle-left',
            'toggle-right',
            'tool',
            'trash-2',
            'trash',
            'trending-down',
            'trending-up',
            'triangle',
            'truck',
            'tv',
            'twitter',
            'type',
            'umbrella',
            'underline',
            'unlock',
            'upload-cloud',
            'upload',
            'user-check',
            'user-minus',
            'user-plus',
            'user-x',
            'user',
            'users',
            'video-off',
            'video',
            'voicemail',
            'volume-1',
            'volume-2',
            'volume-x',
            'volume',
            'watch',
            'wifi-off',
            'wifi',
            'wind',
            'x-circle',
            'x-square',
            'x',
            'zap-off',
            'zap',
            'zoom-in',
            'zoom-out'
          ],
      description: 'Nombre del icono a mostrar',
      table: {
        defaultValue: { summary: 'home' },
      },
    },
    size: {
      control: { type: 'range', min: 12, max: 64, step: 2 },
      description: 'Tamaño del icono en píxeles',
      table: {
        defaultValue: { summary: '24' },
      },
    },
    color: {
      control: 'select',
      options: [
        'text-gray-600',
        'text-primary-azul-proteccion-500',
        'text-primary-amarillo-proteccion-500',
        'text-red-500',
        'text-green-500',
        'text-blue-500',
        'text-purple-500',
        'text-black',
        'text-white',
      ],
      description: 'Color del icono usando clases de Tailwind CSS',
      table: {
        defaultValue: { summary: 'text-gray-600' },
      },
    },
    className: {
      control: 'text',
      description: 'Clases CSS adicionales',
    },
    onClick: { action: 'clicked' },
    ariaLabel: {
      control: 'text',
      description: 'Etiqueta ARIA para accesibilidad',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'home',
  },
  parameters: {
    docs: {
      description: {
        story: 'Icono básico con configuración por defecto.',
      },
    },
  },
};

export const WithDifferentSizes: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Icon name="star" size={16} />
      <Icon name="star" size={24} />
      <Icon name="star" size={32} />
      <Icon name="star" size={48} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Iconos con diferentes tamaños: 16px, 24px, 32px, 48px.',
      },
    },
  },
};

export const WithDifferentColors: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Icon name="heart" color="text-red-500" />
      <Icon name="heart" color="text-green-500" />
      <Icon name="heart" color="text-blue-500" />
      <Icon name="heart" color="text-primary-azul-proteccion-500" />
      <Icon name="heart" color="text-primary-amarillo-proteccion-500" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Iconos con diferentes colores usando clases de Tailwind CSS.',
      },
    },
  },
};

export const Clickable: Story = {
  args: {
    name: 'settings',
    onClick: () => alert('¡Icono clickeado!'),
    className: 'hover:bg-gray-100 p-2 rounded-full transition-colors',
  },
  parameters: {
    docs: {
      description: {
        story: 'Icono interactivo con función onClick y efectos hover.',
      },
    },
  },
};

export const Large: Story = {
  args: {
    name: 'user',
    size: 48,
    color: 'text-primary-azul-proteccion-500',
  },
  parameters: {
    docs: {
      description: {
        story: 'Icono grande de 48px con color personalizado.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    name: 'check',
    size: 16,
    color: 'text-green-500',
  },
  parameters: {
    docs: {
      description: {
        story: 'Icono pequeño de 16px ideal para usar inline o en botones pequeños.',
      },
    },
  },
};

export const NavigationIcons: Story = {
  render: () => (
    <div className="flex items-center space-x-6">
      <Icon name="arrow-left" size={24} color="text-gray-700" />
      <Icon name="arrow-up" size={24} color="text-gray-700" />
      <Icon name="arrow-down" size={24} color="text-gray-700" />
      <Icon name="arrow-right" size={24} color="text-gray-700" />
      <Icon name="chevron-left" size={24} color="text-gray-700" />
      <Icon name="chevron-right" size={24} color="text-gray-700" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Conjunto de iconos comunes de navegación.',
      },
    },
  },
};

export const CommonIcons: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4">
      {['home', 'user', 'settings', 'search', 'bell', 'mail', 'heart', 'star', 'check', 'x', 'plus', 'minus'].map((iconName) => (
        <div key={iconName} className="flex flex-col items-center space-y-2">
          <Icon name={iconName as any} size={32} color="text-gray-600" />
          <span className="text-xs text-gray-500">{iconName}</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Muestra de los iconos más comúnmente utilizados.',
      },
    },
  },
};


export const CustomStyling: Story = {
  render: () => (
    <div className="flex items-center space-x-6">
      <Icon 
        name="shield" 
        size={32} 
        color="text-green-500" 
        className="drop-shadow-lg" 
      />
      <Icon 
        name="alert-triangle" 
        size={32} 
        color="text-yellow-500" 
        className="animate-pulse" 
      />
      <Icon 
        name="x-circle" 
        size={32} 
        color="text-red-500" 
        className="hover:scale-110 transition-transform cursor-pointer" 
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Iconos con estilos personalizados: sombra, animación pulse y hover con escala.',
      },
    },
  },
}; 