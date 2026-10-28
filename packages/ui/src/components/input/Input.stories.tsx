import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { MailIcon } from '../icons';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: { label: 'Client name', placeholder: 'Jordan Lee', className: 'max-w-sm', onChange: fn() },
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'tel', 'password', 'url', 'search'] },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: { label: 'Email', type: 'email', placeholder: 'jordan@example.com', description: 'Receipts are sent here.' },
};

export const WithStartContent: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'jordan@example.com',
    startContent: <MailIcon />,
  },
};

export const Invalid: Story = {
  args: {
    label: 'Mobile',
    type: 'tel',
    defaultValue: '0400',
    isInvalid: true,
    errorMessage: 'Enter a 10-digit mobile number.',
  },
};

export const Disabled: Story = { args: { isDisabled: true, defaultValue: 'Jordan Lee' } };

/** Search for clients: a search icon, and a clear button once there's text. */
export const Search: Story = {
  args: { type: 'search', label: undefined, 'aria-label': 'Search clients', placeholder: 'Search clients' },
};

export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div className="flex max-w-sm flex-col gap-6">
      {[Default, WithDescription, WithStartContent, Invalid, Disabled, Search].map((story, index) => (
        <Input key={index} {...args} {...story.args} className={undefined} />
      ))}
    </div>
  ),
};
