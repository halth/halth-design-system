import { brand, fontFamily, sun } from '@halth/design-system-tokens';
import type { API } from 'storybook/manager-api';

/** The site's pages, like the top nav on base.uber.com. `match` picks the link to highlight for the open entry. */
const SITE_PAGES = [
  { label: 'Design system', storyId: 'design-system--docs', match: (id: string) => id.startsWith('design-system-') },
  { label: 'Get started', storyId: 'introduction--docs', match: (id: string) => id.startsWith('introduction-') },
  { label: 'Guidelines', storyId: 'guidelines--docs', match: (id: string) => id.startsWith('guidelines-') },
  { label: 'Components', storyId: 'components-alert--docs', match: isComponentEntry },
];

const HEIGHT = '4rem';
const MUTED_TEXT = 'rgb(255 255 255 / 0.7)';

/** Component pages keep Storybook's sidebar and toolbar; the brand pages are full width. */
export function isComponentEntry(storyId: string | undefined) {
  return !!storyId?.startsWith('components-');
}

/**
 * A deep forest bar across the top of Storybook, above the sidebar and preview.
 * Storybook's layout is `100dvh`, so the body becomes a column and the layout
 * fills what's left under the bar.
 */
export const topNavStyles = `
body {
  display: flex;
  flex-direction: column;
}

#fascia-top-nav {
  flex: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 2rem;
  min-height: ${HEIGHT};
  padding: 0 1.5rem;
  background: ${brand.deepForestBg};
  font-family: ${fontFamily.sans.join(', ')};
}

#root {
  flex: 1;
  min-height: 0;
}

#root > div {
  height: 100%;
}

#fascia-top-nav a {
  color: ${MUTED_TEXT};
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 150ms;
}

#fascia-top-nav a:hover,
#fascia-top-nav a[aria-current='page']:hover {
  color: ${sun.DEFAULT};
}

#fascia-top-nav a[aria-current='page'],
#fascia-top-nav .fascia-home {
  color: white;
}

#fascia-top-nav .fascia-home {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
}

#fascia-top-nav nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 2rem;
}
`;

function link(label: string, storyId: string, api: API) {
  const anchor = document.createElement('a');
  anchor.href = `./?path=/docs/${storyId}`;
  anchor.textContent = label;
  anchor.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    api.selectStory(storyId);
  });
  return anchor;
}

/** Adds the top nav above Storybook's layout and keeps the current page highlighted. */
export function mountTopNav(api: API) {
  if (document.getElementById('fascia-top-nav')) return;

  const header = document.createElement('header');
  header.id = 'fascia-top-nav';

  const home = link('Fascia', SITE_PAGES[0].storyId, api);
  home.className = 'fascia-home';
  const logo = document.createElement('img');
  logo.src = './brand/logos/halth-logomark-white.svg';
  logo.alt = '';
  logo.height = 24;
  home.prepend(logo);

  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Fascia');
  const links = SITE_PAGES.map((page) => {
    const anchor = link(page.label, page.storyId, api);
    nav.append(anchor);
    return { page, anchor };
  });

  header.append(home, nav);
  document.body.prepend(header);

  const highlight = () => {
    const storyId = api.getUrlState().storyId ?? '';
    for (const { page, anchor } of links) {
      if (page.match(storyId)) anchor.setAttribute('aria-current', 'page');
      else anchor.removeAttribute('aria-current');
    }
  };
  highlight();
  return highlight;
}
