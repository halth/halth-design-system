import type { ReactNode } from 'react';

import { Avatar as HeroAvatar } from '@heroui/react';

import { cn } from '../../lib/cn';
import { typographyVariants } from '../typography';

const SIZES = {
  xs: cn('size-8', typographyVariants({ variant: 'caption', weight: 'regular' })),
  sm: cn('size-10', typographyVariants({ variant: 'bodySmall', weight: 'regular' })),
  md: cn('size-14', typographyVariants({ variant: 'subtitle', weight: 'regular' })),
  lg: cn('size-16', typographyVariants({ variant: 'h4', weight: 'regular' })),
  xl: cn('size-22', typographyVariants({ variant: 'h3', weight: 'regular' })),
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
  /**
   * Makes the avatar selectable: a brand border when `true`, and a grey fallback
   * that darkens on hover when `false`. Leave it unset for a plain avatar.
   * The avatar isn't pressable itself: wrap it and its label in a pressable
   * with the `group` class, so hovering anywhere on it shows the hover state.
   */
  isSelected?: boolean;
  /** Placement only (margin, flex or grid placement). Don't restyle the avatar with it. */
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

const SELECTABLE_MOTION = 'transition-colors duration-(--duration-fast) ease-out';

/** The HaltH avatar: HeroUI v3 `Avatar` as a rounded square, with HaltH sizes and initials. */
export function Avatar({
  src,
  name,
  size = 'md',
  fallback,
  isSelected,
  className,
}: AvatarProps) {
  const isSelectable = isSelected !== undefined;

  return (
    <HeroAvatar
      className={cn(
        SIZES[size],
        'overflow-hidden rounded-tile',
        isSelectable && [
          'border-2 bg-transparent',
          SELECTABLE_MOTION,
          isSelected ? 'border-primary' : 'border-transparent',
        ],
        className
      )}
      role={name ? 'img' : undefined}
      aria-label={name}
    >
      {src && <HeroAvatar.Image src={src} alt="" />}
      <HeroAvatar.Fallback
        className={cn(
          'text-[length:inherit] [font-weight:inherit] text-primary',
          !isSelectable && 'bg-primary-200',
          isSelectable && SELECTABLE_MOTION,
          isSelected === true && 'bg-primary-100',
          isSelected === false && 'bg-stone-50 group-hover:bg-stone-100'
        )}
        aria-hidden="true"
      >
        {fallback ?? getInitials(name)}
      </HeroAvatar.Fallback>
    </HeroAvatar>
  );
}
