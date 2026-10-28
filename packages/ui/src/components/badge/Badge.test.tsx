import { render, screen } from '@testing-library/react';

import { Badge } from './Badge';

describe('Badge', () => {
  it('shows the count and gives screen readers the label', () => {
    render(
      <Badge count={3} label="3 unread notifications">
        <span>Bell</span>
      </Badge>
    );
    expect(screen.getByText('3')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('3 unread notifications')).toHaveClass('sr-only');
  });

  it('caps the count at max', () => {
    render(
      <Badge count={120} label="120 new bookings">
        <span>Bookings</span>
      </Badge>
    );
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('hides at zero', () => {
    render(
      <Badge count={0} label="No notifications">
        <span>Bell</span>
      </Badge>
    );
    expect(screen.queryByText('No notifications')).not.toBeInTheDocument();
  });
});
