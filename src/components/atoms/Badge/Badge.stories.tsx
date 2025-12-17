import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    figma:
      'https://www.figma.com/design/sMJTAQgPqMvxAEgqAIgVTA/Protecci%C3%B3n---Sistema-de-Dise%C3%B1o--Copy-?node-id=4994-8037&t=64GXAX431PIpDkqA-4',
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['S', 'M', 'L'],
      description: 'Tamaño del badge',
      table: {
        defaultValue: { summary: 'M' },
      },
    },
    color: {
      control: 'select',
      options: [
        'basic-neutral-regular',
        'basic-neutral-bold',
        'primary',
        'secondary',
        'secondary-info',
        'secondary-exito',
        'secondary-advertencia',
        'secondary-peligro',
      ],
      description: 'Color del texto del badge',
      table: {
        defaultValue: { summary: 'basic-neutral-regular' },
      },
    },
    label: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Small: Story = {
  args: {
    children: 'Badge',
    size: 'S',
    color: 'basic-neutral-regular',
  },
  parameters: {
    docs: {
      description: {
        component:
          '[📐 Ver diseño en Figma](https://www.figma.com/design/sMJTAQgPqMvxAEgqAIgVTA?node-id=4994-8037)',
        story: 'Badge pequeño con tamaño S.',
      },
    },
  },
};

export const Medium: Story = {
  args: {
    children: 'Badge',
    size: 'M',
    color: 'basic-neutral-regular',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge mediano con tamaño M (por defecto).',
      },
    },
  },
};

export const Large: Story = {
  args: {
    children: 'Badge',
    size: 'L',
    color: 'basic-neutral-regular',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge grande con tamaño L.',
      },
    },
  },
};

export const WithText: Story = {
  args: {
    children: 'Badge',
    size: 'M',
    color: 'primary',
    label: 'Notificaciones',
  },
  argTypes: {
    ...meta.argTypes,
    label: {
      control: 'text',
      description: 'Texto que aparece sobre el Badge',
    },
  },
  render: args => {
    const { label, ...badgeProps } = args;
    return (
      <div className="flex flex-col items-start gap-1 p-4">
        {label && (
          <span className="text-size-10 text-basic-neutral-900 font-families-sura-sans-0 block mb-1">
            {label}
          </span>
        )}
        <Badge {...badgeProps} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge con texto descriptivo encima.',
      },
    },
  },
};

// Grid de todos los tamaños
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="space-y-4">
        <Badge size="S" color="primary">
          Badge
        </Badge>
        <Badge size="M" color="primary">
          Badge
        </Badge>
        <Badge size="L" color="primary">
          Badge
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Todos los tamaños de badge mostrados juntos para comparación.',
      },
    },
  },
};
