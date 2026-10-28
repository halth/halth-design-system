import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { CopyButton } from './CopyButton';

const meta = {
  title: 'Components/CopyButton',
  component: CopyButton,
  tags: ['autodocs'],
  args: {
    value: 'https://halth.com/book/northside-physio',
    label: 'Copy link',
    onCopy: fn(),
    onError: fn(),
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'secondary', 'outline', 'ghost', 'light'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Press it to copy; it shows "Copied" for two seconds. */
export const Default: Story = {};

export const ExtraSmall: Story = { args: { size: 'xs' } };

export const IconOnly: Story = { args: { isIconOnly: true, label: 'Copy booking reference', value: 'HB-48213' } };

export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div className="flex items-center gap-3">
      <CopyButton {...args} />
      <CopyButton {...args} size="xs" />
      <CopyButton {...args} isIconOnly label="Copy booking reference" value="HB-48213" />
    </div>
  ),
};
