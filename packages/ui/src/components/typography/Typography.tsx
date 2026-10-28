import type { ComponentPropsWithoutRef, ElementType, Ref } from 'react';

import { cn } from '../../lib/cn';

/** The `@halth/tokens` type scale: each class sets size, line height, letter spacing and default weight. */
const VARIANTS = {
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  h4: 'text-h4',
  subtitle: 'text-subtitle',
  body: 'text-body',
  bodySmall: 'text-body-small',
  caption: 'text-caption',
} as const;

const WEIGHTS = {
  light: 'font-light',
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
} as const;

const TONES = {
  default: 'text-foreground',
  mutedGray: 'text-muted-foreground',
  brand: 'text-primary',
  secondaryBrand: 'text-charcoal',
  white: 'text-white',
  success: 'text-success',
  danger: 'text-danger',
  warning: 'text-warning',
} as const;

const ALIGNS = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

export type TypographyVariant = keyof typeof VARIANTS;
export type TypographyWeight = keyof typeof WEIGHTS;
export type TypographyTone = keyof typeof TONES;
export type TypographyAlign = keyof typeof ALIGNS;
export type TypographyElement =
  | 'p'
  | 'span'
  | 'div'
  | 'label'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'dt'
  | 'dd'
  | 'li';

export interface TypographyVariantOptions {
  /** Type scale step. Defaults to `body`. */
  variant?: TypographyVariant;
  /** Overrides the variant's own weight (h3/h4 are semibold by default). */
  weight?: TypographyWeight;
  /** Text colour. `Typography` defaults to `default`; `typographyVariants` leaves it unset so the colour is inherited. */
  tone?: TypographyTone;
  align?: TypographyAlign;
  className?: string;
}

/** Typography classes for elements that can't use `<Typography>`. */
export function typographyVariants({
  variant = 'body',
  weight,
  tone,
  align,
  className,
}: TypographyVariantOptions = {}) {
  return cn(
    VARIANTS[variant],
    weight && WEIGHTS[weight],
    tone && TONES[tone],
    align && ALIGNS[align],
    className
  );
}

export type TypographyProps<T extends TypographyElement = 'p'> =
  TypographyVariantOptions & {
    /** The element to render. Defaults to `p`. */
    as?: T;
    ref?: Ref<HTMLElement>;
  } & Omit<ComponentPropsWithoutRef<T>, keyof TypographyVariantOptions | 'as'>;

/** The HaltH text component. Use it for every heading, paragraph and label. */
export function Typography<T extends TypographyElement = 'p'>({
  as,
  variant,
  weight,
  tone = 'default',
  align,
  className,
  ...props
}: TypographyProps<T>) {
  const Component: ElementType = as ?? 'p';
  return (
    <Component
      className={typographyVariants({ variant, weight, tone, align, className })}
      {...(props as Record<string, unknown>)}
    />
  );
}
