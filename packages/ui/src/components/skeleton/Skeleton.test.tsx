import { render } from '@testing-library/react';

import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('is a hidden grey pill by default', () => {
    const { container } = render(<Skeleton className="h-4 w-24" />);
    const bar = container.firstElementChild;
    expect(bar).toHaveAttribute('aria-hidden', 'true');
    expect(bar).toHaveClass('rounded-pill', 'bg-secondary', 'h-4', 'w-24');
  });

  it('uses the avatar tile shape', () => {
    const { container } = render(<Skeleton shape="tile" className="size-16" />);
    expect(container.firstElementChild).toHaveClass('rounded-tile');
  });
});
