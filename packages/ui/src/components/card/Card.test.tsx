import { createRef } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { Card, CardDescription, CardFooter, CardHeader, CardRow, CardTitle } from './Card';

describe('Card', () => {
  it('renders a padded rounded surface that stacks its children', () => {
    render(<Card data-testid="card">Body</Card>);
    expect(screen.getByTestId('card')).toHaveClass(
      'flex',
      'flex-col',
      'gap-4',
      'rounded-container',
      'bg-card',
      'p-4',
      'sm:p-5'
    );
  });

  it('outlines white cards that sit on white surfaces', () => {
    render(<Card data-testid="card" variant="outline" />);
    expect(screen.getByTestId('card')).toHaveClass('border', 'border-border', 'bg-card');
  });

  it('tints a pressable card on hover, keyboard focus and press', () => {
    render(<Card data-testid="card" onPress={() => {}} pressLabel="Open booking" />);
    expect(screen.getByTestId('card')).toHaveClass(
      '[@media(hover:hover)]:hover:bg-primary-75',
      'has-[>[data-card-press]:focus-visible]:bg-primary-75',
      'active:!bg-primary-50'
    );
    expect(screen.getByRole('button', { name: 'Open booking' })).toHaveClass(
      'focus-visible:ring-2',
      'focus-visible:ring-ring'
    );
  });

  it('makes the whole card pressable without blocking the buttons inside', () => {
    const onPress = vi.fn();
    const onRemove = vi.fn();
    render(
      <Card onPress={onPress} pressLabel="Open booking">
        <CardRow title="Jordan Lee" endContent={<button onClick={onRemove}>Remove</button>} />
      </Card>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open booking' }));
    expect(onPress).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('forwards refs', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Card ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders the section parts without their own padding', () => {
    render(
      <Card>
        <CardHeader data-testid="header">
          <CardTitle>Client profile</CardTitle>
          <CardDescription>Contact details</CardDescription>
        </CardHeader>
        <CardFooter data-testid="footer">Footer</CardFooter>
      </Card>
    );
    expect(screen.getByRole('heading', { level: 3, name: 'Client profile' })).toBeInTheDocument();
    expect(screen.getByText('Contact details')).toHaveClass('text-muted-foreground');
    for (const id of ['header', 'footer']) {
      expect(screen.getByTestId(id).className).not.toMatch(/\bp[xyt]?-\d/);
    }
    expect(screen.getByTestId('footer')).toHaveClass('justify-end');
  });

  it('lays out a row with an avatar, title, details and one end item', () => {
    render(
      <Card>
        <CardRow
          startContent={<span data-testid="avatar" />}
          title="Maggie Summer"
          details={['Client since 16 Oct 2026']}
          endContent={<button>Checkout</button>}
        />
      </Card>
    );
    expect(screen.getByRole('heading', { level: 3, name: 'Maggie Summer' })).toHaveClass('truncate');
    expect(screen.getByText('Client since 16 Oct 2026')).toHaveClass('text-muted-foreground');
    expect(screen.getByTestId('avatar').parentElement).toHaveClass('*:size-16', 'sm:*:size-22');
    expect(screen.getByRole('button', { name: 'Checkout' })).toBeInTheDocument();
  });

  it('shows a chevron only on pressable cards with no end item', () => {
    const { container } = render(
      <Card>
        <CardRow title="Your booking link" />
      </Card>
    );
    expect(container.querySelector('svg')).toHaveClass('hidden', 'group-data-[pressable]/card:block');
  });

  it('puts one header action beside the title', () => {
    render(
      <Card>
        <CardHeader endContent={<button>Member actions</button>}>
          <CardTitle>Owner details</CardTitle>
        </CardHeader>
      </Card>
    );
    const heading = screen.getByRole('heading', { name: 'Owner details' });
    const action = screen.getByRole('button', { name: 'Member actions' });
    expect(heading.parentElement?.parentElement).toBe(action.parentElement?.parentElement);
  });
});
