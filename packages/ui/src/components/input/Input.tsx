import type { ReactNode } from 'react';

import {
  Description,
  FieldError,
  Input as HeroInput,
  InputGroup,
  Label,
  SearchField,
  type SearchFieldProps,
  TextField,
  type TextFieldProps,
} from '@heroui/react';

import { cn } from '../../lib/cn';
import { FIELD_DESCRIPTION_CLASS, FIELD_ERROR_CLASS, FIELD_LABEL_CLASS } from '../../lib/field';
import { SearchIcon } from '../icons';
import { typographyVariants } from '../typography';

export type InputType = 'text' | 'email' | 'tel' | 'password' | 'url' | 'search';

/** 40px, the same height as a `md` `Button`, with `body` text so phones don't zoom in. */
const FIELD_CLASS = 'h-10';
const TEXT_CLASS = typographyVariants({ variant: 'body' });
const ADORNMENT_CLASS = 'text-muted-foreground [&_svg]:size-(--icon-md)';

export interface InputProps
  extends Omit<TextFieldProps, 'children' | 'className' | 'type' | 'variant' | 'render'> {
  /** Shown above the field. Without one, pass `aria-label`. */
  label?: ReactNode;
  placeholder?: string;
  /** Help text under the field. */
  description?: ReactNode;
  /** Shown instead of the description while `isInvalid`. */
  errorMessage?: ReactNode;
  /** `search` adds a search icon and a clear button. Defaults to `text`. */
  type?: InputType;
  /** An icon or prefix before the text, e.g. `MailIcon` or "$". Not used with `search`. */
  startContent?: ReactNode;
  /** Search only: Enter pressed. */
  onSubmit?: (value: string) => void;
  /** Search only: the clear button pressed or Escape. */
  onClear?: () => void;
  /** Width and placement only. */
  className?: string;
}

/** A text field with its label, help text and error. `type="search"` makes it the search field. */
export function Input({
  label,
  placeholder,
  description,
  errorMessage,
  type = 'text',
  startContent,
  onSubmit,
  onClear,
  className,
  ...props
}: InputProps) {
  const helpText = (
    <>
      {description && <Description className={FIELD_DESCRIPTION_CLASS}>{description}</Description>}
      {errorMessage && <FieldError className={FIELD_ERROR_CLASS}>{errorMessage}</FieldError>}
    </>
  );

  if (type === 'search') {
    return (
      <SearchField
        {...(props as SearchFieldProps)}
        onSubmit={onSubmit}
        onClear={onClear}
        className={cn('w-full gap-1', className)}
      >
        {label && <Label className={FIELD_LABEL_CLASS}>{label}</Label>}
        <SearchField.Group className={cn(FIELD_CLASS, 'w-full')}>
          <SearchField.SearchIcon className={cn('ms-3', ADORNMENT_CLASS)}>
            <SearchIcon />
          </SearchField.SearchIcon>
          <SearchField.Input placeholder={placeholder} className={TEXT_CLASS} />
          <SearchField.ClearButton aria-label="Clear search" className="me-1" />
        </SearchField.Group>
        {helpText}
      </SearchField>
    );
  }

  return (
    <TextField {...props} type={type} className={cn('w-full gap-1', className)}>
      {label && <Label className={FIELD_LABEL_CLASS}>{label}</Label>}
      {startContent ? (
        <InputGroup className={cn(FIELD_CLASS, 'w-full')}>
          <InputGroup.Prefix className={cn('border-none ps-3 pe-0', ADORNMENT_CLASS)}>{startContent}</InputGroup.Prefix>
          <InputGroup.Input placeholder={placeholder} className={cn('ps-2', TEXT_CLASS)} />
        </InputGroup>
      ) : (
        <HeroInput placeholder={placeholder} className={cn(FIELD_CLASS, 'w-full', TEXT_CLASS)} />
      )}
      {helpText}
    </TextField>
  );
}
