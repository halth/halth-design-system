/** Base radius used by shadcn-style components (rem). */
export const radius = '0.5rem';

/**
 * Apps load Helvetica Neue and define `--font-helvetica-neue` (next/font's
 * `variable`). The var() fallback keeps the rest of the stack valid when it
 * isn't defined; an undefined var() would invalidate the whole font-family.
 */
export const fontFamily = {
  sans: [
    'var(--font-helvetica-neue, "Helvetica Neue")',
    '"Helvetica Neue"',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
};

/**
 * Corner radius by role, as Tailwind classes `rounded-pill`, `rounded-container`
 * and `rounded-tile`. Circles (round avatars, dots, badges) stay `rounded-full`.
 */
export const radii = {
  /** Buttons, chips, tabs and skeleton bars. */
  pill: '9999px',
  /** Cards, modals, fields, dropdowns and attribute chips. */
  container: '1rem',
  /** Square avatars and card tiles. */
  tile: '0.75rem',
} as const;

/** Icon sizes, as CSS variables: `size-(--icon-sm)`. */
export const iconSizes = {
  /** 12px: avatar badges. */
  xs: '0.75rem',
  /** 14px: chips and attribute chips. */
  sm: '0.875rem',
  /** 16px: next to text. */
  md: '1rem',
  /** 20px: the modal close button. */
  lg: '1.25rem',
  /** 24px: buttons, card tiles and chevrons. */
  xl: '1.5rem',
  /** 32px: card tile icons from `sm` up. */
  '2xl': '2rem',
} as const;

/** Motion durations in ms, as CSS variables: `duration-(--duration-fast)`. */
export const durations = {
  /** Hover in. */
  fast: 150,
  /** Open, close and rotate. */
  base: 250,
  /** Hover out, so the colour lingers instead of flickering. */
  slow: 500,
} as const;

/** Cubic-bezier easings, as Tailwind classes `ease-standard` and `ease-out`. */
export const easings = {
  /** Open, close and rotate. */
  standard: [0.2, 0, 0, 1],
  /** Hover and colour changes. */
  out: [0, 0, 0.2, 1],
} as const;

/** Ready-made Motion (framer-motion) transitions, which take seconds. */
export const transitions = {
  base: { duration: durations.base / 1000, ease: easings.standard },
} as const;

export const keyframes = {
  'accordion-down': {
    from: { height: '0' },
    to: { height: 'var(--radix-accordion-content-height)' },
  },
  'accordion-up': {
    from: { height: 'var(--radix-accordion-content-height)' },
    to: { height: '0' },
  },
  'collapsible-down': {
    from: { height: '0' },
    to: { height: 'var(--radix-collapsible-content-height)' },
  },
  'collapsible-up': {
    from: { height: 'var(--radix-collapsible-content-height)' },
    to: { height: '0' },
  },
  'caret-blink': {
    '0%,70%,100%': { opacity: '1' },
    '20%,50%': { opacity: '0' },
  },
};

export const animation = {
  'accordion-down': 'accordion-down 0.2s ease-out',
  'accordion-up': 'accordion-up 0.2s ease-out',
  'collapsible-down': 'collapsible-down 0.25s ease-out',
  'collapsible-up': 'collapsible-up 0.25s ease-in-out',
  'caret-blink': 'caret-blink 1.25s ease-out infinite',
};
