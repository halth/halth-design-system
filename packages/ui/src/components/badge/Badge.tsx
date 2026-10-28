import type { ReactNode } from 'react';

import { Badge as HeroBadge } from '@heroui/react';

import { cn } from '../../lib/cn';
import { typographyVariants } from '../typography';

export interface BadgeProps {
  /** Hidden at 0. */
  count: number;
  /** Shows "99+" above this. Defaults to 99. */
  max?: number;
  /** Read by screen readers instead of the number, e.g. "3 unread notifications". */
  label: string;
  /** The `Avatar` or `Button` the count sits on. */
  children: ReactNode;
}

/** A count on the top-right corner of an `Avatar` or `Button`. Statuses use `Chip`. */
export function Badge({ count, max = 99, label, children }: BadgeProps) {
  return (
    <HeroBadge.Anchor>
      {children}
      {count > 0 && (
        <HeroBadge
          placement="top-right"
          className={cn(
            'min-h-5 min-w-5 rounded-pill border-2 px-1 tabular-nums [--badge-bg:var(--primary)] [--badge-border:var(--card)] [--badge-fg:var(--primary-foreground)]',
            typographyVariants({ variant: 'caption', weight: 'medium' })
          )}
        >
          <span aria-hidden="true">{count > max ? `${max}+` : count}</span>
          <span className="sr-only">{label}</span>
        </HeroBadge>
      )}
    </HeroBadge.Anchor>
  );
}
