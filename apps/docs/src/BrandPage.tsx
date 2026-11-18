import { type ReactNode, useEffect, useRef } from 'react';

import { brand, primary, stone, sun } from '@halth/design-system-tokens';

import { Card } from '../../../packages/ui/src/components/card';
import { CopyButton } from '../../../packages/ui/src/components/copy-button';
import { Typography, typographyVariants } from '../../../packages/ui/src/components/typography';

/**
 * Layout for docs pages styled like halth.com/brand: a deep forest hero, then
 * full-width sections that alternate between stone, mint tint and forest.
 * Docs only; apps build their pages from `@halth/design-system` components.
 */
export function BrandPage({ children }: { children: ReactNode }) {
  return <div className="brand-page font-sans">{children}</div>;
}

/** Each card's angle at the top of the page (`from`) and once the hero is scrolled (`to`). */
const FAN = [
  { name: 'Sun', hex: sun.DEFAULT, onDark: false, from: -50, to: -40, depth: 1 },
  { name: 'Deep', hex: brand.deepForestBg, onDark: true, from: -22, to: -20, depth: 2 },
  { name: 'Forest', hex: brand.forestBg, onDark: true, from: 0, to: 0, depth: 3 },
  { name: 'Mint', hex: primary[200], onDark: false, from: 22, to: 20, depth: 2 },
  { name: 'Stone', hex: stone.DEFAULT, onDark: false, from: 50, to: 40, depth: 1 },
] as const;

/**
 * The fan's top edge sits a fixed distance above the bottom of the screen; the
 * cards then run below the fold into this spacer, so once scrolled the centre
 * three show down to their hex codes and Sun and Stone run off the bottom, as on
 * halth.com/brand. The hero grows by the same height so the fan stays put.
 */
const SWATCH_SPACER = 'h-32 sm:h-44 lg:h-64';
const SWATCH_HERO_HEIGHT = 'min-h-[calc(100vh+8rem)] sm:min-h-[calc(100vh+11rem)] lg:min-h-[calc(100vh+16rem)]';

/** Scroll distance in px over which the outer cards close in. */
const FAN_SCROLL_RANGE = 320;

/**
 * The fanned brand swatches along the bottom of the hero, as on halth.com/brand.
 * The centre three show on load; as you scroll, Sun and Stone tilt in from
 * below. `--fan` runs 0 → 1 with the scroll.
 */
function SwatchFan() {
  const fanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fan = fanRef.current;
    const hero = fan?.closest('section');
    if (!fan || !hero) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      fan.style.setProperty('--fan', '1');
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(Math.max(-hero.getBoundingClientRect().top / FAN_SCROLL_RANGE, 0), 1);
      fan.style.setProperty('--fan', String(progress));
    };
    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };

    update();
    // Capture, because Storybook's docs page can scroll an inner element rather than the window.
    document.addEventListener('scroll', onScroll, { capture: true, passive: true });
    return () => {
      document.removeEventListener('scroll', onScroll, { capture: true });
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="relative mx-auto h-44 w-full max-w-6xl sm:h-60 lg:h-64">
      <div ref={fanRef} className="absolute inset-0 [--fan:0]">
        {FAN.map(({ name, hex, onDark, from, to, depth }) => (
          <div
            key={name}
            className="absolute top-0 left-1/2 flex aspect-[7/10] w-40 flex-col rounded-[calc(var(--radius-container)+0.75rem)] bg-white px-3 pt-3 shadow-2xl shadow-black/30 sm:w-56 lg:w-72"
            style={{
              transform: `translateX(-50%) rotate(calc(${from}deg + ${to - from}deg * var(--fan)))`,
              transformOrigin: '50% 250%',
              zIndex: depth,
            }}
          >
            <div className="flex flex-1 justify-center rounded-container pt-4" style={{ backgroundColor: hex }}>
              <Typography
                as="span"
                variant="bodySmall"
                className={`uppercase tracking-wide ${onDark ? 'text-white' : 'text-deepForestBg'}`}
              >
                {name}
              </Typography>
            </div>
            <Typography
              as="span"
              variant="bodySmall"
              align="center"
              className="py-3 font-mono tracking-wider text-primary-500 sm:py-4"
            >
              {hex.toUpperCase()}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

export interface HeroProps {
  eyebrow: string;
  title: string;
  /** The end of the title, set in sun. */
  highlight: string;
  description: string;
  /** Section anchors shown under the title. */
  links: { href: string; label: string }[];
  /** Copied by the hero button, e.g. the install command. */
  copyValue?: string;
  copyLabel?: string;
  /** The fanned brand swatches under the title. The Design System page only. */
  showSwatches?: boolean;
}

export function Hero({
  eyebrow,
  title,
  highlight,
  description,
  links,
  copyValue,
  copyLabel,
  showSwatches = false,
}: HeroProps) {
  return (
    <section
      className={`relative flex flex-col overflow-hidden bg-deepForestBg px-6 ${showSwatches ? SWATCH_HERO_HEIGHT : 'min-h-screen pb-16'}`}
    >
      <div
        className={`relative mx-auto flex max-w-4xl flex-col items-center gap-8 pt-16 text-center ${showSwatches ? '' : 'my-auto'}`}
      >
        <Typography as="span" variant="body" className="uppercase tracking-wider text-primary-200">
          {eyebrow}
        </Typography>
        <Typography as="h1" variant="display" tone="white">
          {title} <span className="text-sun">{highlight}</span>
        </Typography>
        <Typography variant="h4" weight="regular" className="max-w-3xl text-white/80">
          {description}
        </Typography>
        <nav aria-label="On this page" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
          {links.map(({ href, label }, index) => (
            <span key={href} className="flex items-center gap-5">
              {index > 0 && <span aria-hidden className="h-5 w-px bg-white/30" />}
              <a
                href={href}
                onClick={(event) => {
                  // Storybook's docs container navigates the whole window on hash links, so scroll in place.
                  event.preventDefault();
                  document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={typographyVariants({
                  variant: 'subtitle',
                  className: 'text-white/70 transition-colors duration-(--duration-fast) hover:text-sun',
                })}
              >
                {label}
              </a>
            </span>
          ))}
        </nav>
        {copyValue && <CopyButton value={copyValue} label={copyLabel} variant="secondary" size="lg" />}
      </div>
      {showSwatches && (
        <>
          <div className="mt-auto pt-16">
            <SwatchFan />
          </div>
          <div aria-hidden className={SWATCH_SPACER} />
        </>
      )}
    </section>
  );
}

const SURFACES = {
  stone: { section: 'bg-stone-50', title: 'brand', description: 'text-primary-600' },
  tint: { section: 'bg-primary-100', title: 'brand', description: 'text-primary-600' },
  forest: { section: 'bg-forestBg', title: 'white', description: 'text-white/80' },
} as const;

export interface SectionProps {
  /** Anchor for the hero links. */
  id: string;
  surface?: keyof typeof SURFACES;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
}

/** A full-width band with a large light title, like each section of halth.com/brand. */
export function Section({ id, surface = 'stone', title, description, children }: SectionProps) {
  const styles = SURFACES[surface];
  return (
    <section id={id} className={`scroll-mt-4 px-6 py-20 sm:py-28 ${styles.section}`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-12 sm:gap-16">
        <div className="flex max-w-3xl flex-col gap-4">
          <Typography as="h2" variant="h1" weight="light" tone={styles.title}>
            {title}
          </Typography>
          {description && (
            <Typography variant="subtitle" className={styles.description}>
              {description}
            </Typography>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

/** A group inside a section, such as "Core palette". */
export function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <Typography as="h3" variant="h3" weight="regular" tone="brand">
        {title}
      </Typography>
      {children}
    </div>
  );
}

export interface ComponentBlockProps {
  name: string;
  /** The package subpath, e.g. `@halth/design-system/button`. */
  importPath: string;
  /** Named exports to show in the import line. Defaults to `name`. */
  exports?: string;
  note?: ReactNode;
  /** `Canvas` blocks of the component's stories. */
  children: ReactNode;
}

/** One component: its name, a copyable import and its live stories. */
export function ComponentBlock({ name, importPath, exports = name, note, children }: ComponentBlockProps) {
  const importLine = `import { ${exports} } from '${importPath}';`;
  return (
    <Card id={`component-${name.toLowerCase()}`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <Typography as="h3" variant="h3" weight="regular" tone="brand">
            {name}
          </Typography>
          <Typography variant="bodySmall" className="break-all text-primary-600">
            {importPath}
          </Typography>
        </div>
        <CopyButton value={importLine} label="Copy import" variant="outline" size="sm" />
      </div>
      <div className="brand-canvas flex flex-col gap-4">{children}</div>
      {note && (
        <Typography variant="bodySmall" tone="brand" className="text-primary-500">
          {note}
        </Typography>
      )}
    </Card>
  );
}

/** Markdown body text in brand type: body size, forest text, pill code chips (styles in `styles.css`). */
export function Prose({ children }: { children: ReactNode }) {
  return <div className="brand-prose">{children}</div>;
}

export interface TopicProps {
  title?: string;
  children: ReactNode;
}

/** One guideline as a white card on the section band, like the content cards on halth.com/brand. */
export function Topic({ title, children }: TopicProps) {
  return (
    <Card>
      {title && (
        <Typography as="h3" variant="h3" weight="regular" tone="brand">
          {title}
        </Typography>
      )}
      <Prose>{children}</Prose>
    </Card>
  );
}

export interface CodeBlockProps {
  code: string;
  /** Names what is copied, e.g. "Copy install command". */
  copyLabel?: string;
}

/** A code sample on deep forest with a copy button. */
export function CodeBlock({ code, copyLabel = 'Copy code' }: CodeBlockProps) {
  return (
    <div className="flex flex-col gap-3 rounded-tile bg-deepForestBg p-4 sm:flex-row sm:items-start sm:justify-between">
      <pre className={typographyVariants({ variant: 'bodySmall', className: 'min-w-0 overflow-x-auto font-mono text-white' })}>
        {code}
      </pre>
      <CopyButton value={code} label={copyLabel} variant="secondary" size="sm" className="shrink-0 self-start" />
    </div>
  );
}
