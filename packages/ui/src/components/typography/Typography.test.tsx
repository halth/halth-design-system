import { render, screen } from '@testing-library/react';

import { Typography, typographyVariants } from './Typography';

describe('Typography', () => {
  it('renders a body paragraph by default', () => {
    render(<Typography>Booking confirmed</Typography>);
    const text = screen.getByText('Booking confirmed');
    expect(text.tagName).toBe('P');
    expect(text).toHaveClass('text-body', 'text-foreground');
  });

  it('renders the element given in `as`', () => {
    render(
      <Typography as="h2" variant="h3">
        Upcoming bookings
      </Typography>
    );
    expect(screen.getByRole('heading', { level: 2, name: 'Upcoming bookings' })).toHaveClass('text-h3');
  });

  it('lets a weight override the variant’s own (h3/h4 are semibold from the token)', () => {
    render(
      <>
        <Typography variant="h3">Default</Typography>
        <Typography variant="h3" weight="medium">
          Medium
        </Typography>
      </>
    );
    expect(screen.getByText('Default')).toHaveClass('text-h3');
    expect(screen.getByText('Default')).not.toHaveClass('font-medium');
    expect(screen.getByText('Medium')).toHaveClass('font-medium');
    expect(screen.getByText('Medium')).not.toHaveClass('font-semibold');
  });

  it('maps tones to token colours', () => {
    render(
      <>
        <Typography tone="mutedGray">Muted</Typography>
        <Typography tone="brand">Brand</Typography>
        <Typography tone="danger">Danger</Typography>
      </>
    );
    expect(screen.getByText('Muted')).toHaveClass('text-muted-foreground');
    expect(screen.getByText('Brand')).toHaveClass('text-primary');
    expect(screen.getByText('Danger')).toHaveClass('text-danger');
  });

  it('rejects unknown tones at compile time', () => {
    // @ts-expect-error `secondary` is not a tone
    render(<Typography tone="secondary">Typo</Typography>);
  });

  it('exposes the classes for non-React use', () => {
    expect(typographyVariants({ variant: 'caption', tone: 'brand', align: 'center' })).toBe(
      'text-caption text-primary text-center'
    );
  });
});
