import type { ReactNode } from 'react';

import {
  Description,
  FieldError,
  Checkbox as HeroCheckbox,
  type CheckboxProps as HeroCheckboxProps,
  Label,
} from '@heroui/react';

import { cn } from '../../lib/cn';
import { FIELD_DESCRIPTION_CLASS, FIELD_ERROR_CLASS } from '../../lib/field';
import { typographyVariants } from '../typography';

export interface CheckboxProps
  extends Omit<HeroCheckboxProps, 'children' | 'className' | 'variant' | 'render'> {
  /** The label, e.g. "Send a reminder 24 hours before". */
  children?: ReactNode;
  /** Help text under the label. */
  description?: ReactNode;
  /** Shown instead of the description while `isInvalid`. */
  errorMessage?: ReactNode;
  className?: string;
}

/** The empty box's edge needs 3:1 against white; HeroUI's field border is 1.2:1. */
const VISIBLE_BORDER = '[--field-border:var(--muted)]';

/** A checkbox with its label. Press the label or the box to toggle it. */
export function Checkbox({ children, description, errorMessage, className, ...props }: CheckboxProps) {
  return (
    <HeroCheckbox {...props} className={cn('gap-1', VISIBLE_BORDER, className)}>
      <HeroCheckbox.Content className="flex items-center gap-3">
        <HeroCheckbox.Control>
          <HeroCheckbox.Indicator />
        </HeroCheckbox.Control>
        {children && (
          <Label className={typographyVariants({ variant: 'body', tone: 'default' })}>{children}</Label>
        )}
      </HeroCheckbox.Content>
      {description && <Description className={cn(FIELD_DESCRIPTION_CLASS, 'ps-7')}>{description}</Description>}
      {errorMessage && <FieldError className={cn(FIELD_ERROR_CLASS, 'ps-7')}>{errorMessage}</FieldError>}
    </HeroCheckbox>
  );
}
