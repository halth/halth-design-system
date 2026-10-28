import { render, screen } from '@testing-library/react';

import { Alert } from './Alert';

describe('Alert', () => {
  it('shows the title, description and action', () => {
    render(
      <Alert
        title="Payments not set up"
        description="Set up payments to take card payments at checkout."
        action={<button>Set up payments</button>}
      />
    );
    expect(screen.getByText('Payments not set up')).toBeInTheDocument();
    expect(screen.getByText('Set up payments to take card payments at checkout.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Set up payments' })).toBeInTheDocument();
  });

  it.each([
    ['info', 'bg-primary-100'],
    ['success', 'bg-success-100'],
    ['warning', 'text-sun-800'],
    ['danger', 'text-destructive'],
  ] as const)('uses the %s tint', (tone, className) => {
    const { container } = render(<Alert tone={tone} title="Claim locked" />);
    expect(container.firstElementChild).toHaveClass('rounded-container', className);
  });
});
