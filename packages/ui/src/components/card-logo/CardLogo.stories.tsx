import type { Meta, StoryObj } from '@storybook/react-vite';

import { CardLogo } from './CardLogo';

const meta = {
  title: 'Components/CardLogo',
  component: CardLogo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Payment card, health fund, Medicare and DVA logos from `static.halth.com`. Pass the API values straight through: `paymentMethod.brand` or `healthFundCard.healthFundId`. Use `baseUrl` to load them from another host, or `src` to show any image URL instead.',
      },
    },
  },
  args: { type: 'payment_method', brand: 'visa', alt: 'Visa' },
  argTypes: {
    type: {
      control: 'select',
      options: ['payment_method', 'health_fund_card', 'medicare_card', 'dva_card'],
    },
  },
} satisfies Meta<typeof CardLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PaymentCard: Story = {};

export const HealthFund: Story = { args: { type: 'health_fund_card', brand: 'BUPA', alt: 'Bupa' } };

export const TestHealthFund: Story = {
  args: { type: 'health_fund_card', brand: 'TEST', alt: 'Test health fund' },
};

export const Medicare: Story = { args: { type: 'medicare_card', brand: undefined, alt: 'Medicare' } };

export const Fallback: Story = {
  args: { type: 'payment_method', brand: 'unknown-brand', alt: 'Unknown card' },
};

export const CustomImage: Story = {
  args: {
    type: 'health_fund_card',
    brand: undefined,
    src: 'https://static.halth.com/assets/logo/health-fund-card/BUPA.png',
    alt: 'Bupa',
  },
};
