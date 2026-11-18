import type { Preview } from '@storybook/react-vite';
import type { ViewportMap } from 'storybook/viewport';

import '../src/styles.css';
import { theme } from './theme';

/** Sizes either side of the `sm` breakpoint (640px), where most components change layout. */
const viewports: ViewportMap = {
  mobileSmall: { name: 'Small mobile (320)', styles: { width: '320px', height: '568px' }, type: 'mobile' },
  mobile: { name: 'Mobile (390)', styles: { width: '390px', height: '844px' }, type: 'mobile' },
  tablet: { name: 'Tablet (834)', styles: { width: '834px', height: '1112px' }, type: 'tablet' },
  desktop: { name: 'Desktop (1280)', styles: { width: '1280px', height: '800px' }, type: 'desktop' },
};

const preview: Preview = {
  parameters: {
    docs: { theme },
    layout: 'centered',
    controls: { expanded: true },
    a11y: { test: 'error' },
    viewport: { options: viewports },
    options: {
      storySort: { order: ['Design System', 'Introduction', 'Guidelines', 'Components'] },
    },
  },
};

export default preview;
