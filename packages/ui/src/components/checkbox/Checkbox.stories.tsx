import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { children: 'Send a reminder 24 hours before', onChange: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = { args: { defaultSelected: true } };

export const WithDescription: Story = {
  args: { description: 'Clients get an SMS and an email the day before.' },
};

export const Invalid: Story = {
  args: { children: 'I accept the terms of service', isInvalid: true, errorMessage: 'Accept the terms to continue.' },
};

export const Disabled: Story = { args: { isDisabled: true } };

export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Checkbox {...args} />
      <Checkbox {...args} {...Selected.args} />
      <Checkbox {...args} {...WithDescription.args} />
      <Checkbox {...args} {...Invalid.args} />
      <Checkbox {...args} {...Disabled.args} />
    </div>
  ),
};
