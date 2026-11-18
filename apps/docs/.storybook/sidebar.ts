import { primary, radii, stone } from '@halth/design-system-tokens';

/** Gap between the sidebar and the window edges: `top-2 bottom-2 left-2`, as the business app's nav rail. */
const INSET = '0.5rem';

const region = '#storybook-sidebar-region';

/** White at these opacities on `primary-700`, matching the product nav: text-white/70, hover:bg-white/10. */
const MUTED_TEXT = 'rgb(255 255 255 / 0.7)';
const HOVER_BG = 'rgb(255 255 255 / 0.1)';
const SELECTED_BG = 'rgb(255 255 255 / 0.2)';

/**
 * Storybook's sidebar styled as the business app's nav rail: a `primary-700`
 * panel inset from the window with `rounded-container` corners, and items with
 * the same radius and white-opacity states. Scoped CSS rather than the manager
 * theme, because the theme's text colour also styles menus and the Controls
 * panel, which stay white.
 */
export const sidebarStyles = `
${region} {
  padding: ${INSET};
  background: ${stone[50]};
}

${region} > div:last-child {
  height: 100%;
  overflow: hidden;
  border-radius: ${radii.container};
  background: ${primary[700]};
}

${region} .sidebar-header,
${region} .sidebar-header button {
  color: white;
}

${region} .sidebar-subheading,
${region} .sidebar-subheading button,
${region} .sidebar-item,
${region} .sidebar-item a,
${region} .sidebar-item svg {
  color: ${MUTED_TEXT};
}

${region} .sidebar-item {
  border-radius: ${radii.container};
}

${region} .sidebar-item:hover {
  background: ${HOVER_BG};
}

${region} .sidebar-item:hover,
${region} .sidebar-item:hover a,
${region} .sidebar-item:hover svg,
${region} .sidebar-item[data-selected='true'],
${region} .sidebar-item[data-selected='true'] a,
${region} .sidebar-item[data-selected='true'] svg {
  color: white;
}

${region} .sidebar-item[data-selected='true'],
${region} .sidebar-item[data-selected='true']:hover {
  background: ${SELECTED_BG};
}

${region} button[role='switch'] {
  color: ${MUTED_TEXT};
}

${region} .sidebar-item [data-testid='context-menu'] {
  background: transparent;
  box-shadow: none;
  color: white;
}

${region} .search-field {
  border-radius: ${radii.container};
  background: ${HOVER_BG};
}

${region} #storybook-explorer-searchfield {
  color: white;
}

${region} #storybook-explorer-menu,
${region} .search-result-item,
${region} .search-result-item svg {
  color: ${MUTED_TEXT};
}

${region} .search-result-item {
  border-radius: ${radii.container};
}

${region} #storybook-explorer-menu strong {
  color: white;
}

${region} #storybook-explorer-menu small {
  color: ${MUTED_TEXT};
}

${region} .search-result-item--label,
${region} .search-result-item mark {
  color: white;
}

${region} .search-result-item mark {
  background: transparent;
  font-weight: 700;
}

${region} .search-result-item:hover,
${region} .search-result-item[aria-selected='true'] {
  background: ${HOVER_BG};
}

${region} button[aria-label*='tag filter' i] {
  border-radius: ${radii.pill};
  color: ${MUTED_TEXT};
}

${region} button[aria-label*='active tag filter' i] {
  background: ${SELECTED_BG};
  color: white;
}

${region} button[aria-label*='active tag filter' i] > :not(svg) {
  background: white;
  box-shadow: none;
}

${region} #storybook-explorer-searchfield::placeholder,
${region} .search-field svg,
${region} .search-field code {
  color: ${MUTED_TEXT};
}
`;
