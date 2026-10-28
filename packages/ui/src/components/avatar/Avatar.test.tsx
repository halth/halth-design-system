import { render, screen } from '@testing-library/react';

import { Avatar, getInitials } from './Avatar';

describe('getInitials', () => {
  it.each([
    ['Jordan Lee', 'JL'],
    ['sam', 'S'],
    ['Alex Mary Chen', 'AC'],
    ['  ', ''],
    [undefined, ''],
  ])('%s → %s', (name, initials) => {
    expect(getInitials(name)).toBe(initials);
  });
});

describe('Avatar', () => {
  it('shows initials when there is no image', () => {
    render(<Avatar name="Jordan Lee" />);
    expect(screen.getByText('JL')).toBeInTheDocument();
  });

  it('shows a custom fallback instead of initials', () => {
    render(<Avatar name="Northside Physio" fallback={<span>logo</span>} />);
    expect(screen.getByText('logo')).toBeInTheDocument();
    expect(screen.queryByText('NP')).not.toBeInTheDocument();
  });

  it('is always a rounded square', () => {
    const { container, rerender } = render(<Avatar name="Jordan Lee" />);
    expect(container.firstElementChild).toHaveClass('rounded-tile', 'size-14');
    rerender(<Avatar name="Jordan Lee" size="xs" />);
    expect(container.firstElementChild).toHaveClass('rounded-tile', 'size-8');
    expect(container.firstElementChild).not.toHaveClass('rounded-full');
  });
});
