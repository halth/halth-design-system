import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '../button';
import { Tooltip, TooltipTrigger } from './Tooltip';

describe('Tooltip', () => {
  it('opens on keyboard focus of a button', async () => {
    render(
      <Tooltip content="Payment method" delay={0}>
        <Button aria-label="Visa ending 4242">Visa</Button>
      </Tooltip>
    );
    await userEvent.tab();
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Payment method');
  });

  it('makes content that is not a button focusable', () => {
    render(
      <Tooltip content="Health fund">
        <TooltipTrigger role="img" aria-label="Health fund">
          HCF
        </TooltipTrigger>
      </Tooltip>
    );
    expect(screen.getByRole('img', { name: 'Health fund' })).toHaveAttribute('tabindex', '0');
  });
});
