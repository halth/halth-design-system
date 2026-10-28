import type { Meta, StoryObj } from '@storybook/react-vite';

import { CheckIcon, ClockIcon } from '../icons';
import { Chip } from './Chip';

const warningContrastException = {
  a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
};

const tones = ['neutral', 'brand', 'success', 'danger', 'warning'] as const;

const meta = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: 'HeroUI v3 `Chip` as the HaltH status pill.' } },
  },
  args: { children: 'Confirmed' },
  argTypes: {
    tone: { control: 'select', options: tones },
    size: { control: 'select', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = { args: { tone: 'neutral', children: 'Draft' } };
export const Brand: Story = { args: { tone: 'brand', children: 'Member' } };
export const Success: Story = { args: { tone: 'success', children: 'Paid', icon: <CheckIcon strokeWidth={3} /> } };
export const Danger: Story = { args: { tone: 'danger', children: 'Did not arrive' } };
export const Warning: Story = {
  args: { tone: 'warning', children: 'Awaiting payment', endIcon: <ClockIcon /> },
  parameters: warningContrastException,
};

export const AllTones: Story = {
  name: 'All tones',
  parameters: warningContrastException,
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {tones.map((tone) => (
        <Chip key={tone} {...args} tone={tone}>
          {tone}
        </Chip>
      ))}
    </div>
  ),
};
