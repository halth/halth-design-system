import { radii } from '@halth/design-system-tokens';

const SEMANTIC_COLORS = [
  { name: 'background', className: 'bg-background', use: 'Page background' },
  { name: 'foreground', className: 'bg-foreground', use: 'Body text' },
  { name: 'primary', className: 'bg-primary', use: 'Brand, primary buttons' },
  { name: 'accent', className: 'bg-accent', use: 'Brand colour in HeroUI components' },
  { name: 'secondary', className: 'bg-secondary', use: 'Light grey surface, secondary buttons' },
  { name: 'muted-foreground', className: 'bg-muted-foreground', use: 'Muted text (text-muted-foreground)' },
  { name: 'destructive', className: 'bg-destructive', use: 'Errors, invalid fields, danger buttons' },
  { name: 'success', className: 'bg-success', use: 'Paid, confirmed' },
  { name: 'warning', className: 'bg-warning', use: 'Warning text, late cancellation' },
  { name: 'border', className: 'bg-border', use: 'Borders and dividers' },
] as const;

const RADII = [
  {
    name: 'rounded-pill',
    value: radii.pill,
    shape: 'h-10 w-28 rounded-pill',
    use: 'Buttons, chips, tabs, skeleton bars',
  },
  {
    name: 'rounded-container',
    value: radii.container,
    shape: 'h-16 w-28 rounded-container',
    use: 'Cards, modals, fields, attribute chips',
  },
  { name: 'rounded-tile', value: radii.tile, shape: 'size-16 rounded-tile', use: 'Avatars' },
  {
    name: 'rounded-full',
    value: 'circle',
    shape: 'size-16 rounded-full',
    use: 'Dots, badges',
  },
] as const;

/** Semantic colour tokens, rendered with their real Tailwind classes. */
export function SemanticColors() {
  return (
    <div className="not-prose grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {SEMANTIC_COLORS.map(({ name, className, use }) => (
        <div key={name} className="flex flex-col gap-1 text-xs">
          <div className={`h-14 rounded-lg border border-border ${className}`} />
          <code className="font-medium text-foreground">{name}</code>
          <span className="text-muted-foreground">{use}</span>
        </div>
      ))}
    </div>
  );
}

/** Border radius scale: the only radii components use. */
export function RadiusScale() {
  return (
    <div className="not-prose flex flex-wrap items-end gap-6">
      {RADII.map((radius) => (
        <div key={radius.name} className="flex w-32 flex-col gap-1 text-xs">
          <div className={`border-2 border-primary bg-primary-50 ${radius.shape}`} />
          <code className="mt-1 font-medium text-foreground">{radius.name}</code>
          <span className="text-foreground">{radius.value}</span>
          <span className="text-muted-foreground">{radius.use}</span>
        </div>
      ))}
    </div>
  );
}
