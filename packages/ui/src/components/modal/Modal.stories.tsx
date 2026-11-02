import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button';
import { Typography } from '../typography';
import { Modal, type ModalProps } from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'HeroUI v3 `Modal`. A bottom sheet on mobile, centred from `sm` up. Compose with `Modal.Header`, `Modal.Body` and `Modal.Footer`.',
      },
    },
  },
  args: { isOpen: false, onOpenChange: () => {}, children: null, size: 'md' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', '2xl'] },
    backdrop: { control: 'select', options: ['blur', 'opaque'] },
    scroll: { control: 'select', options: ['inside', 'outside'] },
    isOpen: { table: { disable: true } },
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo({
  label = 'Cancel booking',
  isDefaultOpen = false,
  ...args
}: Partial<ModalProps> & { label?: string; isDefaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);
  return (
    <>
      <Button onPress={() => setIsOpen(true)}>{label}</Button>
      <Modal {...args} isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Header>Cancel booking?</Modal.Header>
        <Modal.Body>
          <Typography>
            Jordan Lee’s initial consult on Tue 14 Oct at 9:30 AM will be cancelled and Jordan will
            be notified by email.
          </Typography>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onPress={() => setIsOpen(false)}>
            Keep booking
          </Button>
          <Button variant="danger" onPress={() => setIsOpen(false)}>
            Cancel booking
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export const Default: Story = { render: (args) => <Demo size={args.size} backdrop={args.backdrop} /> };

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(['sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <Demo key={size} size={size} label={`Open ${size}`} />
      ))}
    </div>
  ),
};

/** Below `sm` the modal is a bottom sheet, within reach of a thumb. Left off the Docs page because it opens over it. */
export const Mobile: Story = {
  render: () => <Demo isDefaultOpen />,
  globals: { viewport: { value: 'mobile', isRotated: false } },
  tags: ['!autodocs'],
};

export const OpaqueBackdrop: Story = { render: () => <Demo backdrop="opaque" label="Open opaque" /> };

export const ScrollInside: Story = {
  render: function ScrollInside() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onPress={() => setIsOpen(true)}>View terms</Button>
        <Modal isOpen={isOpen} onOpenChange={setIsOpen} size="lg" className="max-h-[80vh]">
          <Modal.Header>Cancellation policy</Modal.Header>
          <Modal.Body className="overflow-y-auto">
            {Array.from({ length: 12 }, (_, index) => (
              <Typography key={index} variant="bodySmall" className="mb-3">
                Bookings cancelled less than 24 hours before the appointment may be charged the
                full fee. Clinics can waive the fee from the booking screen.
              </Typography>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={() => setIsOpen(false)}>Got it</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};
