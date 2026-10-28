import type { ReactNode } from 'react';

import { Alert as HeroAlert } from '@heroui/react';

import { cn } from '../../lib/cn';
import { AlertCircleIcon, AlertTriangleIcon, CircleCheckIcon, InfoIcon } from '../icons';
import { typographyVariants } from '../typography';

/**
 * The same tints as `Chip`. Warning uses `sun-800`: `sun-600` is 2:1 on
 * `sun-100` and fails text contrast.
 */
const TONES = {
  info: { hero: 'accent', className: 'bg-primary-100 text-primary', Icon: InfoIcon },
  success: { hero: 'success', className: 'bg-success-100 text-success-800', Icon: CircleCheckIcon },
  warning: { hero: 'warning', className: 'bg-sun-100 text-sun-800', Icon: AlertTriangleIcon },
  danger: {
    hero: 'danger',
    className: 'bg-[color-mix(in_oklab,var(--destructive)_8%,var(--card))] text-destructive',
    Icon: AlertCircleIcon,
  },
} as const;

export type AlertTone = keyof typeof TONES;

export interface AlertProps {
  /** Defaults to `info`. */
  tone?: AlertTone;
  /** One short line, e.g. "Claim locked". */
  title: ReactNode;
  /** What happened and what to do, in a sentence or two. */
  description?: ReactNode;
  /** At most one `Button` (`sm`) that fixes it, e.g. "Set up payments". */
  action?: ReactNode;
  className?: string;
}

/** A notice inside a page or form: info, success, warning or danger. Not for toasts. */
export function Alert({ tone = 'info', title, description, action, className }: AlertProps) {
  const { hero, className: toneClassName, Icon } = TONES[tone];

  return (
    <HeroAlert
      status={hero}
      className={cn(
        'flex-wrap items-start gap-3 rounded-container p-4 shadow-none sm:flex-nowrap',
        toneClassName,
        className
      )}
    >
      <HeroAlert.Indicator className="p-0 text-current">
        <Icon className="size-(--icon-lg)" />
      </HeroAlert.Indicator>
      <HeroAlert.Content className="min-w-0 flex-1 gap-1">
        <HeroAlert.Title className={typographyVariants({ variant: 'body', weight: 'medium' })}>
          {title}
        </HeroAlert.Title>
        {description && (
          <HeroAlert.Description className={cn(typographyVariants({ variant: 'bodySmall' }), 'text-foreground')}>
            {description}
          </HeroAlert.Description>
        )}
      </HeroAlert.Content>
      {action && <div className="shrink-0 ps-8 sm:ps-0">{action}</div>}
    </HeroAlert>
  );
}
