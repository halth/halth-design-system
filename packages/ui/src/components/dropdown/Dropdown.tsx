'use client';

import type { ReactNode } from 'react';

import { transitions } from '@halth/design-system-tokens';
import { motion } from 'framer-motion';

import { cn } from '../../lib/cn';
import { Typography } from '../typography';

export interface DropdownProps {
  value?: string;
  placeholder?: string;
  isOpen: boolean;
  onClick: () => void;
  testId?: string;
  isInvalid?: boolean;
  /** Custom content; replaces the value/placeholder text. */
  children?: ReactNode;
}

/** Select-style field trigger with a chevron that rotates when open. */
export function Dropdown({
  value,
  placeholder,
  isOpen,
  onClick,
  testId,
  isInvalid,
  children,
}: DropdownProps) {
  return (
    <button
      type="button"
      data-testid={testId}
      onClick={onClick}
      aria-expanded={isOpen}
      className={cn(
        'flex w-full items-center gap-2 rounded-container border bg-background px-3 py-2 text-left',
        isInvalid ? 'border-destructive' : 'border-border'
      )}
    >
      <div className="flex-1">
        {children ?? (
          <Typography
            as="span"
            variant="body"
            tone={value ? 'default' : 'mutedGray'}
            className="line-clamp-1 text-left"
          >
            {value || placeholder}
          </Typography>
        )}
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={transitions.base}
        className="shrink-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="size-(--icon-md) text-muted-foreground"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </motion.div>
    </button>
  );
}
