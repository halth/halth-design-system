import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BookingCard, type BookingCardProps } from './BookingCard';

const props: BookingCardProps = {
  client: { name: 'Jordan Lee', firstName: 'Jordan', lastName: 'Lee' },
  time: '9:30 AM',
  details: { appointment: 'Initial consult (60 min)', provider: 'Dr Sam Patel', location: 'Fitzroy' },
};

describe('BookingCard', () => {
  it('shows the client, time and details', () => {
    render(<BookingCard {...props} />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Jordan Lee');
    expect(screen.getByText('9:30 AM')).toBeInTheDocument();
    expect(screen.getByText('Initial consult (60 min)')).toBeInTheDocument();
    expect(screen.getByText('Dr Sam Patel')).toBeInTheDocument();
    expect(screen.getByText('Fitzroy')).toBeInTheDocument();
  });

  it.each([
    ['paid', 'Paid'],
    ['did_not_arrive', 'Did not arrive'],
    ['cancelled', 'Cancelled'],
    ['late_cancellation', 'Late cancellation'],
    ['awaiting_payment', 'Awaiting payment'],
  ] as const)('labels the %s status', (status, label) => {
    render(<BookingCard {...props} status={status} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('shows a clock on awaiting payment', () => {
    render(<BookingCard {...props} status="awaiting_payment" />);
    expect(screen.getByText('Awaiting payment').parentElement?.querySelector('svg')).toBeInTheDocument();
  });

  it('marks live bookings and verified members', () => {
    render(<BookingCard {...props} isLive client={{ ...props.client, isVerified: true }} />);
    expect(screen.getByText('Live now')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Verified member' })).toBeInTheDocument();
  });

  it('calls onPress from the card', async () => {
    const onPress = vi.fn();
    render(<BookingCard {...props} onPress={onPress} />);
    await userEvent.click(screen.getByRole('button', { name: 'Open booking for Jordan Lee at 9:30 AM' }));
    expect(onPress).toHaveBeenCalledOnce();
  });

  it('keeps attribute buttons separate from the card press', async () => {
    const onPress = vi.fn();
    const onAddCard = vi.fn();
    render(
      <BookingCard
        {...props}
        onPress={onPress}
        attributes={
          <button type="button" onClick={onAddCard}>
            Add card
          </button>
        }
      />
    );
    await userEvent.click(screen.getByRole('button', { name: 'Add card' }));
    expect(onAddCard).toHaveBeenCalledOnce();
    expect(onPress).not.toHaveBeenCalled();
  });

  it('is not a button without onPress', () => {
    render(<BookingCard {...props} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
