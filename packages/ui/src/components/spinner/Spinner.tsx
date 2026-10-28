import { Spinner as HeroSpinner } from '@heroui/react';

import { cn } from '../../lib/cn';

const SIZES = {
  sm: 'size-(--icon-md)',
  md: 'size-(--icon-xl)',
  lg: 'size-(--icon-2xl)',
} as const;

export type SpinnerSize = keyof typeof SIZES;

export interface SpinnerProps {
  /** 16 / 24 / 32px. Defaults to `md`. */
  size?: SpinnerSize;
  /** What is loading, read by screen readers, e.g. "Loading bookings". Defaults to "Loading". */
  label?: string;
  className?: string;
}

/** Loading indicator for a page or section, in brand green. Buttons use `isPending` instead. */
export function Spinner({ size = 'md', label = 'Loading', className }: SpinnerProps) {
  return (
    <HeroSpinner
      color="current"
      aria-label={label}
      className={cn('text-primary', SIZES[size], className)}
    />
  );
}
