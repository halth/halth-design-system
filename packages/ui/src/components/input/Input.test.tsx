import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from './Input';

describe('Input', () => {
  it('labels and describes the field', async () => {
    const onChange = vi.fn();
    render(<Input label="Email" type="email" description="We send receipts here." onChange={onChange} />);
    const field = screen.getByRole('textbox', { name: 'Email' });
    expect(field).toHaveAttribute('type', 'email');
    expect(field).toHaveAccessibleDescription('We send receipts here.');
    expect(field).toHaveClass('h-10', 'text-body');
    await userEvent.type(field, 'a');
    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('shows the error instead of the description while invalid', () => {
    render(<Input label="Phone" isInvalid errorMessage="Enter a mobile number." />);
    expect(screen.getByRole('textbox', { name: 'Phone' })).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Enter a mobile number.')).toBeInTheDocument();
  });

  it('puts start content before the text', () => {
    render(<Input label="Price" startContent="$" />);
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Price' })).toBeInTheDocument();
  });

  it('is a search field with a clear button for type="search"', async () => {
    const onClear = vi.fn();
    render(<Input type="search" aria-label="Search clients" defaultValue="Jordan" onClear={onClear} />);
    expect(screen.getByRole('searchbox', { name: 'Search clients' })).toHaveValue('Jordan');
    await userEvent.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('searchbox', { name: 'Search clients' })).toHaveValue('');
  });
});
