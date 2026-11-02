import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Dropdown } from './Dropdown';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Select-style field trigger. Import from `@halth/design-system/dropdown`; requires `framer-motion`.',
      },
    },
  },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
  args: { placeholder: 'Select a service', isOpen: false, onClick: fn() },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {};

export const WithValue: Story = { args: { value: 'Remedial massage — 60 min' } };

export const Invalid: Story = { args: { isInvalid: true } };

export const Interactive: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return <Dropdown {...args} isOpen={isOpen} onClick={() => setIsOpen((open) => !open)} />;
  },
};
