import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Button, buttonVariants } from './Button';

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const variants = ['default', 'secondary', 'outline', 'ghost', 'light', 'danger', 'link'] as const;
const sizes = ['xs', 'sm', 'md', 'lg'] as const;

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The HaltH button, built on the HeroUI v3 `Button`. Use `buttonVariants()` to style links as buttons.',
      },
    },
  },
  args: {
    children: 'Book appointment',
    onPress: fn(),
  },
  argTypes: {
    variant: { control: 'select', options: variants },
    size: { control: 'select', options: sizes },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: 'default' } };

export const Secondary: Story = { args: { variant: 'secondary', children: 'Back' } };

export const Outline: Story = { args: { variant: 'outline', children: 'Edit details' } };

export const Ghost: Story = { args: { variant: 'ghost', children: 'More options' } };

export const Light: Story = { args: { variant: 'light', children: 'Add note' } };

export const Danger: Story = { args: { variant: 'danger', children: 'Cancel booking' } };

export const Link: Story = { args: { variant: 'link', children: 'View all bookings' } };

export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Button key={size} {...args} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <PlusIcon />
        New booking
      </>
    ),
  },
};

export const IconOnly: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      {sizes.map((size) => (
        <Button key={size} {...args} isIconOnly size={size} aria-label="Add">
          <PlusIcon />
        </Button>
      ))}
    </div>
  ),
};

export const Pending: Story = {
  args: { isPending: true, children: 'Saving' },
};

export const Disabled: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant} isDisabled>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const Submit: Story = {
  name: 'Form submit',
  render: (args) => (
    <form className="flex gap-3" onSubmit={(event) => event.preventDefault()}>
      <Button {...args} variant="outline">
        Cancel
      </Button>
      <Button {...args} type="submit" className="px-10">
        Save
      </Button>
    </form>
  ),
};

export const AsLink: Story = {
  render: () => (
    <a href="#bookings" className={buttonVariants({ variant: 'outline' })}>
      View bookings
    </a>
  ),
};
