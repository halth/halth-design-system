import { typographyVariants } from '../components/typography';
import { cn } from './cn';

/** Label above a field, or beside a checkbox or switch. */
export const FIELD_LABEL_CLASS = typographyVariants({ variant: 'bodySmall', weight: 'medium', tone: 'default' });

/** Help text under a field. */
export const FIELD_DESCRIPTION_CLASS = cn(typographyVariants({ variant: 'caption' }), 'text-muted-foreground');

/** Error under a field; replaces the description while the field is invalid. */
export const FIELD_ERROR_CLASS = cn(typographyVariants({ variant: 'caption' }), 'px-0 text-destructive');
