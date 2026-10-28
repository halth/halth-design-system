import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spinner } from './Spinner';

const sizes = ['sm', 'md', 'lg'] as const;

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  args: { label: 'Loading bookings' },
  argTypes: { size: { control: 'inline-radio', options: sizes } },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = { args: { size: 'sm' } };

export const Large: Story = { args: { size: 'lg' } };

export const AllSizes: Story = {
  name: 'All variants',
  render: (args) => (
    <div className="flex items-center gap-6">
      {sizes.map((size) => (
        <Spinner key={size} {...args} size={size} />
      ))}
    </div>
  ),
};
