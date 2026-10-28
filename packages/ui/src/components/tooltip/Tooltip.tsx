import type { ReactNode } from 'react';

import { Tooltip as HeroTooltip } from '@heroui/react';

export interface TooltipProps {
  /** Short text naming or explaining the trigger, e.g. "Payment method". */
  content: ReactNode;
  /** A `Button`, or a `TooltipTrigger` around content that isn't a button. */
  children: ReactNode;
  /** Milliseconds before it opens. Defaults to 300. */
  delay?: number;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

/** A short label shown on hover and keyboard focus. Never put anything people need to press in it. */
export function Tooltip({ content, children, delay = 300, placement }: TooltipProps) {
  return (
    <HeroTooltip delay={delay}>
      {children}
      <HeroTooltip.Content placement={placement}>{content}</HeroTooltip.Content>
    </HeroTooltip>
  );
}

/** Makes content that isn't a button focusable, so its tooltip also opens from the keyboard. */
export const TooltipTrigger = HeroTooltip.Trigger;
