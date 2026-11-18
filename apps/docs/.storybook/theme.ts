import { brand, fontFamily, primary, semanticValues, stone } from '@halth/design-system-tokens';
import { create } from 'storybook/theming';

/** White logomark from the brand assets (`public/brand`), for the forest sidebar. */
const LOGO_URL = './brand/logos/halth-logomark-white.svg';

const foreground = `hsl(${semanticValues.foreground})`;

/** Storybook's own UI and docs pages in HaltH colours and type, matching platform-business-web. */
export const theme = create({
  base: 'light',
  fontBase: fontFamily.sans.join(', '),

  // Brand green for selection, links and focus, as in the app.
  colorPrimary: primary.DEFAULT,
  colorSecondary: primary.DEFAULT,

  appBg: stone[50],
  appContentBg: 'white',
  appPreviewBg: 'white',
  appBorderColor: stone[200],
  appHoverBg: primary[50],

  textColor: foreground,
  // Charcoal keeps muted text at 4.5:1 on the stone sidebar.
  textMutedColor: brand.charcoal,
  textInverseColor: 'white',

  barBg: 'white',
  barTextColor: brand.charcoal,
  barSelectedColor: primary.DEFAULT,
  barHoverColor: primary.DEFAULT,

  buttonBg: 'white',
  buttonBorder: stone[200],
  booleanBg: primary[50],
  booleanSelectedBg: 'white',

  inputBg: 'white',
  inputBorder: stone[200],
  inputTextColor: foreground,

  // `brandImage: null` makes Storybook render `brandTitle` as HTML, so the logo and "Fascia Design System" sit side by side.
  // White because the title sits on the forest sidebar (sidebar.ts).
  brandImage: null,
  brandTitle: `<span style="display:inline-flex;align-items:center;gap:8px;color:white;font-size:18px;font-weight:600"><img src="${LOGO_URL}" alt="HaltH" height="24" />Fascia Design System</span>`,
  brandUrl: './',
});
