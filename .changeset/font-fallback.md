---
'@halth/tokens': patch
---

Fix `--font-sans` falling back to the system font when an app doesn't define `--font-helvetica-neue`. The variable now has a `"Helvetica Neue"` fallback, so the rest of the font stack stays valid. Apps should still load the font with next/font and put its `variable` class on `<html>`.
