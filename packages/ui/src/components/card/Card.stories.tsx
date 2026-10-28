import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';

import { Avatar } from '../avatar';
import { Button } from '../button';
import { ChevronRightIcon, EllipsisVerticalIcon, XIcon } from '../icons';
import { Typography } from '../typography';
import { Card, CardDescription, CardFooter, CardHeader, CardRow, CardTitle } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['white', 'outline'] },
  },
  decorators: [
    (Story) => (
      <div className="min-h-64 bg-stone-100 p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

/** Business and member account settings: a title and a short explanation. */
export const Default: Story = {
  args: {
    className: 'max-w-xl',
    children: (
      <CardHeader>
        <CardTitle>Manage your account</CardTitle>
        <CardDescription>
          At HaltH, we care about your privacy and data security. Your personal information is
          protected with industry-standard encryption and we never share your data without your
          explicit consent.
        </CardDescription>
        <CardDescription>Account created: 12 March 2025</CardDescription>
      </CardHeader>
    ),
  },
};

/** Account settings: a title, an explanation and the action in the footer. */
export const WithFooter: Story = {
  args: {
    className: 'max-w-xl',
    children: (
      <>
        <CardHeader>
          <CardTitle>Delete your account</CardTitle>
          <CardDescription>
            This action will delete your account and your account will not be accessible.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="danger">Delete account</Button>
        </CardFooter>
      </>
    ),
  },
};

/** Team member and provider panels: a menu in the corner. */
export const WithHeaderAction: Story = {
  args: {
    className: 'max-w-xl',
    children: (
      <CardHeader
        endContent={
          <Button variant="ghost" size="sm" isIconOnly aria-label="Member actions">
            <EllipsisVerticalIcon className="size-4" />
          </Button>
        }
      >
        <CardTitle>Owner details</CardTitle>
        <CardDescription>Priya Shah · priya@northsidephysio.com.au</CardDescription>
      </CardHeader>
    ),
  },
};

/** A business client profile header. */
export const Row: Story = {
  args: {
    className: 'max-w-xl',
    children: (
      <CardRow
        startContent={<Avatar name="Maggie Summer" />}
        title="Maggie Summer"
        details={['Client since 16 Oct 2026']}
        endContent={<Button>Checkout</Button>}
      />
    ),
  },
};

/** Member app home: an upcoming booking. Pressable rows end with a chevron. */
export const Pressable: Story = {
  args: {
    className: 'max-w-md',
    onPress: noop,
    pressLabel: 'Open booking with Medicare Physiotherapy',
    children: (
      <CardRow
        startContent={<Avatar name="Medicare Physiotherapy" />}
        title="Medicare Physiotherapy"
        details={['Thu 22 Oct, 9:30 AM']}
      />
    ),
  },
};

/** On a white surface, such as a modal or panel. */
export const Outline: Story = {
  args: {
    variant: 'outline',
    onPress: noop,
    pressLabel: 'Choose Pierre Fauchard',
    children: <CardRow startContent={<Avatar name="Pierre Fauchard" />} title="Pierre Fauchard" />,
  },
  decorators: [
    (Story) => (
      <div className="-m-6 min-h-64 bg-card p-6">
        <div className="max-w-md">
          <Story />
        </div>
      </div>
    ),
  ],
};

const STATES = [
  { label: 'Default', className: '' },
  { label: 'Hover', className: 'bg-primary-75' },
  { label: 'Focus (keyboard)', className: 'bg-primary-75 ring-2 ring-ring ring-inset' },
  { label: 'Pressed', className: 'bg-primary-50' },
];

function StatesExample() {
  return (
    <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
      {(['white', 'outline'] as const).map((variant) => (
        <div
          key={variant}
          className={variant === 'outline' ? 'flex flex-col gap-2 rounded-2xl bg-card p-5' : 'flex flex-col gap-2'}
        >
          {STATES.map((state) => (
            <div key={state.label} className="flex flex-col gap-1">
              <Typography variant="caption" tone={variant === 'outline' ? 'mutedGray' : 'secondaryBrand'}>
                {variant === 'outline' ? 'Outline' : 'White'} · {state.label}
              </Typography>
              <Card variant={variant} className={state.className}>
                <CardRow
                  startContent={<Avatar name="Jordan Lee" />}
                  title="Jordan Lee"
                  details={['Thu 22 Oct, 9:30 AM']}
                  endContent={<ChevronRightIcon className="size-6 text-primary" />}
                />
              </Card>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Pressable cards in each state, drawn statically. Hover, tab to or press the other stories to try them. */
export const States: Story = {
  render: () => <StatesExample />,
};

/** Checkout: who is paying, on the white checkout panel. People pick these, so they're `outline`. */
function CheckoutPayersExample() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Client and cover</CardTitle>
      </CardHeader>
      <div className="flex flex-col gap-2">
        <Card variant="outline" onPress={noop} pressLabel="Choose Pierre Fauchard">
          <CardRow startContent={<Avatar name="Pierre Fauchard" />} title="Pierre Fauchard" />
        </Card>
        <Card variant="outline">
          <CardRow
            startContent={<Avatar name="Linwood Halvorson" />}
            title="Linwood Halvorson"
            details={['Paying for this booking']}
            endContent={
              <Button variant="ghost" size="sm" isIconOnly aria-label="Remove Linwood Halvorson">
                <XIcon className="size-4" />
              </Button>
            }
          />
        </Card>
      </div>
    </Card>
  );
}

export const CheckoutPayers: Story = {
  name: 'Example: checkout',
  render: () => <CheckoutPayersExample />,
};

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <Typography as="h2" variant="subtitle" weight="medium">
        {title}
      </Typography>
      <div className="grid items-start gap-4 *:max-w-none! lg:grid-cols-2">{children}</div>
    </section>
  );
}

/** Every card above, grouped by layout. */
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="flex flex-col gap-10">
      <Group title="Sections">
        <Card {...Default.args} />
        <Card {...WithFooter.args} />
        <Card {...WithHeaderAction.args} />
      </Group>
      <Group title="Rows">
        <Card {...Row.args} />
        <Card {...Pressable.args} />
      </Group>
      <Group title="On white panels">
        <CheckoutPayersExample />
      </Group>
      <Group title="Pressable states">
        <div className="lg:col-span-2">
          <StatesExample />
        </div>
      </Group>
    </div>
  ),
};
