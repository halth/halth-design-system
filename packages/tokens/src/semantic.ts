/**
 * shadcn-style semantic colours as space-separated HSL channels, so they work
 * with Tailwind opacity modifiers (e.g. `bg-destructive/90`).
 */
export const semanticValues = {
  background: '0 0% 100%',
  foreground: '222.2 84% 4.9%',
  card: '0 0% 100%',
  'card-foreground': '222.2 84% 4.9%',
  popover: '0 0% 100%',
  'popover-foreground': '222.2 84% 4.9%',
  primary: '178 22% 26%',
  'primary-foreground': '0 0% 100%',
  secondary: '210 40% 96.1%',
  'secondary-foreground': '222.2 47.4% 11.2%',
  muted: '210 40% 96.1%',
  'muted-foreground': '215.4 16.3% 46.9%',
  accent: '210 40% 96.1%',
  'accent-foreground': '222.2 47.4% 11.2%',
  destructive: '4 61% 48%',
  'destructive-foreground': '0 0% 100%',
  border: '214.3 31.8% 91.4%',
  input: '214.3 31.8% 91.4%',
  ring: '222.2 84% 4.9%',
  'chart-1': '12 76% 61%',
  'chart-2': '173 58% 39%',
  'chart-3': '197 37% 24%',
  'chart-4': '43 74% 66%',
  'chart-5': '27 87% 67%',
} as const;

export type SemanticColor = keyof typeof semanticValues;

export const semanticColorNames = Object.keys(semanticValues) as SemanticColor[];
