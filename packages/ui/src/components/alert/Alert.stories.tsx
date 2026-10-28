import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button';
import { Alert } from './Alert';

const tones = ['info', 'success', 'warning', 'danger'] as const;

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    title: 'Claims are processed after payment',
    description: 'The health fund claim is sent once the client has paid for this booking.',
    className: 'max-w-xl',
  },
  argTypes: { tone: { control: 'inline-radio', options: tones } },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = { args: { tone: 'info' } };

export const Success: Story = {
  args: { tone: 'success', title: 'Payments set up', description: 'Payouts go to your bank account every Monday.' },
};

export const Warning: Story = {
  args: {
    tone: 'warning',
    title: 'Claim locked',
    description: 'This claim has been sent to the health fund, so the items can’t be changed.',
  },
};

export const Danger: Story = {
  args: {
    tone: 'danger',
    title: 'Payment failed',
    description: 'The card was declined. Ask the client for another payment method.',
  },
};

export const WithAction: Story = {
  args: {
    tone: 'warning',
    title: 'Payments not set up',
    description: 'Set up payments to take card payments at checkout.',
    action: <Button size="sm">Set up payments</Button>,
  },
};

export const TitleOnly: Story = { args: { description: undefined, title: 'Changes save automatically' } };

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="flex max-w-xl flex-col gap-3">
      {[Info, Success, Warning, Danger, WithAction].map((story, index) => (
        <Alert key={index} {...meta.args} {...story.args} className={undefined} />
      ))}
    </div>
  ),
};
