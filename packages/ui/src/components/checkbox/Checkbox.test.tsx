import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('toggles from its label', async () => {
    const onChange = vi.fn();
    render(<Checkbox onChange={onChange}>Send a reminder 24 hours before</Checkbox>);
    await userEvent.click(screen.getByText('Send a reminder 24 hours before'));
    expect(onChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('checkbox', { name: 'Send a reminder 24 hours before' })).toBeChecked();
  });

  it('describes itself with its help text', () => {
    render(<Checkbox description="Clients get an SMS and an email.">Send reminders</Checkbox>);
    expect(screen.getByRole('checkbox', { name: 'Send reminders' })).toHaveAccessibleDescription(
      'Clients get an SMS and an email.'
    );
  });

  it('shows the error while invalid', () => {
    render(
      <Checkbox isInvalid errorMessage="Accept the terms to continue.">
        I accept the terms
      </Checkbox>
    );
    expect(screen.getByText('Accept the terms to continue.')).toBeInTheDocument();
  });
});
