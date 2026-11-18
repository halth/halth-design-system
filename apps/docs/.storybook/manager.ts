import { DOCS_RENDERED, SET_CURRENT_STORY, STORY_CHANGED } from 'storybook/internal/core-events';
import { addons } from 'storybook/manager-api';

import { sidebarStyles } from './sidebar';
import { theme } from './theme';
import { isComponentEntry, mountTopNav, topNavStyles } from './topNav';

addons.setConfig({
  theme,
  // The sidebar and toolbar only show on component pages; Design System, Introduction and Guidelines are full width under the top nav.
  layoutCustomisations: {
    showSidebar: (state, defaultValue) => (isComponentEntry(state.storyId) ? defaultValue : false),
    showToolbar: (state, defaultValue) => (isComponentEntry(state.storyId) ? defaultValue : false),
  },
});

const style = document.createElement('style');
style.textContent = sidebarStyles + topNavStyles;
document.head.appendChild(style);

addons.register('fascia/top-nav', (api) => {
  const highlight = mountTopNav(api);
  if (!highlight) return;
  for (const event of [SET_CURRENT_STORY, STORY_CHANGED, DOCS_RENDERED]) {
    api.on(event, highlight);
  }
});
