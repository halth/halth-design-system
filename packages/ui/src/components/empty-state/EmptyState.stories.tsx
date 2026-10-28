import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button';
import { Card } from '../card';
import { CalendarIcon, CreditCardIcon, SearchIcon } from '../icons';
import { EmptyState } from './EmptyState';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  args: {
    icon: <CreditCardIcon />,
    title: 'Payments not set up',
    description: 'Set up payments to view your payouts and get paid directly into your bank account.',
    action: <Button>Set up payments</Button>,
  },
  decorators: [
    (Story) => (
      <div className="bg-stone-100 p-6">
        <Card className="max-w-xl">
          <Story />
        </Card>
      </div>
    ),
  ],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Business transactions before payments are set up. */
export const Default: Story = {};

/** Member app home with nothing booked. */
export const WithoutAction: Story = {
  args: {
    icon: <CalendarIcon />,
    title: 'No upcoming appointments',
    description: 'Bookings you make will show here.',
    action: undefined,
  },
};

/** Inside a table or list: a search with no results. */
export const Compact: Story = {
  args: {
    isCompact: true,
    icon: <SearchIcon />,
    title: 'No clients found',
    description: 'Try another name, email or phone number.',
    action: undefined,
  },
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="flex flex-col gap-6">
      <EmptyState {...meta.args} />
      <EmptyState {...meta.args} {...WithoutAction.args} />
      <EmptyState {...meta.args} {...Compact.args} />
    </div>
  ),
};
