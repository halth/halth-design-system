import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tabs } from './Tabs';

const renderTabs = (props: Partial<React.ComponentProps<typeof Tabs>> = {}) =>
  render(
    <Tabs {...props}>
      <Tabs.List aria-label="Bookings">
        <Tabs.Tab id="upcoming">Upcoming</Tabs.Tab>
        <Tabs.Tab id="past">Past</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel id="upcoming">3 upcoming bookings</Tabs.Panel>
      <Tabs.Panel id="past">12 past bookings</Tabs.Panel>
    </Tabs>
  );

describe('Tabs', () => {
  it('shows the first panel by default', () => {
    renderTabs();
    expect(screen.getByRole('tab', { name: 'Upcoming' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('3 upcoming bookings');
  });

  it('switches panels on click', async () => {
    renderTabs();
    await userEvent.click(screen.getByRole('tab', { name: 'Past' }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent('12 past bookings');
  });

  it('moves between tabs with the arrow keys', async () => {
    renderTabs();
    await userEvent.click(screen.getByRole('tab', { name: 'Upcoming' }));
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Past' })).toHaveAttribute('aria-selected', 'true');
  });

  it('reports selection changes', async () => {
    const onSelectionChange = vi.fn();
    renderTabs({ onSelectionChange });
    await userEvent.click(screen.getByRole('tab', { name: 'Past' }));
    expect(onSelectionChange).toHaveBeenCalledWith('past');
  });

  it('uses the muted track when asked', () => {
    const { container } = renderTabs({ track: 'muted' });
    expect(container.querySelector('[data-slot="tabs"]')).toHaveClass('*:data-[slot=tabs-list-container]:bg-secondary');
  });

  it('spreads the tabs equally across a full-width track', () => {
    const { container } = renderTabs({ fullWidth: true });
    expect(container.querySelector('[data-slot="tabs"]')).toHaveClass('sm:**:data-[slot=tabs-tab]:flex-1');
  });
});
