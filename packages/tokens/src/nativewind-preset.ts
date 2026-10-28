import type { Config } from 'tailwindcss';

import { palette } from './colors';
import { semanticColorNames, semanticValues, type SemanticColor } from './semantic';

const toNativeHsl = (channels: string) => `hsl(${channels.split(' ').join(', ')})`;

const semantic = (name: SemanticColor) => toNativeHsl(semanticValues[name]);

const semanticColors = Object.fromEntries(
  semanticColorNames.map((name) => [name, semantic(name)])
);

/**
 * Tailwind v3 preset for NativeWind. React Native has no CSS variables at
 * runtime, so semantic colours are resolved to concrete values.
 */
const preset = {
  content: [],
  theme: {
    extend: {
      colors: {
        ...semanticColors,
        ...palette,
        primary: { ...palette.primary, foreground: semantic('primary-foreground') },
        stone: { ...palette.stone, foreground: semantic('primary-foreground') },
        secondary: { DEFAULT: semantic('secondary'), foreground: semantic('secondary-foreground') },
        destructive: { DEFAULT: semantic('destructive'), foreground: semantic('destructive-foreground') },
        muted: { DEFAULT: semantic('muted'), foreground: semantic('muted-foreground') },
        accent: { DEFAULT: semantic('accent'), foreground: semantic('accent-foreground') },
        popover: { DEFAULT: semantic('popover'), foreground: semantic('popover-foreground') },
        card: { DEFAULT: semantic('card'), foreground: semantic('card-foreground') },
      },
      borderRadius: {
        pill: '9999px',
        container: '16px',
        tile: '12px',
        lg: '8px',
        md: '6px',
        sm: '4px',
      },
    },
  },
} satisfies Config;

export default preset;
