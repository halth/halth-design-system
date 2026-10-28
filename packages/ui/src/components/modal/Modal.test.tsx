import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Modal } from './Modal';

const renderModal = (props: Partial<React.ComponentProps<typeof Modal>> = {}) => {
  const onOpenChange = vi.fn();
  render(
    <Modal isOpen onOpenChange={onOpenChange} {...props}>
      <Modal.Header>Cancel booking</Modal.Header>
      <Modal.Body>Jordan will be notified.</Modal.Body>
      <Modal.Footer>
        <button type="button">Confirm</button>
      </Modal.Footer>
    </Modal>
  );
  return { onOpenChange };
};

describe('Modal', () => {
  it('renders a labelled dialog with header, body and footer', () => {
    renderModal();
    expect(screen.getByRole('dialog', { name: 'Cancel booking' })).toBeInTheDocument();
    expect(screen.getByText('Jordan will be notified.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  it('closes from the header close button', async () => {
    const { onOpenChange } = renderModal();
    const close = screen.getByRole('button', { name: 'Close' });
    await userEvent.click(close);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('renders nothing when closed', () => {
    renderModal({ isOpen: false });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('applies HaltH sizes beyond HeroUI’s', () => {
    renderModal({ size: '2xl' });
    expect(screen.getByRole('dialog')).toHaveClass('max-w-2xl');
  });
});
