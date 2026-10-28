import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from '../avatar';
import { Button } from '../button';
import { BellIcon } from '../icons';

import { Badge } from './Badge';

const bell = (
  <Button variant="secondary" isIconOnly aria-label="Notifications">
    <BellIcon />
  </Button>
);

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { count: 3, label: '3 unread notifications', children: bell },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnButton: Story = {};

export const OnAvatar: Story = {
  args: { count: 2, label: '2 new messages from Jordan Lee', children: <Avatar name="Jordan Lee" /> },
};

export const OverMax: Story = { args: { count: 120, label: '120 unread notifications' } };

export const Zero: Story = { args: { count: 0, label: 'No unread notifications' } };

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="flex items-center gap-8">
      <Badge count={3} label="3 unread notifications">
        {bell}
      </Badge>
      <Badge count={2} label="2 new messages from Jordan Lee">
        <Avatar name="Jordan Lee" />
      </Badge>
      <Badge count={120} label="120 unread notifications">
        {bell}
      </Badge>
    </div>
  ),
};
