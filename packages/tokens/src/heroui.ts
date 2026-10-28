import { primary, success, sun } from './colors';
import { radii } from './foundation';
import { semanticValues, type SemanticColor } from './semantic';

const semantic = (name: SemanticColor) => `hsl(${semanticValues[name]})`;

/**
 * HaltH values for HeroUI v3's theme variables, written to
 * `@halth/tokens/heroui.css`.
 *
 * HeroUI uses `muted` for secondary text and `accent` for the brand colour,
 * so in HeroUI apps those two names follow HeroUI rather than shadcn. Use
 * `secondary` for the light grey surface shadcn calls `muted`/`accent`.
 */
export const heroUIVariables = {
  background: semantic('background'),
  foreground: semantic('foreground'),
  surface: semantic('card'),
  'surface-foreground': semantic('card-foreground'),
  overlay: semantic('popover'),
  'overlay-foreground': semantic('popover-foreground'),
  muted: semantic('muted-foreground'),
  default: semantic('secondary'),
  'default-foreground': semantic('secondary-foreground'),
  accent: primary.DEFAULT,
  'accent-foreground': semantic('primary-foreground'),
  danger: semantic('destructive'),
  'danger-foreground': semantic('destructive-foreground'),
  success: success.DEFAULT,
  'success-foreground': '#ffffff',
  warning: sun[600],
  'warning-foreground': '#ffffff',
  border: semantic('border'),
  separator: semantic('border'),
  focus: semantic('ring'),
  'field-background': semantic('background'),
  'field-border': semantic('input'),
  'field-border-width': '1px',
  'field-radius': radii.container,
  /** HaltH has no shadows; a transparent inset shadow keeps HeroUI's focus ring working. */
  'field-shadow': '0 0 0 0 transparent inset',
} as const;
