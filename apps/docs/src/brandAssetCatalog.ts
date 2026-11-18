/**
 * The HaltH brand images the product uses, served by Storybook from
 * `apps/docs/public/brand`. `cdn` is where apps load it from today.
 */
export interface BrandAsset {
  name: string;
  /** Path under `public/`, e.g. `brand/logos/halth-pill-white.svg`. */
  file: string;
  usage: string;
  /** Shown on forest because the artwork is white or light. */
  onDark?: boolean;
  /** Fills the preview (photos and illustrations) rather than sitting centred. */
  cover?: boolean;
  cdn?: string;
}

export type BrandAssetGroupId = 'logos' | 'imagery' | 'connections';

export interface BrandAssetGroup {
  title: string;
  description: string;
  assets: BrandAsset[];
}

const CDN = 'https://static.halth.com/assets';

export const BRAND_ASSET_GROUPS: Record<BrandAssetGroupId, BrandAssetGroup> = {
  logos: {
    title: 'Logos',
    description:
      'The HaltH wordmark is the only mark we use. White on forest, deep or dark photography; forest on stone or white. Keep clear space equal to one letter height and a minimum width of 80px, and never stretch, recolour, outline or add effects to it. Use the SVG rather than a screenshot.',
    assets: [
      { name: 'Horizontal, white', file: 'brand/logos/halth-horizontal-white.svg', usage: 'Default mark on forest surfaces', onDark: true },
      { name: 'Horizontal, forest', file: 'brand/logos/halth-horizontal-forest.svg', usage: 'Default mark on stone and white' },
      { name: 'Stacked, white', file: 'brand/logos/halth-stacked-white.svg', usage: 'Square spaces on dark surfaces', onDark: true },
      { name: 'Stacked, forest', file: 'brand/logos/halth-stacked-forest.svg', usage: 'Square spaces on light surfaces' },
      { name: 'Pill, white', file: 'brand/logos/halth-pill-white.svg', usage: 'Badges and compact placements on dark', onDark: true },
      { name: 'Pill, forest', file: 'brand/logos/halth-pill-forest.svg', usage: 'Badges and compact placements on light' },
      { name: 'Logomark, white', file: 'brand/logos/halth-logomark-white.svg', usage: 'App icons and avatars on dark', onDark: true },
      { name: 'Logomark, forest', file: 'brand/logos/halth-logomark-forest.svg', usage: 'App icons and avatars on light' },
      { name: 'Logomark, sun', file: 'brand/logos/halth-logomark-sun.svg', usage: 'Highlights on deep forest', onDark: true },
      { name: 'Wordmark, green', file: 'brand/app-logos/halth-wordmark-green.svg', usage: 'Paired with the logomark on auth cards', cdn: `${CDN}/logo/halth-wordmark-green.svg` },
      { name: 'Your health, funded', file: 'brand/app-logos/halth-your-health-funded.svg', usage: 'Receipts: “Your health funded” message', cdn: `${CDN}/logo/halth-your-health-funded-logo.svg` },
      { name: 'App PNG, green', file: 'brand/app-logos/halth-green.png', usage: 'In the app today: org selector, legal pages', cdn: `${CDN}/logo/halth-green.png` },
      { name: 'App PNG, white', file: 'brand/app-logos/halth-white.png', usage: 'In the app today: account navbar, dark surfaces', onDark: true, cdn: `${CDN}/logo/halth-white.png` },
      { name: 'App PNG, sun', file: 'brand/app-logos/halth-sun.png', usage: 'In the app today: dark mode, client status chip', onDark: true, cdn: `${CDN}/logo/halth.png` },
      { name: 'App PNG, pill white', file: 'brand/app-logos/halth-pill-white.png', usage: 'In the app today: onboarding sync header', onDark: true, cdn: `${CDN}/graphicAssets/halth-pill-white.png` },
      { name: 'App icon, green', file: 'brand/app-logos/app-icon-green.png', usage: 'Favicon', cdn: `${CDN}/logo/app-icon-green.png` },
    ],
  },
  imagery: {
    title: 'Illustrations and photography',
    description:
      'Product illustrations for invites, onboarding and marketing, and the background photography behind the login panel, splash and error pages.',
    assets: [
      { name: 'Member wallet', file: 'brand/illustrations/member-wallet.png', usage: 'Client invite flow and wallet connection', cover: true, cdn: `${CDN}/inviteFlow/memberWallet.png` },
      { name: 'Appointment calendar', file: 'brand/illustrations/appointment-calendar.png', usage: 'Provider onboarding: HaltH Extend step', cover: true, cdn: `${CDN}/media/appointment-calendar.png` },
      { name: 'Marketing background', file: 'brand/illustrations/marketing-background.jpg', usage: 'Default background for marketing assets', cover: true, cdn: `${CDN}/connections/marketing/backgrounds/halth-default.png` },
      { name: 'Login hero', file: 'brand/photography/login-hero.jpg', usage: 'Behind the login marketing panel', cover: true, cdn: `${CDN}/login/login-hero.jpg` },
      { name: 'Rock water', file: 'brand/photography/rock-water.jpg', usage: 'Splash and the error page', cover: true, cdn: `${CDN}/splash/rock-water.jpg` },
    ],
  },
  connections: {
    title: 'Connections',
    description: 'Tiles for each connection in the business app (Connections and the home onboarding checklist).',
    assets: [
      { name: 'Tap', file: 'brand/connections/tap.png', usage: 'HaltH Tap connection', cover: true, cdn: `${CDN}/connections/tap.png` },
      { name: 'Wallet', file: 'brand/connections/wallet.png', usage: 'Member wallet connection', cover: true, cdn: `${CDN}/connections/wallet.png` },
      { name: 'Extend', file: 'brand/connections/extend.png', usage: 'HaltH Extend connection', cover: true, cdn: `${CDN}/connections/extend.png` },
      { name: 'Marketing', file: 'brand/connections/marketing.png', usage: 'Marketing connection', cover: true, cdn: `${CDN}/connections/marketing.png` },
      { name: 'Printed assets', file: 'brand/connections/printed-assets.png', usage: 'Printed assets connection', cover: true, cdn: `${CDN}/connections/printed-assets.png` },
      { name: 'Client invites', file: 'brand/connections/client-invites-static.png', usage: 'Client invites connection', cover: true, cdn: `${CDN}/connections/client-invites-static.png` },
      { name: 'Private health', file: 'brand/connections/private-health.png', usage: 'Private health insurance connection', cover: true, cdn: `${CDN}/connections/private-health.png` },
      { name: 'Medicare', file: 'brand/connections/medicare.png', usage: 'Medicare connection', cover: true, cdn: `${CDN}/connections/medicare.png` },
      { name: 'NDIS', file: 'brand/connections/ndis.png', usage: 'NDIS connection', cover: true, cdn: `${CDN}/connections/ndis.png` },
      { name: 'Workers comp', file: 'brand/connections/workers-comp.png', usage: 'Workers compensation connection', cover: true, cdn: `${CDN}/connections/workers-comp.png` },
    ],
  },
};
