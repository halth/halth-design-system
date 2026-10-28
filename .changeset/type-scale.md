---
'@halth/tokens': minor
'@halth/ui': minor
---

Add the HaltH type scale to `@halth/tokens` (`typeScale`), generating `text-h1` … `text-caption` classes in `theme.css` and `fontSize` in the Tailwind v3 preset. `Typography` now uses these classes, and every component builds its text from `Typography`/`typographyVariants()` instead of its own `text-*`/`font-*` classes (`Button`, `Chip`, `Tabs`, `Modal`, `Card`, `Dropdown`, `Avatar`, `BookingCard`). `typographyVariants()` no longer adds `text-foreground` unless you pass a `tone`. The `Modal` close button is now the HaltH `Button` (`light`, `sm`, icon-only).
