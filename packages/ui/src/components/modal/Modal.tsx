import type { ReactNode } from 'react';

import { Modal as HeroModal } from '@heroui/react';

import { cn } from '../../lib/cn';
import { Button } from '../button';
import { XIcon } from '../icons';
import { typographyVariants } from '../typography';

type HeroSize = 'sm' | 'md' | 'lg';

const SIZES = {
  sm: { hero: 'sm', className: '' },
  md: { hero: 'md', className: '' },
  lg: { hero: 'lg', className: '' },
  xl: { hero: 'lg', className: 'max-w-xl' },
  '2xl': { hero: 'lg', className: 'max-w-2xl' },
} satisfies Record<string, { hero: HeroSize; className: string }>;

export type ModalSize = keyof typeof SIZES;

export interface ModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  children: ReactNode;
  /** Max width on tablet and up; on mobile the modal is a full-width bottom sheet. Defaults to `md`. */
  size?: ModalSize;
  /** `inside` scrolls the body within the modal; `outside` scrolls the page. Defaults to `inside`. */
  scroll?: 'inside' | 'outside';
  /** Defaults to `blur`. */
  backdrop?: 'blur' | 'opaque';
  /** Close on outside click and Escape. Defaults to `true`. */
  isDismissable?: boolean;
  /** Render into this element instead of `document.body`, e.g. an embedded checkout. */
  container?: Element;
  className?: string;
}

function ModalRoot({
  isOpen,
  onOpenChange,
  children,
  size = 'md',
  scroll = 'inside',
  backdrop = 'blur',
  isDismissable = true,
  container,
  className,
}: ModalProps) {
  return (
    <HeroModal.Backdrop
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={!isDismissable}
      variant={backdrop}
      UNSTABLE_portalContainer={container}
    >
      <HeroModal.Container size={SIZES[size].hero} scroll={scroll} className="p-0 sm:p-10">
        <HeroModal.Dialog
          className={cn(
            'rounded-container rounded-b-none bg-background p-0 shadow-none sm:rounded-b-container',
            SIZES[size].className,
            className
          )}
        >
          {children}
        </HeroModal.Dialog>
      </HeroModal.Container>
    </HeroModal.Backdrop>
  );
}

export interface ModalHeaderProps {
  children: ReactNode;
  /** Shows the round close button. Defaults to `true`. */
  showClose?: boolean;
  /** Content under the title row, e.g. step progress. */
  bottomContent?: ReactNode;
  className?: string;
}

function ModalHeader({ children, showClose = true, bottomContent, className }: ModalHeaderProps) {
  return (
    <HeroModal.Header className={cn('gap-2 p-4', className)}>
      <div className="flex items-center gap-2">
        <HeroModal.Heading
          className={cn('flex-1', typographyVariants({ variant: 'h4', weight: 'regular', tone: 'brand' }))}
        >
          {children}
        </HeroModal.Heading>
        {showClose && (
          <Button slot="close" variant="light" size="sm" isIconOnly aria-label="Close">
            <XIcon className="size-(--icon-lg)" />
          </Button>
        )}
      </div>
      {bottomContent}
    </HeroModal.Header>
  );
}

function ModalBody({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <HeroModal.Body className={cn('m-0 p-4', typographyVariants({ variant: 'body', tone: 'default' }), className)}>
      {children}
    </HeroModal.Body>
  );
}

function ModalFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <HeroModal.Footer className={cn('flex justify-end gap-2 p-4', className)}>
      {children}
    </HeroModal.Footer>
  );
}

/**
 * The HaltH modal: HeroUI v3 `Modal`, a bottom sheet on mobile and centred
 * from `sm` up. Compose with `Modal.Header`, `Modal.Body` and `Modal.Footer`.
 */
export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});
