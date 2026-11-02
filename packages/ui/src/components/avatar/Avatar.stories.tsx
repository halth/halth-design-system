import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Typography } from '../typography';
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
          'HeroUI v3 `Avatar` with HaltH sizes. Always a rounded square; shows initials from `name` when there is no image. Set `isSelected` to use it as a picker option.',
      },
    },
  },
  args: { name: 'Jordan Lee' },
  argTypes: {
    size: { control: 'select', options: sizes },
    isSelected: { control: 'boolean' },
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

export const Selected: Story = { args: { size: 'lg', isSelected: true } };
export const Unselected: Story = { args: { size: 'lg', isSelected: false } };

const PROVIDERS = [
  { id: 'any', name: 'Next available', fallback: 'Any' },
  { id: 'jordan', name: 'Jordan Lee' },
  { id: 'sam', name: 'Sam Patel', src: PHOTO },
];

/** A provider picker: each option is a `group` with a stretched button, so hovering the name highlights the avatar too. */
export const ProviderPicker: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState('any');
    return (
      <div className="flex gap-3">
        {PROVIDERS.map((provider) => {
          const isSelected = provider.id === selectedId;
          return (
            <div key={provider.id} className="group relative flex w-20 flex-col items-center gap-2">
              <Avatar
                size="lg"
                name={provider.name}
                src={provider.src}
                fallback={provider.fallback}
                isSelected={isSelected}
              />
              <Typography
                variant="caption"
                weight={isSelected ? 'medium' : 'regular'}
                tone={isSelected ? 'brand' : 'mutedGray'}
                align="center"
              >
                {provider.name}
              </Typography>
              <button
                type="button"
                aria-pressed={isSelected}
                aria-label={provider.name}
                onClick={() => setSelectedId(provider.id)}
                className="absolute inset-0 cursor-pointer rounded-tile focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          );
        })}
      </div>
    );
  },
};
