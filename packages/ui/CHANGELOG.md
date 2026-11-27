# @halth/design-system

## 0.3.0

### Minor Changes

- c19be53: Publish to npm instead of GitHub Packages. Installing no longer needs an `.npmrc` or a token: `npm install @halth/design-system @halth/design-system-tokens`. Releases publish via npm trusted publishing (OIDC) with provenance attestations.
- 9681ca9: Add a `display` type style (light, fluid from 48px to 72px, `text-display`) and `Typography variant="display"`, matching the brand display style on halth.com/brand. For hero titles on marketing and docs pages.

### Patch Changes

- 36aae09: `Avatar`: the selected border is drawn over the edge of the photo instead of around it, so no white hairline shows between the border and the photo, especially at the corners. Selectable avatars' photos now fill the whole tile.
- Updated dependencies [c19be53]
- Updated dependencies [9681ca9]
  - @halth/design-system-tokens@0.3.0

## 0.2.1

### Patch Changes

- Selected avatars: the photo or initials now sit flush against the 2px border.
- @halth/design-system-tokens@0.2.1

## 0.2.0

### Minor Changes

- a9ec447: `Avatar` takes `isSelected` for pickers: a 2px brand border and `bg-primary-100` fallback when selected, and a `bg-stone-50` fallback that turns `bg-stone-100` on hover (from a `group` parent) when not.
- 7d6b95b: The library is now the HaltH Design System. `@halth/ui` is published as `@halth/design-system` and `@halth/tokens` as `@halth/design-system-tokens`; the exports are unchanged. In apps, replace `@halth/ui` with `@halth/design-system` and `@halth/tokens` with `@halth/design-system-tokens` in imports, `package.json`, and the CSS `@import '@halth/design-system-tokens/heroui.css'` and `@source '../node_modules/@halth/design-system/dist'` lines.

### Patch Changes

- a9ec447: Avatar initials are now regular weight (400) instead of medium (500), at every size.
- Updated dependencies [7d6b95b]
  - @halth/design-system-tokens@0.2.0

## 0.1.0

### Minor Changes

- c93b6b5: Initial release.
  
  `@halth/tokens`: colours, radius (`rounded-pill`, `rounded-container`, `rounded-tile`), icon sizes (`--icon-xs` … `--icon-2xl`), motion (`--duration-fast|base|slow`, `ease-standard`, `ease-out`, `transitions`) and the HaltH type scale (`text-h1` … `text-caption`). Ships as a Tailwind v4 `theme.css`, a HeroUI v3 `heroui.css`, `variables.css`, and Tailwind v3 and NativeWind presets.
  
  `@halth/ui`: components built on HeroUI v3 and Tailwind CSS v4: `Alert`, `AttributeChip`, `Avatar`, `Badge`, `BookingCard`, `Button` (with `buttonVariants` for links), `Card`, `CardLogo`, `Checkbox`, `Chip`, `CopyButton`, `Dropdown` (needs `framer-motion`), `EmptyState`, `Input`, `Modal`, `Skeleton`, `Spinner`, `Switch`, `Tabs`, `Tooltip` and `Typography`, plus Lucide icons under HaltH names from `@halth/ui/icons`.

### Patch Changes

- Updated dependencies [c93b6b5]
  - @halth/tokens@0.1.0
