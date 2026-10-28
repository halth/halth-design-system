import { render, screen } from '@testing-library/react';

import { Chip } from './Chip';

describe('Chip', () => {
  it('renders a neutral pill by default', () => {
    render(<Chip>Draft</Chip>);
    expect(screen.getByText('Draft').closest('[data-slot="chip"]')).toHaveClass(
      'rounded-pill',
      'border-border'
    );
  });

  it.each([
    ['success', '[--chip-bg:var(--color-success-100)]'],
    ['warning', '[--chip-bg:var(--color-sun-100)]'],
    ['brand', '[--chip-bg:var(--color-primary-100)]'],
  ] as const)('applies the %s tone', (tone, className) => {
    render(<Chip tone={tone}>Status</Chip>);
    expect(screen.getByText('Status').closest('[data-slot="chip"]')).toHaveClass(className);
  });

  it('renders an icon before the label', () => {
    render(<Chip icon={<svg data-testid="icon" />}>Paid</Chip>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders an end icon after the label', () => {
    render(
      <Chip tone="warning" endIcon={<svg data-testid="end-icon" />}>
        Awaiting payment
      </Chip>
    );
    const chip = screen.getByText('Awaiting payment').closest('[data-slot="chip"]');
    expect(chip?.lastElementChild).toBe(screen.getByTestId('end-icon'));
  });
});
