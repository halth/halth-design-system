import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { AttributeChip } from '../attribute-chip';
import { Button } from '../button';
import { CardLogo } from '../card-logo';
import { BanknoteArrowUpIcon, PaperPlaneIcon, PlusIcon } from '../icons';
import { BookingCard, BookingCardSkeleton } from './BookingCard';

const PaymentChip = ({ brand = 'visa' }: { brand?: string }) => (
  <AttributeChip label="Payment method" onPress={fn()}>
    <CardLogo type="payment_method" brand={brand} />
  </AttributeChip>
);

const HealthFundChip = ({ healthFundId = 'BUPA' }: { healthFundId?: string }) => (
  <AttributeChip label="Health fund card" onPress={fn()}>
    <CardLogo type="health_fund_card" brand={healthFundId} />
  </AttributeChip>
);

const MedicareChip = () => (
  <AttributeChip label="Medicare card" onPress={fn()}>
    <CardLogo type="medicare_card" />
  </AttributeChip>
);

const FundingChip = () => (
  <AttributeChip label="Funding available">
    <BanknoteArrowUpIcon />
  </AttributeChip>
);

const AddCardChip = () => (
  <AttributeChip label="Missing card details" onPress={fn()}>
    <PlusIcon />
  </AttributeChip>
);

const meta = {
  title: 'Components/BookingCard',
  component: BookingCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A booking in the business calendar. Display only: the app maps its `Booking` into these props and handles actions.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl bg-stone-100 p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    client: { name: 'Jordan Lee', firstName: 'Jordan', lastName: 'Lee' },
    time: '9:30 AM',
    details: {
      appointment: 'Initial consult (60 min)',
      provider: 'Dr Sam Patel',
      location: 'Northside Physio, Fitzroy',
    },
    onPress: fn(),
  },
  argTypes: {
    status: {
      control: 'select',
      options: [undefined, 'paid', 'did_not_arrive', 'cancelled', 'late_cancellation', 'awaiting_payment'],
    },
  },
} satisfies Meta<typeof BookingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Upcoming: Story = {};
export const Live: Story = { args: { isLive: true } };
export const Paid: Story = { args: { status: 'paid' } };
export const AwaitingPayment: Story = { args: { status: 'awaiting_payment' } };
export const DidNotArrive: Story = { args: { status: 'did_not_arrive' } };
export const Cancelled: Story = { args: { status: 'cancelled' } };
export const LateCancellation: Story = { args: { status: 'late_cancellation' } };

export const VerifiedMemberWithAttributes: Story = {
  name: 'Verified member with attributes',
  args: {
    client: { name: 'Zyra Lintwell', firstName: 'Zyra', lastName: 'Lintwell', isVerified: true },
    time: '10:30 AM',
    details: {
      appointment: 'Chiropractic Adjustment (30 min)',
      provider: 'Daniel David Palmer',
      location: 'Motion Lab',
    },
    attributes: (
      <>
        <PaymentChip />
        <HealthFundChip healthFundId="TEST" />
        <MedicareChip />
      </>
    ),
  },
};

export const MissingCardDetails: Story = {
  args: {
    client: { name: 'Alex Chen', firstName: 'Alex', lastName: 'Chen', isVerified: true },
    attributes: (
      <>
        <PaymentChip brand="mastercard" />
        <AddCardChip />
      </>
    ),
  },
};

export const FundingAvailable: Story = {
  args: {
    client: { name: 'Alex Chen', firstName: 'Alex', lastName: 'Chen', isVerified: true },
    status: 'awaiting_payment',
    attributes: (
      <>
        <PaymentChip />
        <HealthFundChip />
        <FundingChip />
        <AddCardChip />
      </>
    ),
  },
};

export const InviteClient: Story = {
  args: {
    client: { name: 'Sam Rivera', firstName: 'Sam', lastName: 'Rivera' },
    nameAction: (
      <Button size="xs" variant="secondary">
        <PaperPlaneIcon className="size-3" />
        <span className="hidden sm:inline">Invite client</span>
      </Button>
    ),
    attributes: <AddCardChip />,
  },
};

export const List: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <BookingCard {...args} isLive />
      <BookingCard
        {...args}
        client={{ name: 'Alex Chen', firstName: 'Alex', lastName: 'Chen', isVerified: true }}
        time="10:30 AM"
        status="paid"
        attributes={
          <>
            <PaymentChip />
            <HealthFundChip />
            <MedicareChip />
          </>
        }
      />
      <BookingCard
        {...args}
        client={{ name: 'Sam Rivera', firstName: 'Sam', lastName: 'Rivera' }}
        time="11:45 AM"
        status="late_cancellation"
      />
    </div>
  ),
};

export const Skeleton: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <BookingCardSkeleton />
      <BookingCardSkeleton />
    </div>
  ),
};
