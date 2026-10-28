import { render, screen } from '@testing-library/react';

import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('announces what is loading', () => {
    render(<Spinner label="Loading bookings" />);
    expect(screen.getByRole('status', { name: 'Loading bookings' })).toBeInTheDocument();
  });

  it('is brand green and sized from the icon scale', () => {
    render(<Spinner size="lg" />);
    expect(screen.getByRole('status', { name: 'Loading' })).toHaveClass('text-primary', 'size-(--icon-2xl)');
  });
});
