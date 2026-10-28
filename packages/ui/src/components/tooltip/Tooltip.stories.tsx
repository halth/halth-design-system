import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button';
import { InfoIcon, PencilIcon } from '../icons';
import { Tooltip, TooltipTrigger } from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: {
    content: 'Edit details',
    children: (
      <Button variant="ghost" size="sm" isIconOnly aria-label="Edit details">
        <PencilIcon className="size-(--icon-md)" />
      </Button>
    ),
  },
  argTypes: { placement: { control: 'inline-radio', options: ['top', 'bottom', 'left', 'right'] } },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** On an icon-only button. Hover or tab to it. */
export const OnButton: Story = {};

/** On content that isn't a button, wrapped in `TooltipTrigger` so keyboard users can reach it. */
export const OnContent: Story = {
  args: {
    content: 'Medicare rebate applies to this service',
    children: (
      <TooltipTrigger role="img" aria-label="Medicare rebate applies to this service" className="text-primary">
        <InfoIcon className="size-(--icon-lg)" />
      </TooltipTrigger>
    ),
  },
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="flex items-center gap-6">
      <Tooltip content="Edit details">{meta.args.children}</Tooltip>
      <Tooltip content="Medicare rebate applies to this service">{OnContent.args?.children}</Tooltip>
    </div>
  ),
};
