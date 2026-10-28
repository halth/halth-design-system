import type { ReactNode } from 'react';

import {
  Description,
  Switch as HeroSwitch,
  type SwitchProps as HeroSwitchProps,
  Label,
} from '@heroui/react';

import { cn } from '../../lib/cn';
import { FIELD_DESCRIPTION_CLASS } from '../../lib/field';
import { typographyVariants } from '../typography';

export interface SwitchProps extends Omit<HeroSwitchProps, 'children' | 'className' | 'size' | 'render'> {
  /** The label, e.g. "Online bookings". */
  children?: ReactNode;
  /** Help text under the label, e.g. what turning it on does. */
  description?: ReactNode;
  className?: string;
}

/** The off track needs 3:1 against white; HeroUI's light grey is 1.1:1. */
const VISIBLE_TRACK = '[--switch-control-bg:var(--muted)]';

/** An on/off setting that takes effect straight away. Use `Checkbox` for choices saved with a form. */
export function Switch({ children, description, className, ...props }: SwitchProps) {
  return (
    <HeroSwitch {...props} className={cn('gap-1', VISIBLE_TRACK, className)}>
      <HeroSwitch.Content className="flex items-center gap-3">
        <HeroSwitch.Control>
          <HeroSwitch.Thumb />
        </HeroSwitch.Control>
        {children && (
          <Label className={typographyVariants({ variant: 'body', tone: 'default' })}>{children}</Label>
        )}
      </HeroSwitch.Content>
      {description && <Description className={FIELD_DESCRIPTION_CLASS}>{description}</Description>}
    </HeroSwitch>
  );
}
