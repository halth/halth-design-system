import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentType } from 'react';

import * as IconModule from './Icons';
import { CheckIcon, type IconProps } from './Icons';

const ICONS = Object.entries(IconModule).filter(([name]) => name.endsWith('Icon')) as [
  string,
  ComponentType<IconProps>,
][];

const meta = {
  title: 'Components/Icons',
  component: CheckIcon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'HaltH icons: Lucide, one per job. Import from `@halth/ui/icons`. They inherit `currentColor`; size them with `size-(--icon-*)`.',
      },
    },
  },
  args: { className: 'size-6 text-primary' },
} satisfies Meta<typeof CheckIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllIcons: Story = {
  name: 'All icons',
  render: (args) => (
    <div className="grid grid-cols-3 gap-6 sm:grid-cols-6">
      {ICONS.map(([name, IconComponent]) => (
        <div key={name} className="flex flex-col items-center gap-2 text-xs">
          <IconComponent {...args} />
          <code className="text-muted-foreground">{name}</code>
        </div>
      ))}
    </div>
  ),
};

export const Check: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4 text-primary">
      <CheckIcon className="size-(--icon-xs)" />
      <CheckIcon className="size-(--icon-md)" />
      <CheckIcon className="size-(--icon-xl)" />
      <CheckIcon className="size-(--icon-2xl)" />
    </div>
  ),
};
