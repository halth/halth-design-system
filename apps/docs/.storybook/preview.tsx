import type { Preview } from '@storybook/react-vite';

import '../src/styles.css';
import { theme } from './theme';

const preview: Preview = {
  parameters: {
    docs: { theme },
    layout: 'centered',
    controls: { expanded: true },
    a11y: { test: 'error' },
    options: {
      storySort: { order: ['Introduction', 'Guidelines', 'Design System', 'Components'] },
    },
  },
};

export default preview;
