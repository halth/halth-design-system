import { Skeleton as HeroSkeleton } from '@heroui/react';

import { cn } from '../../lib/cn';

const SHAPES = {
  bar: 'rounded-pill',
  tile: 'rounded-tile',
} as const;

export type SkeletonShape = keyof typeof SHAPES;

export interface SkeletonProps {
  /** `bar` (default) stands in for a line of text; `tile` for an `Avatar`. */
  shape?: SkeletonShape;
  /** Width and height only, e.g. `h-4 w-1/2` or `size-16`. */
  className?: string;
}

/**
 * A pulsing placeholder. Build loading states from these with the same layout
 * as the content, so the page doesn't jump when data arrives.
 */
export function Skeleton({ shape = 'bar', className }: SkeletonProps) {
  return (
    <HeroSkeleton
      animationType="pulse"
      aria-hidden="true"
      className={cn('bg-secondary', SHAPES[shape], className)}
    />
  );
}
