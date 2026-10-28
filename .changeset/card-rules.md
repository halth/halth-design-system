---
'@halth/ui': minor
---

`Card` is a small foundation with two layouts on two surfaces. Surfaces: `white` (default, on the `stone-100` page) and `outline` (white with a 1px border, on white surfaces). Section cards use `CardHeader` (with one optional `endContent` action), `CardTitle`, `CardDescription` and `CardFooter` (actions on the right). Row cards use `CardRow`: an `Avatar`, a title, one or two detail lines and one end `Button`, or a chevron on a pressable card. `onPress` and `pressLabel` make the whole card pressable without blocking the buttons inside, with the business calendar's hover, focus and press tints, shared with `BookingCard`.

`Card` pads `p-4 sm:p-5` (row cards `p-3 sm:p-4`) and stacks its parts with `gap-4`. Cards that need more than a section or a row become their own component, like `BookingCard`. New icons: `ChevronRightIcon`, `XIcon`, `CalendarIcon`, `UserIcon`, `CopyIcon`, `ShareIcon` and `EllipsisVerticalIcon`.
