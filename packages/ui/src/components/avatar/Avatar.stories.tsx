import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from './Avatar';

const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-1/2" aria-hidden="true">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
  </svg>
);

const PHOTO =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88"><rect width="88" height="88" fill="%2392b6b4"/><circle cx="44" cy="34" r="16" fill="%23f5f8f7"/><rect x="18" y="56" width="52" height="40" rx="26" fill="%23f5f8f7"/></svg>';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'HeroUI v3 `Avatar` with HaltH sizes. Always a rounded square; shows initials from `name` when there is no image.',
      },
    },
  },
  args: { name: 'Jordan Lee' },
  argTypes: {
    size: { control: 'select', options: sizes },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {};
export const WithImage: Story = { args: { src: PHOTO } };
export const FallbackIcon: Story = { args: { name: 'Northside Physio', fallback: <BuildingIcon /> } };

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-3">
      {sizes.map((size) => (
        <Avatar key={size} {...args} size={size} />
      ))}
    </div>
  ),
};
