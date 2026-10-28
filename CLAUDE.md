# HaltH UI - Development Guidelines

The single source of truth for UI components and design tokens across HaltH apps (platform-business-web, platform-member-web, halth-extend, halth-embed) and WellHealth Ops. Apps import components from `@halth/ui` and never build their own versions.

## 🏗 Architecture

**Monorepo:** pnpm workspaces
- `packages/tokens` (`@halth/tokens`): colours, radius, fonts; Tailwind v4 `theme.css`, HeroUI v3 `heroui.css`, Tailwind v3 and NativeWind presets
- `packages/ui` (`@halth/ui`): React components
- `apps/docs`: Storybook showcase, deployed to private GitHub Pages at https://ideal-succotash-1gwzw4v.pages.github.io on every merge to `main` (`.github/workflows/docs.yml`)

**Stack:** React 19 + TypeScript, HeroUI v3 (`@heroui/react`, built on React Aria), Tailwind CSS v4
**Release:** Changesets → `pnpm version-packages` PR into `main` → run the Release workflow → GitHub Packages; label a PR `snapshot` for a test version

## ⛔ Critical Rules

### Follow the Design Guidelines
`apps/docs/src/Guidelines.mdx` (Storybook → Guidelines) documents what we use, where and why: radius, borders, elevation, icons, sizing, motion, colour, type, spacing, states and each component. It only lists what is implemented, so update it in the same change as the code.

### One Component Per Job
There is exactly one `Button`, one `Card`, and so on. Never add a second component for the same job (no `AppButton`, `ActionButton`, `PrimaryButton`). If an app needs a new look, add a variant or prop to the existing component.

Components are built from each other: text uses `Typography` or `typographyVariants()` (never `text-sm`/`font-*` classes directly), corners use the radius tokens (`rounded-pill`, `rounded-container`, `rounded-tile`; `rounded-full` only for circles), icons use `size-(--icon-*)`, motion uses `--duration-*`/`ease-*` or `transitions` from `@halth/tokens`, and anything that looks like a button is `Button` (the modal close button, actions in cards). The only raw `<button>`s are invisible stretched overlays for pressable cards.

Current components, one per job: `Alert`, `AttributeChip`, `Avatar`, `Badge` (counts), `BookingCard`, `Button`, `Card`, `CardLogo`, `Checkbox`, `Chip` (status pills), `CopyButton`, `Dropdown`, `EmptyState`, `Input` (all text fields, including search), `Modal`, `Skeleton`, `Spinner`, `Switch`, `Tabs`, `Tooltip`, `Typography` (all text: there is no separate `Text`, and apps shouldn't use raw `<h1>`/`<p>`). Icons come from `@halth/ui/icons` (Lucide under HaltH names), never from `lucide-react` directly.

Presentational components that show API data (e.g. `BookingCard`) take display props, never app API types like `Booking`, and never call APIs. Apps do the mapping.

### Build On HeroUI v3
Interactive components wrap HeroUI v3 primitives from `@heroui/react`. Apply HaltH styling through HeroUI's CSS variables (e.g. `--button-bg`, `--button-bg-hover`, `--button-bg-pressed`) or Tailwind classes. Don't add Radix, cva or another UI library without agreeing it first. Icons are the agreed exception: `lucide-react`, re-exported from `@halth/ui/icons`.

Where HeroUI v3 documents a companion package, use that package rather than writing our own.

### Colours Only From Tokens
No hex values in components. Use token classes (`bg-primary`, `text-primary-500`, `bg-secondary`). New colours go in `packages/tokens/src/colors.ts`.

In HeroUI apps, `muted` and `accent` follow HeroUI: `text-muted` is secondary text and `bg-accent` is the brand colour. Use `bg-secondary` for the light grey surface and `text-muted-foreground` for muted text.

### Never Edit Generated Files
`dist/` and the generated CSS (`variables.css`, `theme.css`, `heroui.css`) are build output. Change `packages/tokens/src/` or `packages/tokens/scripts/build-css.ts` instead.

### Never Use 'use client' by Default
Only add `'use client'` when the file itself uses hooks, event handlers or browser APIs. HeroUI components already ship their own directive.

### Tailwind v4 Syntax
Use v4 utilities: `outline-hidden`, trailing `!` for important, and plain `hover:` (it already applies only on devices that can hover).

### Accessible By Default
Stories run the a11y addon with `test: 'error'`. Text needs 4.5:1 contrast. Warning (amber) is `sun-600`: the `--warning` token, Typography `tone="warning"` and the warning `Chip`. It's an accepted exception to the contrast rule (2:1 on `sun-100`); the longer text in `Alert` uses `sun-800`. Muted text on `bg-secondary` uses `charcoal`. Don't nest interactive elements; for a pressable card with buttons inside, use a stretched `<button>` beside them (see `BookingCard`).

### Minimal Strategic Comments Only
JSDoc for public props and exports; otherwise only comment non-obvious logic.

## ➕ Adding a Component

1. `packages/ui/src/components/<name>/` with `<Name>.tsx`, `index.ts`, `<Name>.stories.tsx` (see Storybook Stories below) and `<Name>.test.tsx`
2. `packages/ui/src/<name>.ts` re-export, plus an entry in `packages/ui/vite.config.ts` (`build.lib.entry`)
3. An `exports` path in `packages/ui/package.json`
4. Export it from `packages/ui/src/index.ts` unless it needs an optional peer dependency (e.g. `framer-motion`)
5. A row in the README components table
6. `pnpm changeset`

## 📚 Storybook Stories

Every component has a `<Name>.stories.tsx` with `tags: ['autodocs']`, so it gets a Docs page.

- **One story per variant**, named after it (`Primary`, `Secondary`, `Outline`, `Danger`…), so each appears under the component in the sidebar, can be linked directly, and is checked separately by the a11y addon.
- **One overview story** (`All variants`) showing every variant side by side.
- **Key states** as their own stories: sizes, disabled, pending/loading, with icon, invalid, and so on.
- **Realistic HaltH labels** ("Cancel booking", not "Button").
- Set variants through `args` so the controls panel works on every story; use `render` only for grids or composed examples.
- Smaller components: main variants plus a few key states; leave the rest to controls.

See `packages/ui/src/components/button/Button.stories.tsx` for the reference example.

## 🏷 Naming Conventions

- **Components:** PascalCase (`Button.tsx`, `Dropdown.tsx`)
- **Component folders and subpaths:** kebab-case (`date-picker`, `@halth/ui/date-picker`)
- **Variables/Functions/Props:** camelCase; boolean props use `is*` (`isPending`, `isIconOnly`), matching HeroUI
- **Events:** `onPress`, not `onClick`, matching HeroUI

## 🧪 Commands

```bash
pnpm build            # build all packages
pnpm typecheck
pnpm test
pnpm storybook        # http://localhost:6006
pnpm build-storybook
```
