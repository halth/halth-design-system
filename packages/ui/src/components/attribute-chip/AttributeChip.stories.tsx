import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { CardLogo } from '../card-logo';
import { BanknoteArrowUpIcon, PlusIcon } from '../icons';
import { AttributeChip } from './AttributeChip';

const meta = {
  title: 'Components/AttributeChip',
  component: AttributeChip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The logo pills under a client’s name on `BookingCard` and transaction cards. With `onPress` it is a button; without, it only shows its tooltip.',
      },
    },
  },
  args: {
    label: 'Payment method',
    children: <CardLogo type="payment_method" brand="visa" />,
    onPress: fn(),
  },
} satisfies Meta<typeof AttributeChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PaymentMethod: Story = {};

export const HealthFund: Story = {
  args: { label: 'Health fund card', children: <CardLogo type="health_fund_card" brand="BUPA" /> },
};

export const Medicare: Story = {
  args: { label: 'Medicare card', children: <CardLogo type="medicare_card" /> },
};

export const FundingAvailable: Story = {
  args: { label: 'Funding available', children: <BanknoteArrowUpIcon />, onPress: undefined },
};

export const AddCard: Story = {
  args: { label: 'Missing card details', children: <PlusIcon /> },
};

export const AllAttributes: Story = {
  name: 'All attributes',
  render: () => (
    <div className="flex items-center gap-2">
      <AttributeChip label="Payment method" onPress={fn()}>
        <CardLogo type="payment_method" brand="mastercard" />
      </AttributeChip>
      <AttributeChip label="Health fund card" onPress={fn()}>
        <CardLogo type="health_fund_card" brand="TEST" />
      </AttributeChip>
      <AttributeChip label="Medicare card" onPress={fn()}>
        <CardLogo type="medicare_card" />
      </AttributeChip>
      <AttributeChip label="Funding available">
        <BanknoteArrowUpIcon />
      </AttributeChip>
      <AttributeChip label="Missing card details" onPress={fn()}>
        <PlusIcon />
      </AttributeChip>
    </div>
  ),
};
