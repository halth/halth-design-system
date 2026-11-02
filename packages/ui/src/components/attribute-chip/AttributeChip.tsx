import type { ReactNode } from 'react';

import { cn } from '../../lib/cn';
import { Button } from '../button';
import { Tooltip, TooltipTrigger } from '../tooltip/Tooltip';

const CHIP_CLASS =
  'flex h-7 w-14 min-w-14 items-center justify-center rounded-container border border-border px-0 text-primary [&_svg]:size-(--icon-sm)!';

export interface AttributeChipProps {
  /** Tooltip text and accessible name, e.g. "Payment method" or "Missing card details". */
  label: string;
  /** A `CardLogo` or an icon from `@halth/design-system/icons`. */
  children: ReactNode;
  /** Makes the chip a button, e.g. to open the payment method or add a card. */
  onPress?: () => void;
  className?: string;
}

/**
 * Fixed-size logo pill with a tooltip, as in the `BookingCard` attribute row:
 * payment card, health fund, Medicare, funding available and add card.
 */
export function AttributeChip({ label, children, onPress, className }: AttributeChipProps) {
  return (
    <Tooltip content={label}>
      {onPress ? (
        <Button
          variant="ghost"
          size="xs"
          aria-label={label}
          onPress={onPress}
          className={cn(
            CHIP_CLASS,
            '[--button-bg:var(--card)] [--button-bg-hover:var(--color-primary-50)]',
            className
          )}
        >
          {children}
        </Button>
      ) : (
        <TooltipTrigger role="img" aria-label={label} className={cn(CHIP_CLASS, 'bg-card', className)}>
          {children}
        </TooltipTrigger>
      )}
    </Tooltip>
  );
}
