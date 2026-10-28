import * as React from 'react';

import { cn } from '../../lib/cn';
import { ChevronRightIcon } from '../icons';
import { Typography, typographyVariants } from '../typography';

/**
 * Shared hover, focus and press treatment for pressable cards, matching the business
 * calendar. Keyboard focus on the card's `[data-card-press]` button tints the card
 * like hover. Internal: `Card onPress` and `BookingCard` use it.
 */
export const INTERACTIVE_CARD_CLASS =
  'rounded-container bg-card transition-colors duration-(--duration-slow) ease-out active:!bg-primary-50 [@media(hover:hover)]:hover:bg-primary-75 [@media(hover:hover)]:hover:duration-(--duration-fast) has-[>[data-card-press]:focus-visible]:bg-primary-75 has-[>[data-card-press]:focus-visible]:duration-150';

/** The whole-card button behind a pressable card. Pair it with `data-card-press`. Internal. */
export const CARD_PRESS_BUTTON_CLASS =
  'absolute inset-0 cursor-pointer rounded-container focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset';

/** Section cards: 16px on mobile, 20px from `sm` up. */
const CARD_PADDING_CLASS = 'p-4 sm:p-5';

/** Row cards are tighter so the avatar fills more of the card: 12px on mobile, 16px from `sm` up. */
const ROW_PADDING_CLASS = 'has-[>[data-slot=card-row]]:p-3 sm:has-[>[data-slot=card-row]]:p-4';

const VARIANTS = {
  white: 'bg-card',
  outline: 'border border-border bg-card',
} as const;

export type CardVariant = keyof typeof VARIANTS;

/** Lifts controls inside a pressable card above its stretched button. */
const LIFT_CONTROLS_CLASS =
  '[&_:is(button,a,input,select,textarea):not([data-card-press])]:relative [&_:is(button,a,input,select,textarea):not([data-card-press])]:z-10';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** `white` on the `stone-100` page (default); `outline` on white surfaces such as modals and panels. */
  variant?: CardVariant;
  /** Makes the whole card pressable. Buttons inside keep working on their own. */
  onPress?: () => void;
  /** Required with `onPress`: names the whole-card button, e.g. "Open booking with Jordan Lee". */
  pressLabel?: string;
}

/**
 * A surface that owns the padding and stacks its children with a 16px gap.
 * Use `className` for width and placement only, never padding, radius,
 * background, border or shadow.
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'white', onPress, pressLabel, children, ...props }, ref) => (
    <div
      ref={ref}
      data-variant={variant}
      data-pressable={onPress ? '' : undefined}
      className={cn(
        'group/card relative flex flex-col gap-4 rounded-container',
        CARD_PADDING_CLASS,
        ROW_PADDING_CLASS,
        onPress && cn(INTERACTIVE_CARD_CLASS, LIFT_CONTROLS_CLASS, 'cursor-pointer'),
        VARIANTS[variant],
        className
      )}
      {...props}
    >
      {onPress && (
        <button
          type="button"
          data-card-press=""
          onClick={onPress}
          aria-label={pressLabel}
          className={CARD_PRESS_BUTTON_CLASS}
        />
      )}
      {children}
    </div>
  )
);
Card.displayName = 'Card';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** One action in the top-right corner: an icon-only `ghost` menu button or a `sm` button. */
  endContent?: React.ReactNode;
}

/** `CardTitle` and an optional `CardDescription`, with one optional action on the right. */
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, endContent, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-start justify-between gap-4', className)} {...props}>
      <div className="flex min-w-0 flex-col gap-1">{children}</div>
      {endContent && <div className="-my-1 shrink-0">{endContent}</div>}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn(typographyVariants({ variant: 'h4', weight: 'medium', tone: 'brand' }), className)} {...props} />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(typographyVariants({ variant: 'bodySmall' }), 'text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

/** Actions on the right, main action last. */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-end gap-2', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export interface CardRowProps {
  /** An `Avatar`. Sized to 64px, 88px from `sm` up. */
  startContent?: React.ReactNode;
  title: React.ReactNode;
  /** One or two short lines under the title, such as a date or a role. */
  details?: [React.ReactNode] | [React.ReactNode, React.ReactNode];
  /** One `Button`. Leave it empty on a pressable card to show a chevron. */
  endContent?: React.ReactNode;
  className?: string;
}

/** The row layout every list card uses: avatar, text, then one thing on the end. */
function CardRow({ startContent, title, details, endContent, className }: CardRowProps) {
  return (
    <div data-slot="card-row" className={cn('flex items-center gap-4', className)}>
      {startContent && (
        <div className="shrink-0 *:size-16 *:text-h4 sm:*:size-22 sm:*:text-h3">{startContent}</div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <Typography as="h3" variant="subtitle" weight="medium" tone="brand" className="truncate leading-snug">
          {title}
        </Typography>
        {details?.map((line, index) => (
          <Typography key={index} variant="bodySmall" className="text-muted-foreground">
            {line}
          </Typography>
        ))}
      </div>
      {endContent ? (
        <div className="shrink-0">{endContent}</div>
      ) : (
        <ChevronRightIcon className="hidden size-(--icon-xl) shrink-0 text-primary group-data-[pressable]/card:block" />
      )}
    </div>
  );
}

export { Card, CardDescription, CardFooter, CardHeader, CardRow, CardTitle };
