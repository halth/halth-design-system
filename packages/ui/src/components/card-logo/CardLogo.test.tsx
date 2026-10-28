import { fireEvent, render, screen } from '@testing-library/react';

import { CardLogo } from './CardLogo';

describe('CardLogo', () => {
  it.each([
    ['payment_method', 'visa', 'https://static.halth.com/assets/logo/payment-card/visa.png'],
    ['health_fund_card', 'BUPA', 'https://static.halth.com/assets/logo/health-fund-card/BUPA.png'],
    ['medicare_card', undefined, 'https://static.halth.com/assets/logo/gov/medicare-logo.svg'],
  ] as const)('loads the %s logo', (type, brand, src) => {
    render(<CardLogo type={type} brand={brand} alt="Logo" />);
    expect(screen.getByRole('img', { name: 'Logo' })).toHaveAttribute('src', src);
  });

  it('loads any image passed as src', () => {
    render(<CardLogo type="payment_method" brand="visa" src="https://example.com/logo.png" alt="Logo" />);
    expect(screen.getByRole('img', { name: 'Logo' })).toHaveAttribute('src', 'https://example.com/logo.png');
  });

  it('loads logos from a custom baseUrl', () => {
    render(<CardLogo type="payment_method" brand="visa" baseUrl="https://cdn.example.com/logo" alt="Logo" />);
    expect(screen.getByRole('img', { name: 'Logo' })).toHaveAttribute(
      'src',
      'https://cdn.example.com/logo/payment-card/visa.png',
    );
  });

  it('falls back to a card icon when the logo fails to load', () => {
    const { container } = render(<CardLogo type="payment_method" brand="nope" alt="Logo" />);
    fireEvent.error(screen.getByRole('img', { name: 'Logo' }));
    expect(screen.queryByRole('img', { name: 'Logo' })).not.toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('shows the fallback when there is no brand', () => {
    const { container } = render(<CardLogo type="health_fund_card" />);
    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
