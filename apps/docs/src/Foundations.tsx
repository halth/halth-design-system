import type { ReactNode } from 'react';

import { brand, palette, primary, radii, stone, sun, typeScale, typeStyleKey } from '@halth/design-system-tokens';
import type { TypeStyleName } from '@halth/design-system-tokens';

import { Card } from '../../../packages/ui/src/components/card';
import { CopyButton } from '../../../packages/ui/src/components/copy-button';
import { Typography } from '../../../packages/ui/src/components/typography';

const CORE_COLORS = [
  { name: 'Primary', className: 'bg-primary', hex: primary.DEFAULT, use: 'Brand colour in the app: buttons, links, titles' },
  { name: 'Deep forest', className: 'bg-deepForestBg', hex: brand.deepForestBg, use: 'Dark sections and heroes' },
  { name: 'Forest', className: 'bg-forestBg', hex: brand.forestBg, use: 'Brand panels and dark cards' },
  { name: 'Sun', className: 'bg-sun', hex: sun.DEFAULT, use: 'Highlights and calls to action on dark' },
  { name: 'Stone', className: 'bg-stone', hex: stone.DEFAULT, use: 'Warm page and card surfaces' },
] as const;

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
  { name: 'rounded-pill', value: radii.pill, shape: 'h-10 w-28 rounded-pill', use: 'Buttons, chips, tabs, skeleton bars' },
  { name: 'rounded-container', value: radii.container, shape: 'h-16 w-28 rounded-container', use: 'Cards, modals, fields, attribute chips' },
  { name: 'rounded-tile', value: radii.tile, shape: 'size-16 rounded-tile', use: 'Avatars' },
  { name: 'rounded-full', value: 'circle', shape: 'size-16 rounded-full', use: 'Dots, badges' },
] as const;

const TYPE_SAMPLES: Record<TypeStyleName, string> = {
  display: 'Making health easy',
  h1: 'Unlock the world’s health funding',
  h2: 'Clear costs before anyone pays',
  h3: 'Today’s bookings',
  h4: 'Payment details',
  subtitle: 'Northside Physio · Fitzroy',
  body: 'Clients see what their fund covers before they pay, and providers get paid on the spot.',
  bodySmall: 'Claims and reconciliation happen automatically.',
  caption: 'Updated 2 minutes ago',
};

/** `1rem` → `16px`; a fluid `clamp(3rem, …, 4.5rem)` → `48–72px`. */
const sizeLabel = (size: string) => {
  const px = [...size.matchAll(/([\d.]+)rem/g)].map(([, rem]) => parseFloat(rem) * 16);
  return size.startsWith('clamp') ? `${px[0]}–${px[px.length - 1]}px` : `${px[0]}px`;
};

const WEIGHT_NAMES: Record<string, string> = { '300': 'light', '400': 'regular', '500': 'medium', '600': 'semibold' };

/**
 * A colour swatch as on halth.com/brand: the colour fills the top of the card
 * edge to edge and the text sits below with tight padding. A docs-only surface,
 * because `Card` keeps its own fixed padding.
 */
function Swatch({ className, tall, children }: { className: string; tall?: boolean; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-container bg-card">
      <div className={`${tall ? 'h-32' : 'h-16'} border-b border-black/5 ${className}`} />
      <div className="flex flex-1 flex-col gap-2 p-3">{children}</div>
    </div>
  );
}

/** The core brand colours as large swatch cards. Each copies its class name. */
export function CoreColors() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {CORE_COLORS.map(({ name, className, hex, use }) => (
        <Swatch key={name} className={className} tall>
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-baseline justify-between gap-2">
              <Typography as="h4" variant="subtitle" tone="brand">
                {name}
              </Typography>
              <Typography as="span" variant="caption" tone="brand" className="text-primary-500">
                {hex.toUpperCase()}
              </Typography>
            </div>
            <Typography variant="bodySmall" tone="brand" className="text-primary-500">
              {use}
            </Typography>
          </div>
          <CopyButton value={className} label={className} copiedLabel="Copied" variant="outline" size="sm" className="self-start" />
        </Swatch>
      ))}
    </div>
  );
}

/** Semantic colour tokens, rendered with their real Tailwind classes. */
export function SemanticColors() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {SEMANTIC_COLORS.map(({ name, className, use }) => (
        <Swatch key={name} className={className}>
          <div className="flex flex-col gap-1">
            <Typography as="span" variant="bodySmall" weight="medium" tone="brand">
              {name}
            </Typography>
            <Typography as="span" variant="caption" tone="brand" className="text-primary-500">
              {use}
            </Typography>
          </div>
        </Swatch>
      ))}
    </div>
  );
}

const paletteEntries: [string, string | Record<string, string>][] = Object.entries(palette);
const scales = paletteEntries.filter(
  (entry): entry is [string, Record<string, string>] => typeof entry[1] !== 'string'
);
const brandColors = paletteEntries.filter(
  (entry): entry is [string, string] => typeof entry[1] === 'string'
);

function Shade({ label, hex }: { label: string; hex: string }) {
  return (
    <div className="flex min-w-16 flex-1 flex-col gap-1">
      <div className="h-14 rounded-tile border border-black/5" style={{ backgroundColor: hex }} />
      <Typography as="span" variant="caption" weight="medium" tone="brand">
        {label}
      </Typography>
      <Typography as="span" variant="caption" tone="brand" className="text-primary-500">
        {hex.toLowerCase()}
      </Typography>
    </div>
  );
}

/** Every colour scale, e.g. `bg-primary-50` or `text-sun-600`, then the single brand colours. */
export function PaletteScales() {
  return (
    <div className="flex flex-col gap-4">
      {scales.map(([name, shades]) => (
        <Card key={name}>
          <div className="flex items-baseline justify-between gap-4">
            <Typography as="h4" variant="subtitle" tone="brand">
              {name}
            </Typography>
            <Typography as="span" variant="bodySmall" className="text-primary-600">
              {`${name}-*`}
            </Typography>
          </div>
          <div className="flex flex-wrap gap-3">
            {Object.entries(shades).map(([shade, hex]) => (
              <Shade key={shade} label={shade === 'DEFAULT' ? name : shade} hex={hex} />
            ))}
          </div>
        </Card>
      ))}
      <Card>
        <div className="flex items-baseline justify-between gap-4">
          <Typography as="h4" variant="subtitle" tone="brand">
            Brand
          </Typography>
          <Typography as="span" variant="bodySmall" className="text-primary-600">
            bg-cream, bg-forestBg, …
          </Typography>
        </div>
        <div className="flex flex-wrap gap-3">
          {brandColors.map(([name, hex]) => (
            <Shade key={name} label={name} hex={hex} />
          ))}
        </div>
      </Card>
    </div>
  );
}

/** The type scale as specimen rows: the live style on the left, its spec on the right. */
export function TypeSpecimens() {
  return (
    <Card>
      {(Object.keys(typeScale) as TypeStyleName[]).map((name, index) => {
        const style: { fontSize: string; fontWeight?: string } = typeScale[name];
        return (
          <div
            key={name}
            className={`grid items-center gap-4 py-4 lg:grid-cols-[minmax(0,60%)_minmax(0,40%)] lg:gap-12 ${index > 0 ? 'border-t border-primary-100' : ''}`}
          >
            <Typography variant={name} tone="brand">
              {TYPE_SAMPLES[name]}
            </Typography>
            <div className="flex flex-col">
              <Typography variant="body" weight="medium" tone="brand">
                {name}
              </Typography>
              <Typography variant="bodySmall" tone="brand" className="text-primary-500">
                {`text-${typeStyleKey(name)} · ${sizeLabel(style.fontSize)} · ${WEIGHT_NAMES[style.fontWeight ?? '400']}`}
              </Typography>
            </div>
          </div>
        );
      })}
    </Card>
  );
}

/** Border radius scale: the only radii components use. */
export function RadiusScale() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {RADII.map((radius) => (
        <Card key={radius.name} className="h-full">
          <div className="flex h-20 items-end">
            <div className={`border-2 border-primary bg-primary-50 ${radius.shape}`} />
          </div>
          <div className="flex flex-col gap-1">
            <Typography as="span" variant="bodySmall" weight="medium" tone="brand">
              {radius.name}
            </Typography>
            <Typography as="span" variant="caption" tone="brand">
              {radius.value}
            </Typography>
            <Typography as="span" variant="caption" tone="brand" className="text-primary-500">
              {radius.use}
            </Typography>
          </div>
        </Card>
      ))}
    </div>
  );
}
