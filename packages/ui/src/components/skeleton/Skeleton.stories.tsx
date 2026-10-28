import type { Meta, StoryObj } from '@storybook/react-vite';

import { Skeleton } from './Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: { className: 'h-4 w-48' },
  argTypes: { shape: { control: 'inline-radio', options: ['bar', 'tile'] } },
  decorators: [
    (Story) => (
      <div className="rounded-container bg-card p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bar: Story = {};

export const Tile: Story = { args: { shape: 'tile', className: 'size-16' } };

/** A loading client row: the same layout as the row it stands in for. */
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="flex w-80 items-center gap-4">
      <Skeleton shape="tile" className="size-16 shrink-0" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  ),
};
