'use client';

import type { ReactNode } from 'react';

import {
  Button as HeroButton,
  type ButtonProps as HeroButtonProps,
  Spinner,
  buttonVariants as heroButtonVariants,
} from '@heroui/react';

import { cn } from '../../lib/cn';
import { typographyVariants, type TypographyVariant } from '../typography';

type HeroVariant = NonNullable<HeroButtonProps['variant']>;
type HeroSize = NonNullable<HeroButtonProps['size']>;

const DISABLED_CLASSES =
  'disabled:bg-secondary disabled:text-muted-foreground disabled:opacity-100';

/** HeroUI shrinks buttons on press; HaltH buttons only change colour. */
const NO_PRESS_SCALE = 'active:transform-none data-[pressed=true]:transform-none';

const SOFT_PRESSED = '[--button-bg-pressed:color-mix(in_oklab,var(--secondary)_80%,transparent)]';

/**
 * HaltH variants on top of HeroUI's. Background colours go through HeroUI's
 * `--button-bg*` variables so hover and press use HeroUI's own selectors.
 */
const VARIANTS = {
  default: {
    hero: 'primary',
    className: cn(
      '[--button-bg-hover:var(--color-primary-400)] [--button-bg-pressed:var(--color-primary-500)]',
      DISABLED_CLASSES
    ),
  },
  secondary: {
    hero: 'tertiary',
    className:
      'text-secondary-foreground [--button-bg:var(--secondary)] [--button-bg-hover:var(--color-primary-50)] [--button-bg-pressed:var(--color-primary-200)]',
  },
  outline: {
    hero: 'outline',
    className: cn(
      'border-primary text-primary hover:text-secondary-foreground [--button-bg-hover:var(--secondary)]',
      SOFT_PRESSED
    ),
  },
  ghost: {
    hero: 'ghost',
    className: cn('[--button-bg-hover:var(--secondary)]', SOFT_PRESSED),
  },
  light: {
    hero: 'ghost',
    className:
      'text-primary [--button-bg-hover:var(--color-primary-50)] [--button-bg-pressed:var(--color-primary-200)]',
  },
  danger: {
    hero: 'danger',
    className: cn(
      '[--button-bg-hover:color-mix(in_oklab,var(--destructive)_90%,transparent)] [--button-bg-pressed:color-mix(in_oklab,var(--destructive)_80%,transparent)]',
      DISABLED_CLASSES
    ),
  },
  link: {
    hero: 'ghost',
    className:
      'text-primary underline-offset-4 hover:underline active:opacity-75 [--button-bg-hover:transparent] [--button-bg-pressed:transparent]',
  },
} satisfies Record<string, { hero: HeroVariant; className: string }>;

const SIZES = {
  xs: { hero: 'sm', className: 'h-7 px-2', iconOnly: 'w-7', text: 'caption' },
  sm: { hero: 'sm', className: 'h-9 px-3', iconOnly: 'w-9', text: 'bodySmall' },
  md: { hero: 'md', className: 'h-10 px-4', iconOnly: 'w-10', text: 'bodySmall' },
  lg: { hero: 'lg', className: 'h-11 px-8', iconOnly: 'w-11', text: 'bodySmall' },
} satisfies Record<
  string,
  { hero: HeroSize; className: string; iconOnly: string; text: TypographyVariant }
>;

export type ButtonVariant = keyof typeof VARIANTS;
export type ButtonSize = keyof typeof SIZES;

export interface ButtonVariantOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Square button sized for a single icon. */
  isIconOnly?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const haltHClasses = ({
  variant = 'default',
  size = 'md',
  isIconOnly = false,
  className,
}: ButtonVariantOptions) =>
  cn(
    "rounded-pill [&_svg:not([class*='size-'],[data-slot='spinner-icon'])]:size-(--icon-xl)",
    NO_PRESS_SCALE,
    typographyVariants({ variant: SIZES[size].text, weight: 'regular' }),
    VARIANTS[variant].className,
    SIZES[size].className,
    isIconOnly && cn('p-0', SIZES[size].iconOnly),
    className
  );

/**
 * Button classes for elements that can't be a `<button>`, such as links:
 * `<Link className={buttonVariants({ variant: 'outline' })} href="/bookings" />`.
 */
export function buttonVariants(options: ButtonVariantOptions = {}) {
  const { variant = 'default', size = 'md', isIconOnly, fullWidth } = options;
  return cn(
    heroButtonVariants({
      variant: VARIANTS[variant].hero,
      size: SIZES[size].hero,
      isIconOnly,
      fullWidth,
    }),
    haltHClasses(options)
  );
}

export type ButtonProps = Omit<
  HeroButtonProps,
  'variant' | 'size' | 'isIconOnly' | 'fullWidth' | 'className' | 'children'
> &
  ButtonVariantOptions & {
    children?: ReactNode;
  };

/** The HaltH button: HeroUI v3 `Button` with HaltH variants, sizes and pill shape. */
export function Button({
  variant = 'default',
  size = 'md',
  isIconOnly = false,
  fullWidth,
  isPending,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <HeroButton
      {...props}
      variant={VARIANTS[variant].hero}
      size={SIZES[size].hero}
      isIconOnly={isIconOnly}
      fullWidth={fullWidth}
      isPending={isPending}
      className={haltHClasses({ variant, size, isIconOnly, className })}
    >
      {isPending && <Spinner color="current" size="sm" />}
      {!(isPending && isIconOnly) && children}
    </HeroButton>
  );
}
