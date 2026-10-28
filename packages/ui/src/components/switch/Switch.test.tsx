import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Switch } from './Switch';

describe('Switch', () => {
  it('turns on from its label', async () => {
    const onChange = vi.fn();
    render(<Switch onChange={onChange}>Online bookings</Switch>);
    await userEvent.click(screen.getByText('Online bookings'));
    expect(onChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('switch', { name: 'Online bookings' })).toBeChecked();
  });

  it('describes itself with its help text', () => {
    render(<Switch description="Clients can book from your booking link.">Online bookings</Switch>);
    expect(screen.getByRole('switch', { name: 'Online bookings' })).toHaveAccessibleDescription(
      'Clients can book from your booking link.'
    );
  });
});
