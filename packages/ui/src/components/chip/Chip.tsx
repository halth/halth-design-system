import type { ReactNode } from 'react';

import { Chip as HeroChip } from '@heroui/react';

import { cn } from '../../lib/cn';
import { typographyVariants } from '../typography';

/** Chip colours go through HeroUI's `--chip-bg` / `--chip-fg` variables. */
const TONES = {
  neutral: 'border-border [--chip-bg:var(--background)] [--chip-fg:var(--muted-foreground)]',
  brand: 'border-transparent [--chip-bg:var(--color-primary-100)] [--chip-fg:var(--primary)]',
  success:
    'border-transparent [--chip-bg:var(--color-success-100)] [--chip-fg:var(--color-success-800)]',
  danger:
    'border-transparent [--chip-bg:color-mix(in_oklab,var(--destructive)_8%,transparent)] [--chip-fg:var(--destructive)]',
  warning:
    'border-transparent [--chip-bg:var(--color-sun-100)] [--chip-fg:var(--color-sun-600)]',
} as const;

const SIZES = {
  sm: 'h-6 px-2',
  md: 'h-7 px-2.5',
} as const;

export type ChipTone = keyof typeof TONES;
export type ChipSize = keyof typeof SIZES;

export interface ChipProps {
  children: ReactNode;
  /** Defaults to `neutral`. */
  tone?: ChipTone;
  /** Defaults to `sm`. */
  size?: ChipSize;
  /** Shown before the label, e.g. a check icon. */
  icon?: ReactNode;
  /** Shown after the label, e.g. a clock icon on "Awaiting payment". */
  endIcon?: ReactNode;
  className?: string;
}

/** The HaltH status pill: HeroUI v3 `Chip` with HaltH tones. */
export function Chip({
  children,
  tone = 'neutral',
  size = 'sm',
  icon,
  endIcon,
  className,
}: ChipProps) {
  return (
    <HeroChip
      className={cn(
        'gap-1 rounded-pill border [&_svg]:size-(--icon-sm) [&_svg]:shrink-0',
        typographyVariants({ variant: 'caption', weight: 'semibold' }),
        TONES[tone],
        SIZES[size],
        className
      )}
    >
      {icon}
      {children}
      {endIcon}
    </HeroChip>
  );
}
