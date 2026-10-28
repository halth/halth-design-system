import type { Meta, StoryObj } from '@storybook/react-vite';

import { Typography } from './Typography';

const variants = ['h1', 'h2', 'h3', 'h4', 'subtitle', 'body', 'bodySmall', 'caption'] as const;
const tones = ['default', 'mutedGray', 'brand', 'secondaryBrand', 'success', 'danger', 'warning'] as const;

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The one HaltH text component. Use it for every heading, paragraph and label instead of raw `<h1>`/`<p>`. `variant` sets the scale, `tone` the colour and `as` the element.',
      },
    },
  },
  args: { children: 'Your next booking is with Dr Sam Patel at 9:30 AM.' },
  argTypes: {
    variant: { control: 'select', options: variants },
    tone: { control: 'select', options: tones },
    weight: { control: 'select', options: ['light', 'regular', 'medium', 'semibold', 'bold'] },
    align: { control: 'select', options: ['left', 'center', 'right'] },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = { args: { variant: 'h1', as: 'h1', children: 'Good morning, Jordan' } };
export const H2: Story = { args: { variant: 'h2', as: 'h2', children: 'Today’s bookings' } };
export const H3: Story = { args: { variant: 'h3', as: 'h3', children: 'Client profile' } };
export const H4: Story = { args: { variant: 'h4', as: 'h4', children: 'Payment details' } };
export const Subtitle: Story = { args: { variant: 'subtitle', children: 'Northside Physio · Fitzroy' } };
export const Body: Story = { args: { variant: 'body' } };
export const BodySmall: Story = { args: { variant: 'bodySmall', tone: 'mutedGray' } };
export const Caption: Story = { args: { variant: 'caption', tone: 'mutedGray', children: 'Updated 2 minutes ago' } };

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="flex flex-col gap-3">
      {variants.map((variant) => (
        <div key={variant} className="flex items-baseline gap-6">
          <code className="w-24 shrink-0 text-xs text-muted-foreground">{variant}</code>
          <Typography variant={variant}>Remedial massage · 60 min</Typography>
        </div>
      ))}
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {tones.map((tone) => (
        <Typography key={tone} tone={tone} weight="medium">
          {tone}: Payment received
        </Typography>
      ))}
    </div>
  ),
};
