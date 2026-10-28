---
'@halth/tokens': minor
'@halth/ui': minor
---

Add radius, icon size and motion tokens to `@halth/tokens`:

- `radii` (`rounded-pill`, `rounded-container`, `rounded-tile`), also in the Tailwind v3 and NativeWind presets. HeroUI's `--field-radius` now uses `radii.container`.
- `iconSizes` as `--icon-xs` … `--icon-2xl` (`size-(--icon-sm)`).
- `durations` as `--duration-fast|base|slow`, `easings` as `ease-standard`/`ease-out`, and `transitions.base` for Motion (framer-motion).

Every `@halth/ui` component now uses these instead of its own `rounded-*`, `size-*` and duration values. Nothing changes visually.
