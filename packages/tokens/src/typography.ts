export interface TypeStyle {
  fontSize: string;
  lineHeight: string;
  letterSpacing?: string;
  /** Default weight; `font-*` classes still override it. */
  fontWeight?: string;
}

/**
 * The HaltH type scale. Each style becomes a Tailwind class named after it
 * (`text-display`, `text-h1` … `text-caption`, with `bodySmall` as `text-body-small`) that
 * sets size, line height, letter spacing and default weight together.
 */
export const typeScale = {
  /**
   * Brand display: hero titles on marketing and docs pages. Light, and fluid from
   * 48px on phones to 72px on wide screens, as on halth.com/brand.
   */
  display: {
    fontSize: 'clamp(3rem, 2rem + 4vw, 4.5rem)',
    lineHeight: '1.05',
    letterSpacing: '-0.025em',
    fontWeight: '300',
  },
  h1: { fontSize: '2.25rem', lineHeight: '1.25', letterSpacing: '-0.025em' },
  h2: { fontSize: '1.875rem', lineHeight: '1.25', letterSpacing: '-0.025em' },
  h3: { fontSize: '1.5rem', lineHeight: '1.375', letterSpacing: '-0.025em', fontWeight: '600' },
  h4: { fontSize: '1.25rem', lineHeight: '1.375', letterSpacing: '-0.025em', fontWeight: '600' },
  subtitle: { fontSize: '1.125rem', lineHeight: '1.625' },
  body: { fontSize: '1rem', lineHeight: '1.625' },
  bodySmall: { fontSize: '0.875rem', lineHeight: '1.625' },
  caption: { fontSize: '0.75rem', lineHeight: '1.625' },
} as const satisfies Record<string, TypeStyle>;

export type TypeStyleName = keyof typeof typeScale;

/** `bodySmall` → `body-small`: the name used in class names and CSS variables. */
export const typeStyleKey = (name: TypeStyleName) =>
  name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
