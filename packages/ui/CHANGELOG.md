# @halth/design-system

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
