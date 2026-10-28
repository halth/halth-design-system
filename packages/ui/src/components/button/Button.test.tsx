import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button, buttonVariants } from './Button';

describe('Button', () => {
  it('renders a non-submitting button by default', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('type', 'button');
  });

  it('calls onPress', async () => {
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Save</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledOnce();
  });

  it('allows submit buttons', () => {
    render(<Button type="submit">Save</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('does not call onPress when disabled', async () => {
    const onPress = vi.fn();
    render(
      <Button isDisabled onPress={onPress}>
        Save
      </Button>
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows a spinner while pending', () => {
    render(<Button isPending>Save</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-pending', 'true');
    expect(button.querySelector('[data-slot="spinner"]')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('hides children of an icon-only button while pending', () => {
    render(
      <Button isIconOnly isPending aria-label="Add">
        <span>plus</span>
      </Button>
    );
    expect(screen.queryByText('plus')).not.toBeInTheDocument();
  });

  it('sizes icon-only buttons as squares', () => {
    render(
      <Button isIconOnly size="lg" aria-label="Add">
        +
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('button--icon-only', 'h-11', 'w-11');
  });

  it.each([
    ['default', 'button--primary'],
    ['secondary', 'button--tertiary'],
    ['outline', 'button--outline'],
    ['ghost', 'button--ghost'],
    ['light', 'button--ghost'],
    ['danger', 'button--danger'],
    ['link', 'button--ghost'],
  ] as const)('maps the %s variant onto HeroUI %s', (variant, heroClass) => {
    render(<Button variant={variant}>Save</Button>);
    expect(screen.getByRole('button')).toHaveClass('button', heroClass, 'rounded-pill');
  });

  it('does not shrink on press', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button')).toHaveClass(
      'active:transform-none',
      'data-[pressed=true]:transform-none'
    );
  });

  it('lets className override HaltH styles', () => {
    render(<Button className="h-12 px-0">Save</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-12', 'px-0');
    expect(button).not.toHaveClass('h-10', 'px-4');
  });
});

describe('buttonVariants', () => {
  it('styles a link as a button', () => {
    render(
      <a href="/bookings" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
        Bookings
      </a>
    );
    expect(screen.getByRole('link', { name: 'Bookings' })).toHaveClass(
      'button',
      'button--outline',
      'button--sm',
      'rounded-pill',
      'border-primary',
      'h-9'
    );
  });
});
