export const primary = {
  50: '#f5f8f7',
  75: '#dadfdf',
  100: '#ddeae8',
  200: '#bbd4d1',
  300: '#92b6b4',
  400: '#6b9694',
  500: '#517b7a',
  600: '#3f6262',
  700: '#355050',
  800: '#2d4242',
  900: '#293838',
  950: '#141e1f',
  DEFAULT: '#345251',
} as const;

export const sun = {
  50: '#fffdf0',
  100: '#fff9d6',
  200: '#fff3ad',
  300: '#ffec84',
  400: '#ffe55b',
  500: '#ffcc41',
  /** Warning text and the warning `Chip` label. */
  600: '#e6aa00',
  700: '#b38500',
  800: '#806000',
  DEFAULT: '#f7cd66',
} as const;

export const stone = {
  50: '#f8f6f4',
  100: '#f3f0ec',
  200: '#ddd5cb',
  300: '#c8b9a9',
  400: '#b19986',
  500: '#a1836e',
  DEFAULT: '#f3f0ec',
} as const;

export const success = {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
  950: '#052e16',
  DEFAULT: '#15803d',
} as const;

export const brand = {
  cream: '#f6f6ea',
  charcoal: '#4e4e4e',
  forestBg: '#2a5351',
  deepForestBg: '#1f3534',
  canaryBg: '#fffff2',
  /** Flags something new in the app (badges, "New" labels). */
  highlight: '#86efac',
} as const;

export const palette = {
  primary,
  sun,
  stone,
  success,
  ...brand,
} as const;
