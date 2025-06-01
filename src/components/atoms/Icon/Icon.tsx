import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as HiIcons from 'react-icons/hi';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import * as BiIcons from 'react-icons/bi';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as TbIcons from 'react-icons/tb';
import * as GiIcons from 'react-icons/gi';
import * as WiIcons from 'react-icons/wi';
import * as DiIcons from 'react-icons/di';
import * as SiIcons from 'react-icons/si';
import * as ImIcons from 'react-icons/im';
import * as FiIcons from 'react-icons/fi';
import * as CgIcons from 'react-icons/cg';
import * as VscIcons from 'react-icons/vsc';
import * as GoIcons from 'react-icons/go';
import * as GrIcons from 'react-icons/gr';
import * as TiIcons from 'react-icons/ti';
import * as PiIcons from 'react-icons/pi';
import * as LuIcons from 'react-icons/lu';
import * as CiIcons from 'react-icons/ci';
import * as RxIcons from 'react-icons/rx';
import * as TfiIcons from 'react-icons/tfi';
import * as LiaIcons from 'react-icons/lia';
import * as IoIcons from 'react-icons/io5';
import type { IconType } from 'react-icons';

export type IconSet =
  | 'fa'
  | 'hi'
  | 'io'
  | 'md'
  | 'ri'
  | 'bi'
  | 'ai'
  | 'bs'
  | 'tb'
  | 'gi'
  | 'wi'
  | 'di'
  | 'si'
  | 'im'
  | 'fi'
  | 'cg'
  | 'vsc'
  | 'go'
  | 'gr'
  | 'ti'
  | 'pi'
  | 'lu'
  | 'ci'
  | 'rx'
  | 'tfi'
  | 'lia';

export interface IconProps {
  name: string;
  set?: IconSet;
  size?: number;
  color?: string;
  className?: string;
}

const iconSets = {
  fa: FaIcons,
  hi: HiIcons,
  io: IoIcons,
  md: MdIcons,
  ri: RiIcons,
  bi: BiIcons,
  ai: AiIcons,
  bs: BsIcons,
  tb: TbIcons,
  gi: GiIcons,
  wi: WiIcons,
  di: DiIcons,
  si: SiIcons,
  im: ImIcons,
  fi: FiIcons,
  cg: CgIcons,
  vsc: VscIcons,
  go: GoIcons,
  gr: GrIcons,
  ti: TiIcons,
  pi: PiIcons,
  lu: LuIcons,
  ci: CiIcons,
  rx: RxIcons,
  tfi: TfiIcons,
  lia: LiaIcons,
};

export const Icon: React.FC<IconProps> = ({
  name,
  set = 'fa',
  size = 24,
  color,
  className = '',
}) => {
  const IconSet = iconSets[set];
  const IconComponent = IconSet[name as keyof typeof IconSet] as IconType;

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in set "${set}"`);
    return null;
  }

  return <IconComponent size={size} color={color} className={className} />;
};
