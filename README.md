# halth-ui

Shared component library and design tokens for HaltH products.

| Package | Description |
|---|---|
| [`@halth/tokens`](packages/tokens) | Colours, radius, fonts. Tailwind v4 `theme.css`, HeroUI v3 `heroui.css`, Tailwind v3 and NativeWind presets |
| [`@halth/ui`](packages/ui) | React components built on HeroUI v3 and Tailwind CSS v4 |
| [`apps/docs`](apps/docs) | Storybook showcase |

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
3. Once it merges, run **Actions → Release → Run workflow** on `main`. `@halth/tokens` and `@halth/ui` publish to GitHub Packages with the same version, and the version tags are pushed. The workflow stops if changesets are still pending, i.e. step 2 was skipped.

To try a change in a product before it's released, add the `snapshot` label to your PR. The Snapshot workflow publishes a test version (e.g. `0.2.0-canary-20261028120000`) under the `canary` tag and comments the install command on the PR. It republishes on every push while the label is on. Apps on a normal version range never pick up test versions.

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
npm install @halth/ui @halth/tokens
```

`@halth/ui` requires Tailwind CSS v4 and HeroUI v3 (`@heroui/react`), which needs React 19.

### Tailwind v4 + HeroUI v3

```bash
npm install @heroui/react @heroui/styles
```

```css
/* globals.css */
@import 'tailwindcss';
@import '@heroui/styles';
@import '@halth/tokens/heroui.css';
@source '../node_modules/@halth/ui/dist';
```

`heroui.css` includes `theme.css` and maps the HaltH colours onto HeroUI's theme variables, so it must come after `@heroui/styles`. HeroUI v3 needs no provider and no Tailwind plugin.

In HeroUI apps, `muted` and `accent` use HeroUI's meanings: `text-muted` is secondary text and `bg-accent` is the brand colour (`primary`). For the light grey surface that shadcn calls `muted`/`accent`, use `bg-secondary`. `text-muted-foreground` is unchanged.

### Tailwind v3 / NativeWind (tokens only)

`@halth/tokens/tailwind-preset` and `@halth/tokens/nativewind-preset` still export the colours for Tailwind v3 and React Native, with `@halth/tokens/variables.css` for the semantic CSS variables. `@halth/ui` components do not support Tailwind v3.

### Components

```tsx
import { Button } from '@halth/ui/button';

<Button variant="outline" onPress={save}>Save</Button>
```

| Component | Import | Extra peer dependency |
|---|---|---|
| `Alert` | `@halth/ui/alert` (or `@halth/ui`) | – |
| `AttributeChip` | `@halth/ui/attribute-chip` (or `@halth/ui`) | – |
| `Avatar`, `getInitials` | `@halth/ui/avatar` (or `@halth/ui`) | – |
| `Badge` | `@halth/ui/badge` (or `@halth/ui`) | – |
| `BookingCard`, `BookingCardSkeleton` | `@halth/ui/booking-card` (or `@halth/ui`) | – |
| `Button`, `buttonVariants` | `@halth/ui/button` (or `@halth/ui`) | – |
| `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardFooter`, `CardRow` | `@halth/ui/card` (or `@halth/ui`) | – |
| `CardLogo` | `@halth/ui/card-logo` (or `@halth/ui`) | – |
| `Checkbox` | `@halth/ui/checkbox` (or `@halth/ui`) | – |
| `Chip` | `@halth/ui/chip` (or `@halth/ui`) | – |
| `CopyButton` | `@halth/ui/copy-button` (or `@halth/ui`) | – |
| `EmptyState` | `@halth/ui/empty-state` (or `@halth/ui`) | – |
| Icons, e.g. `CheckIcon`, `SearchIcon`, `CalendarIcon` (Lucide under HaltH names; see Storybook → Components → Icons) | `@halth/ui/icons` (or `@halth/ui`) | – |
| `Input` | `@halth/ui/input` (or `@halth/ui`) | – |
| `Modal` (`Modal.Header`, `Modal.Body`, `Modal.Footer`) | `@halth/ui/modal` (or `@halth/ui`) | – |
| `Skeleton` | `@halth/ui/skeleton` (or `@halth/ui`) | – |
| `Spinner` | `@halth/ui/spinner` (or `@halth/ui`) | – |
| `Switch` | `@halth/ui/switch` (or `@halth/ui`) | – |
| `Tabs` (`Tabs.List`, `Tabs.Tab`, `Tabs.Panel`) | `@halth/ui/tabs` (or `@halth/ui`) | – |
| `Tooltip`, `TooltipTrigger` | `@halth/ui/tooltip` (or `@halth/ui`) | – |
| `Typography`, `typographyVariants` | `@halth/ui/typography` (or `@halth/ui`) | – |
| `Dropdown` | `@halth/ui/dropdown` | `framer-motion` |

`@halth/ui` requires `@heroui/react` v3 and React 19.

`Button` variants: `default`, `secondary`, `outline`, `ghost`, `light`, `danger`, `link`. Sizes: `xs`, `sm`, `md`, `lg`. To style a link as a button, use `buttonVariants`:

```tsx
import Link from 'next/link';
import { buttonVariants } from '@halth/ui/button';

<Link href="/bookings" className={buttonVariants({ variant: 'outline' })}>View bookings</Link>
```

`Typography` is the one text component (there is no separate `Text`): `<Typography variant="h3" tone="brand">`. Variants `h1`–`h4`, `subtitle`, `body`, `bodySmall`, `caption`; tones `default`, `mutedGray`, `brand`, `secondaryBrand`, `white`, `success`, `danger`, `warning`.

`BookingCard` is display only: map your `Booking` into `client`, `time`, `status` and `details`, and pass actions through `onPress`, `attributes` and `nameAction`.

Components that depend on framer-motion are only exported from their own subpath, so apps without it can still import from `@halth/ui`.

Components that need the browser ship with `'use client'`, so they can be imported directly from Next.js server components.
