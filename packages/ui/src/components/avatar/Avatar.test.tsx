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

  it('shows initials in regular weight at every size', () => {
    const { container, rerender } = render(<Avatar name="Jordan Lee" size="xl" />);
    expect(container.firstElementChild).toHaveClass('font-normal');
    expect(screen.getByText('JL')).toHaveClass('[font-weight:inherit]');
    rerender(<Avatar name="Jordan Lee" size="xs" />);
    expect(container.firstElementChild).toHaveClass('font-normal');
  });

  it('is always a rounded square', () => {
    const { container, rerender } = render(<Avatar name="Jordan Lee" />);
    expect(container.firstElementChild).toHaveClass('rounded-tile', 'size-14');
    rerender(<Avatar name="Jordan Lee" size="xs" />);
    expect(container.firstElementChild).toHaveClass('rounded-tile', 'size-8');
    expect(container.firstElementChild).not.toHaveClass('rounded-full');
  });

  it('has no border or hover state unless it is selectable', () => {
    const { container } = render(<Avatar name="Jordan Lee" />);
    expect(container.firstElementChild).not.toHaveClass('border-2');
    expect(screen.getByText('JL')).toHaveClass('bg-primary-200');
  });

  it('shows a brand border when selected', () => {
    const { container } = render(<Avatar name="Jordan Lee" isSelected />);
    expect(container.firstElementChild).toHaveClass('border-2', 'border-primary');
    expect(screen.getByText('JL')).toHaveClass('bg-primary-100');
  });

  it('shows a grey fallback that darkens on hover when not selected', () => {
    const { container } = render(<Avatar name="Jordan Lee" isSelected={false} />);
    expect(container.firstElementChild).toHaveClass('border-2', 'border-transparent', 'bg-transparent');
    expect(screen.getByText('JL')).toHaveClass('bg-stone-50', 'group-hover:bg-stone-100');
  });
});
