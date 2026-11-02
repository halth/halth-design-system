import type { ReactNode } from 'react';

import { EmptyState as HeroEmptyState } from '@heroui/react';

import { cn } from '../../lib/cn';
import { Typography } from '../typography';

export interface EmptyStateProps {
  /** An icon from `@halth/design-system/icons`, shown in a brand-green tile. */
  icon: ReactNode;
  title: ReactNode;
  /** Why it's empty, in a sentence. */
  description: ReactNode;
  /** At most one `Button` that fills it, e.g. "Set up payments". */
  action?: ReactNode;
  /** Smaller, for inside a table or list rather than a whole page or card. */
  isCompact?: boolean;
  className?: string;
}

/** The only empty state: centred, used whenever a page, section or list has nothing to show. */
export function EmptyState({ icon, title, description, action, isCompact = false, className }: EmptyStateProps) {
  return (
    <HeroEmptyState
      className={cn(
        'flex flex-col items-center gap-4 p-0 text-center',
        isCompact ? 'py-4' : 'py-6 sm:py-10',
        className
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center rounded-tile bg-primary-200 text-primary',
          isCompact
            ? 'size-12 [&_svg]:size-(--icon-xl)'
            : 'size-16 sm:size-22 [&_svg]:size-(--icon-xl) sm:[&_svg]:size-(--icon-2xl)'
        )}
      >
        {icon}
      </div>
      <div className="flex max-w-sm flex-col items-center gap-1">
        <Typography as="h3" variant={isCompact ? 'subtitle' : 'h4'} weight="medium" tone="brand" align="center">
          {title}
        </Typography>
        <Typography variant={isCompact ? 'bodySmall' : 'body'} tone="mutedGray" align="center">
          {description}
        </Typography>
      </div>
      {action}
    </HeroEmptyState>
  );
}
