'use client';

import { useEffect, useState } from 'react';

import { Button, type ButtonProps } from '../button';
import { CheckIcon, CopyIcon } from '../icons';

/** How long the button shows "Copied", in milliseconds. */
const COPIED_DURATION = 2000;

export interface CopyButtonProps
  extends Omit<ButtonProps, 'onPress' | 'children' | 'isPending' | 'aria-label'> {
  /** The text copied to the clipboard, e.g. the booking link. */
  value: string;
  /** Defaults to "Copy". Use what is copied, e.g. "Copy link". */
  label?: string;
  /** Defaults to "Copied". */
  copiedLabel?: string;
  onCopy?: () => void;
  /** Called when the browser blocks the clipboard, so the app can show its own message. */
  onError?: (error: unknown) => void;
}

/** A `Button` that copies `value` and shows a check and "Copied" for two seconds. */
export function CopyButton({
  value,
  label = 'Copy',
  copiedLabel = 'Copied',
  onCopy,
  onError,
  variant = 'secondary',
  size = 'sm',
  isIconOnly,
  ...props
}: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timeout = setTimeout(() => setIsCopied(false), COPIED_DURATION);
    return () => clearTimeout(timeout);
  }, [isCopied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      onCopy?.();
    } catch (error) {
      onError?.(error);
    }
  };

  const text = isCopied ? copiedLabel : label;

  return (
    <>
      <Button
        {...props}
        variant={variant}
        size={size}
        isIconOnly={isIconOnly}
        aria-label={isIconOnly ? text : undefined}
        onPress={copy}
      >
        {isCopied ? <CheckIcon /> : <CopyIcon />}
        {!isIconOnly && text}
      </Button>
      <span className="sr-only" aria-live="polite">
        {isCopied ? copiedLabel : ''}
      </span>
    </>
  );
}
