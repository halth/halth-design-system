import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/** `@halth/design-system-tokens` classes, so `text-h1` and `text-primary` (or `rounded-pill` and `rounded-b-none`) merge correctly. */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['display', 'h1', 'h2', 'h3', 'h4', 'subtitle', 'body', 'body-small', 'caption'],
      radius: ['pill', 'container', 'tile'],
      ease: ['standard'],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
