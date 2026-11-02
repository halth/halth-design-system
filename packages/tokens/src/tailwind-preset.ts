import type { Config } from 'tailwindcss';

import { palette } from './colors';
import { animation, fontFamily, keyframes, radii } from './foundation';
import { semanticColorNames } from './semantic';
import { typeScale, typeStyleKey, type TypeStyle, type TypeStyleName } from './typography';

const fontSize = Object.fromEntries(
  Object.entries(typeScale).map(([name, { fontSize: size, ...rest }]) => [
    typeStyleKey(name as TypeStyleName),
    [size, rest] as [string, Omit<TypeStyle, 'fontSize'>],
  ])
);

const semanticColors = Object.fromEntries(
  semanticColorNames.map((name) => [name, `hsl(var(--${name}))`])
);

/**
 * Tailwind v3 preset. Pair with `@halth/design-system-tokens/variables.css` for the
 * semantic CSS variables.
 */
const preset = {
  content: [],
  theme: {
    extend: {
      fontFamily,
      fontSize,
      colors: {
        ...semanticColors,
        ...palette,
        primary: {
          ...palette.primary,
          foreground: semanticColors['primary-foreground'],
        },
        stone: {
          ...palette.stone,
          foreground: semanticColors['primary-foreground'],
        },
        secondary: {
          DEFAULT: semanticColors.secondary,
          foreground: semanticColors['secondary-foreground'],
        },
        destructive: {
          DEFAULT: semanticColors.destructive,
          foreground: semanticColors['destructive-foreground'],
        },
        muted: {
          DEFAULT: semanticColors.muted,
          foreground: semanticColors['muted-foreground'],
        },
        accent: {
          DEFAULT: semanticColors.accent,
          foreground: semanticColors['accent-foreground'],
        },
        popover: {
          DEFAULT: semanticColors.popover,
          foreground: semanticColors['popover-foreground'],
        },
        card: {
          DEFAULT: semanticColors.card,
          foreground: semanticColors['card-foreground'],
        },
      },
      borderRadius: {
        ...radii,
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes,
      animation,
    },
  },
} satisfies Config;

export default preset;
