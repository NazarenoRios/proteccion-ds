import type { IconSet } from '../components/atoms/Icon/Icon';

const ICON_PREFIX_MAP: Record<string, IconSet> = {
  Hi: 'hi', // Heroicons
  Md: 'md', // Material Design
  Fa: 'fa', // Font Awesome
  Ri: 'ri', // Remix Icons
  Bi: 'bi', // Bootstrap Icons
  Ai: 'ai', // Ant Design Icons
  Bs: 'bs', // Bootstrap Icons
  Tb: 'tb', // Tabler Icons
  Gi: 'gi', // Game Icons
  Wi: 'wi', // Weather Icons
  Di: 'di', // Devicons
  Si: 'si', // Simple Icons
  Im: 'im', // IcoMoon Free
  Fi: 'fi', // Feather Icons
  Cg: 'cg', // CSS.gg
  Vsc: 'vsc', // VS Code Icons
  Go: 'go', // Github Octicons
  Gr: 'gr', // Grommet Icons
  Ti: 'ti', // Typicons
  Pi: 'pi', // Phosphor Icons
  Lu: 'lu', // Lucide Icons
  Ci: 'ci', // Circum Icons
  Rx: 'rx', // Radix Icons
  Tfi: 'tfi', // Themify Icons
  Lia: 'lia', // Line Awesome
};

export const getIconSetFromName = (iconName: string): IconSet => {
  // Obtener el prefijo del nombre del icono (los primeros 2 caracteres)
  const prefix = iconName.substring(0, 2);
  return ICON_PREFIX_MAP[prefix] || 'fa'; // Por defecto usa Font Awesome
};
