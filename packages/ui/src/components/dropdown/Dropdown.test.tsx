import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Dropdown } from './Dropdown';

describe('Dropdown', () => {
  it('shows the placeholder when there is no value', () => {
    render(<Dropdown placeholder="Select a service" isOpen={false} onClick={() => {}} />);
    expect(screen.getByText('Select a service')).toHaveClass('text-muted-foreground');
  });

  it('shows the value and reports open state', () => {
    render(<Dropdown value="Massage" placeholder="Select" isOpen onClick={() => {}} />);
    expect(screen.getByText('Massage')).toHaveClass('text-foreground');
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('marks invalid state with a destructive border', async () => {
    const onClick = vi.fn();
    render(<Dropdown isOpen={false} isInvalid onClick={onClick} testId="trigger" />);
    const button = screen.getByTestId('trigger');
    expect(button).toHaveClass('border-destructive');
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });
});
