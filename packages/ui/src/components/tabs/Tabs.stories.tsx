import type { Meta, StoryObj } from '@storybook/react-vite';

import { Typography } from '../typography';
import { Tabs } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'HeroUI v3 `Tabs` as the HaltH pill segmented control. Compose with `Tabs.List`, `Tabs.Tab` and `Tabs.Panel`.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-48 bg-stone-100 p-6">
        <Story />
      </div>
    ),
  ],
  args: { children: null, track: 'white' },
  argTypes: {
    track: { control: 'select', options: ['white', 'muted'] },
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const tabs = [
  { id: 'today', label: 'Today', content: '6 bookings today, 2 awaiting payment.' },
  { id: 'upcoming', label: 'Upcoming', content: '18 bookings over the next 7 days.' },
  { id: 'past', label: 'Past', content: '342 completed bookings.' },
];

const render: Story['render'] = (args) => (
  <Tabs {...args}>
    <Tabs.List aria-label="Bookings">
      {tabs.map((tab) => (
        <Tabs.Tab key={tab.id} id={tab.id}>
          {tab.label}
        </Tabs.Tab>
      ))}
    </Tabs.List>
    {tabs.map((tab) => (
      <Tabs.Panel key={tab.id} id={tab.id}>
        <Typography tone="brand">{tab.content}</Typography>
      </Tabs.Panel>
    ))}
  </Tabs>
);

export const WhiteTrack: Story = { args: { track: 'white' }, render };
export const MutedTrack: Story = {
  args: { track: 'muted' },
  render,
  decorators: [
    (Story) => (
      <div className="-m-6 min-h-48 bg-white p-6">
        <Story />
      </div>
    ),
  ],
};
export const FullWidth: Story = { args: { fullWidth: true }, render };
export const DisabledTab: Story = {
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List aria-label="Payment method">
        <Tabs.Tab id="card">Card</Tabs.Tab>
        <Tabs.Tab id="fund">Health fund</Tabs.Tab>
        <Tabs.Tab id="medicare" isDisabled>
          Medicare
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel id="card">Pay with a saved card.</Tabs.Panel>
      <Tabs.Panel id="fund">Claim on the spot with a health fund.</Tabs.Panel>
      <Tabs.Panel id="medicare">Medicare claiming is coming soon.</Tabs.Panel>
    </Tabs>
  ),
};
