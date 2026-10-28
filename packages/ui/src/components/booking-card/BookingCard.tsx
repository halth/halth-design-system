import type { ReactNode } from 'react';

import { cn } from '../../lib/cn';
import { Avatar } from '../avatar';
import { CARD_PRESS_BUTTON_CLASS, INTERACTIVE_CARD_CLASS } from '../card/Card';
import { Chip, type ChipTone } from '../chip';
import { CheckIcon, ClockIcon } from '../icons';
import { Skeleton } from '../skeleton/Skeleton';
import { Typography } from '../typography';

const STATUSES = {
  paid: { label: 'Paid', tone: 'success', icon: <CheckIcon strokeWidth={3} /> },
  did_not_arrive: { label: 'Did not arrive', tone: 'danger' },
  cancelled: { label: 'Cancelled', tone: 'warning' },
  late_cancellation: { label: 'Late cancellation', tone: 'warning' },
  awaiting_payment: { label: 'Awaiting payment', tone: 'warning', endIcon: <ClockIcon /> },
} satisfies Record<string, { label: string; tone: ChipTone; icon?: ReactNode; endIcon?: ReactNode }>;

export type BookingCardStatus = keyof typeof STATUSES;

export interface BookingCardClient {
  /** Full display name, e.g. "Jordan Lee". */
  name: string;
  /** With `lastName`, stacks the name over two lines from `sm` up. */
  firstName?: string;
  lastName?: string;
  imageUrl?: string | null;
  /** HaltH member; shows a verified badge on the avatar. */
  isVerified?: boolean;
}

export interface BookingCardProps {
  client: BookingCardClient;
  /** Start time, already formatted by the app, e.g. "9:30 AM". */
  time: string;
  /** The appointment is happening now. */
  isLive?: boolean;
  status?: BookingCardStatus;
  details: {
    /** e.g. "Initial consult (60 min)". */
    appointment: string;
    provider?: string;
    location?: string;
  };
  /**
   * Row of `AttributeChip`s under the name: payment card, health fund, Medicare,
   * funding available and add card. The app decides which to show and handles their presses.
   */
  attributes?: ReactNode;
  /** Action next to the name, e.g. an invite button. */
  nameAction?: ReactNode;
  /** Makes the whole card pressable. Buttons in `attributes` and `nameAction` keep working on their own. */
  onPress?: () => void;
  className?: string;
}

function LiveDot() {
  return (
    <span className="relative flex size-2.5 shrink-0">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-highlight opacity-75" />
      <span className="relative inline-flex size-2.5 rounded-full bg-highlight" />
      <span className="sr-only">Live now</span>
    </span>
  );
}

/** A booking in the business calendar: client on the left, time, status and details on the right. */
export function BookingCard({
  client,
  time,
  isLive = false,
  status,
  details,
  attributes,
  nameAction,
  onPress,
  className,
}: BookingCardProps) {
  const statusDisplay = status && STATUSES[status];
  const hasSplitName = Boolean(client.firstName && client.lastName);

  return (
    <article
      className={cn(
        INTERACTIVE_CARD_CLASS,
        'relative grid grid-cols-1 overflow-hidden sm:grid-cols-2',
        onPress && 'cursor-pointer',
        className
      )}
    >
      {onPress && (
        <button
          type="button"
          onClick={onPress}
          data-card-press=""
          aria-label={`Open booking for ${client.name} at ${time}`}
          className={CARD_PRESS_BUTTON_CLASS}
        />
      )}

      <div className="flex items-center gap-4 p-4 sm:p-5">
        <div className="relative shrink-0">
          <Avatar
            src={client.imageUrl}
            name={client.name}
            size="lg"
            className="sm:size-22 sm:text-h3"
          />
          {client.isVerified && (
            <span
              className="absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full bg-primary text-white ring-2 ring-card [&_svg]:size-(--icon-xs)"
              aria-label="Verified member"
              role="img"
            >
              <CheckIcon strokeWidth={3} />
            </span>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
          <Typography as="h3" variant="subtitle" weight="medium" tone="brand" className="w-full leading-snug">
            <span className={cn('block truncate', hasSplitName && 'sm:hidden')}>{client.name}</span>
            {hasSplitName && (
              <span className="hidden sm:block">
                {client.firstName}
                <br />
                {client.lastName}
              </span>
            )}
          </Typography>
          {nameAction && <div className="relative z-10">{nameAction}</div>}
          {attributes && (
            <div className="relative z-10 flex max-w-full flex-nowrap items-center gap-1.5 overflow-x-auto sm:gap-2 sm:overflow-visible">
              {attributes}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-border p-4 sm:border-t-0 sm:border-l sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Typography
            as="span"
            variant="bodySmall"
            weight="bold"
            tone="brand"
            className="sm:text-h4 sm:font-medium"
          >
            {time}
          </Typography>
          {isLive && <LiveDot />}
          {statusDisplay && (
            <Chip
              tone={statusDisplay.tone}
              icon={'icon' in statusDisplay ? statusDisplay.icon : undefined}
              endIcon={'endIcon' in statusDisplay ? statusDisplay.endIcon : undefined}
              className="ml-auto"
            >
              {statusDisplay.label}
            </Chip>
          )}
        </div>
        <div className="flex flex-col">
          {[details.appointment, details.provider, details.location]
            .filter(Boolean)
            .map((line) => (
              <Typography key={line} variant="bodySmall" tone="brand" className="truncate">
                {line}
              </Typography>
            ))}
        </div>
      </div>
    </article>
  );
}

/** Loading placeholder with the same layout as `BookingCard`. */
export function BookingCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('grid grid-cols-1 rounded-container bg-card sm:grid-cols-2', className)}
    >
      <div className="flex items-center gap-4 p-4 sm:p-5">
        <Skeleton shape="tile" className="size-16 shrink-0 sm:size-22" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-border p-4 sm:border-t-0 sm:border-l sm:p-5">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
