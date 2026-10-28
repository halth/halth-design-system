import type { ReactNode } from 'react';

import { Avatar as HeroAvatar } from '@heroui/react';

import { cn } from '../../lib/cn';
import { typographyVariants } from '../typography';

const SIZES = {
  xs: cn('size-8', typographyVariants({ variant: 'caption' })),
  sm: cn('size-10', typographyVariants({ variant: 'bodySmall' })),
  md: cn('size-14', typographyVariants({ variant: 'subtitle' })),
  lg: cn('size-16', typographyVariants({ variant: 'h4' })),
  xl: cn('size-22', typographyVariants({ variant: 'h3' })),
} as const;

export type AvatarSize = keyof typeof SIZES;

export interface AvatarProps {
  /** Image URL. Falls back to initials (or `fallback`) when missing or broken. */
  src?: string | null;
  /** Full name; used for initials and the image alt text. */
  name?: string;
  /** 32 / 40 / 56 / 64 / 88px. Defaults to `md`. */
  size?: AvatarSize;
  /** Shown instead of initials, e.g. an icon for organisations. */
  fallback?: ReactNode;
  className?: string;
}

/** First letter of the first and last word: "Jordan Lee" → "JL". */
export function getInitials(name?: string) {
  const words = name?.trim().split(/\s+/).filter(Boolean) ?? [];
  if (words.length === 0) return '';
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : '';
  return `${first}${last}`.toUpperCase();
}

/** The HaltH avatar: HeroUI v3 `Avatar` as a rounded square, with HaltH sizes and initials. */
export function Avatar({
  src,
  name,
  size = 'md',
  fallback,
  className,
}: AvatarProps) {
  return (
    <HeroAvatar
      className={cn(SIZES[size], 'rounded-tile', className)}
      role={name ? 'img' : undefined}
      aria-label={name}
    >
      {src && <HeroAvatar.Image src={src} alt="" className="rounded-tile" />}
      <HeroAvatar.Fallback
        className="rounded-tile bg-primary-200 text-[length:inherit] font-medium text-primary"
        aria-hidden="true"
      >
        {fallback ?? getInitials(name)}
      </HeroAvatar.Fallback>
    </HeroAvatar>
  );
}
