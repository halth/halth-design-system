import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: { children: 'Online bookings', onChange: fn() },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {};

export const On: Story = { args: { defaultSelected: true } };

export const WithDescription: Story = {
  args: { description: 'Clients can book from your booking link.' },
};

export const Disabled: Story = { args: { isDisabled: true } };

export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Switch {...args} />
      <Switch {...args} {...On.args} />
      <Switch {...args} {...WithDescription.args} />
      <Switch {...args} {...Disabled.args} />
    </div>
  ),
};
