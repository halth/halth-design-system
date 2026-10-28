import { render, screen } from '@testing-library/react';

import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('centres its icon, title, reason and action', () => {
    render(
      <EmptyState
        icon={<svg data-testid="icon" />}
        title="Payments not set up"
        description="Set up payments to view your payouts."
        action={<button>Set up payments</button>}
      />
    );
    expect(screen.getByRole('heading', { level: 3, name: 'Payments not set up' })).toHaveClass('text-center');
    expect(screen.getByTestId('icon').parentElement).toHaveClass('bg-primary-200', 'rounded-tile');
    expect(screen.getByRole('button', { name: 'Set up payments' })).toBeInTheDocument();
  });

  it('is smaller when compact', () => {
    render(<EmptyState isCompact icon={<svg data-testid="icon" />} title="No clients found" description="Try another name." />);
    expect(screen.getByTestId('icon').parentElement).toHaveClass('size-12');
    expect(screen.getByRole('heading', { name: 'No clients found' })).toHaveClass('text-subtitle');
  });
});
