# HaltH Design System

The HaltH Design System is the shared component library and design tokens for HaltH products.

**Storybook:** https://ideal-succotash-1gwzw4v.pages.github.io shows every component, the design guidelines and the icons. It's private: sign in to GitHub with access to this repo. It redeploys automatically on every merge to `main`.

| Package | Description |
|---|---|
| [`@halth/design-system-tokens`](packages/tokens) | Colours, radius, fonts. Tailwind v4 `theme.css`, HeroUI v3 `heroui.css`, Tailwind v3 and NativeWind presets |
| [`@halth/design-system`](packages/ui) | React components built on HeroUI v3 and Tailwind CSS v4 |
| [`apps/docs`](apps/docs) | Storybook showcase, hosted at https://ideal-succotash-1gwzw4v.pages.github.io |

## Develop

```bash
pnpm install
pnpm build            # build all packages
pnpm storybook        # http://localhost:6006
pnpm test
pnpm typecheck
```

See [`CLAUDE.md`](CLAUDE.md) for the rules (one component per job, built on HeroUI v3). New components live in `packages/ui/src/components/<name>/` with a `<Name>.stories.tsx` and `<Name>.test.tsx`, and get an entry in `packages/ui/vite.config.ts` plus an `exports` path in `packages/ui/package.json`.

## Release

`main` is protected: changes go in through PRs, and merging into `main` publishes nothing.

1. Every PR that changes a package includes a changeset: run `pnpm changeset` and describe the change. CI checks for one; for changes that need no release note (tests, stories), use `pnpm changeset --empty`.
2. To release, run `pnpm version-packages` on a branch and open a PR into `main`. It turns the pending changesets into the next versions and changelogs, so the PR shows exactly what will ship.
3. Once it merges, run **Actions → Release → Run workflow** on `main`. `@halth/design-system-tokens` and `@halth/design-system` publish to GitHub Packages with the same version, and the version tags are pushed. The workflow stops if changesets are still pending, i.e. step 2 was skipped.

To try a change in a product before it's released, add the `snapshot` label to your PR. The Snapshot workflow publishes a test version (e.g. `0.2.0-dev-20261028120000`) under the `dev` tag and comments the install command on the PR. It republishes on every push while the label is on. Apps on a normal version range never pick up test versions.

## Use in an app

Add to the app's `.npmrc`:

```
@halth:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Commit the `.npmrc`, never the token. `GITHUB_TOKEN` must be able to read `@halth` packages wherever the app installs:

- **Locally:** a classic personal access token with `read:packages` (GitHub Packages doesn't accept fine-grained tokens), exported as `GITHUB_TOKEN`.
- **GitHub Actions:** in each package's settings on GitHub, under Manage Actions access, add the app's repo. Then give the job `permissions: packages: read` and set `GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}` on the install step.
- **Vercel:** add `GITHUB_TOKEN` as an environment variable, set to a classic token with `read:packages`.

```bash
npm install @halth/design-system @halth/design-system-tokens
```

`@halth/design-system` requires Tailwind CSS v4 and HeroUI v3 (`@heroui/react`), which needs React 19.

### Tailwind v4 + HeroUI v3

```bash
npm install @heroui/react @heroui/styles
```

```css
/* globals.css */
@import 'tailwindcss';
@import '@heroui/styles';
@import '@halth/design-system-tokens/heroui.css';
@source '../node_modules/@halth/design-system/dist';
```

`heroui.css` includes `theme.css` and maps the HaltH colours onto HeroUI's theme variables, so it must come after `@heroui/styles`. HeroUI v3 needs no provider and no Tailwind plugin.

In HeroUI apps, `muted` and `accent` use HeroUI's meanings: `text-muted` is secondary text and `bg-accent` is the brand colour (`primary`). For the light grey surface that shadcn calls `muted`/`accent`, use `bg-secondary`. `text-muted-foreground` is unchanged.

### Tailwind v3 / NativeWind (tokens only)

`@halth/design-system-tokens/tailwind-preset` and `@halth/design-system-tokens/nativewind-preset` still export the colours for Tailwind v3 and React Native, with `@halth/design-system-tokens/variables.css` for the semantic CSS variables. `@halth/design-system` components do not support Tailwind v3.

### Components

```tsx
import { Button } from '@halth/design-system/button';

<Button variant="outline" onPress={save}>Save</Button>
```

| Component | Import | Extra peer dependency |
|---|---|---|
| `Alert` | `@halth/design-system/alert` (or `@halth/design-system`) | – |
| `AttributeChip` | `@halth/design-system/attribute-chip` (or `@halth/design-system`) | – |
| `Avatar`, `getInitials` | `@halth/design-system/avatar` (or `@halth/design-system`) | – |
| `Badge` | `@halth/design-system/badge` (or `@halth/design-system`) | – |
| `BookingCard`, `BookingCardSkeleton` | `@halth/design-system/booking-card` (or `@halth/design-system`) | – |
| `Button`, `buttonVariants` | `@halth/design-system/button` (or `@halth/design-system`) | – |
| `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardFooter`, `CardRow` | `@halth/design-system/card` (or `@halth/design-system`) | – |
| `CardLogo` | `@halth/design-system/card-logo` (or `@halth/design-system`) | – |
| `Checkbox` | `@halth/design-system/checkbox` (or `@halth/design-system`) | – |
| `Chip` | `@halth/design-system/chip` (or `@halth/design-system`) | – |
| `CopyButton` | `@halth/design-system/copy-button` (or `@halth/design-system`) | – |
| `EmptyState` | `@halth/design-system/empty-state` (or `@halth/design-system`) | – |
| Icons, e.g. `CheckIcon`, `SearchIcon`, `CalendarIcon` (Lucide under HaltH names; see Storybook → Components → Icons) | `@halth/design-system/icons` (or `@halth/design-system`) | – |
| `Input` | `@halth/design-system/input` (or `@halth/design-system`) | – |
| `Modal` (`Modal.Header`, `Modal.Body`, `Modal.Footer`) | `@halth/design-system/modal` (or `@halth/design-system`) | – |
| `Skeleton` | `@halth/design-system/skeleton` (or `@halth/design-system`) | – |
| `Spinner` | `@halth/design-system/spinner` (or `@halth/design-system`) | – |
| `Switch` | `@halth/design-system/switch` (or `@halth/design-system`) | – |
| `Tabs` (`Tabs.List`, `Tabs.Tab`, `Tabs.Panel`) | `@halth/design-system/tabs` (or `@halth/design-system`) | – |
| `Tooltip`, `TooltipTrigger` | `@halth/design-system/tooltip` (or `@halth/design-system`) | – |
| `Typography`, `typographyVariants` | `@halth/design-system/typography` (or `@halth/design-system`) | – |
| `Dropdown` | `@halth/design-system/dropdown` | `framer-motion` |

`@halth/design-system` requires `@heroui/react` v3 and React 19.

`Button` variants: `default`, `secondary`, `outline`, `ghost`, `light`, `danger`, `link`. Sizes: `xs`, `sm`, `md`, `lg`. To style a link as a button, use `buttonVariants`:

```tsx
import Link from 'next/link';
import { buttonVariants } from '@halth/design-system/button';

<Link href="/bookings" className={buttonVariants({ variant: 'outline' })}>View bookings</Link>
```

`Typography` is the one text component (there is no separate `Text`): `<Typography variant="h3" tone="brand">`. Variants `h1`–`h4`, `subtitle`, `body`, `bodySmall`, `caption`; tones `default`, `mutedGray`, `brand`, `secondaryBrand`, `white`, `success`, `danger`, `warning`.

`BookingCard` is display only: map your `Booking` into `client`, `time`, `status` and `details`, and pass actions through `onPress`, `attributes` and `nameAction`.

Components that depend on framer-motion are only exported from their own subpath, so apps without it can still import from `@halth/design-system`.

Components that need the browser ship with `'use client'`, so they can be imported directly from Next.js server components.
