import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(ts|tsx)',
    '../../../packages/ui/src/**/*.stories.@(ts|tsx)',
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  // Brand assets (logos, marks, illustrations) served at ./brand/… for the Brand assets page.
  staticDirs: ['../public'],
  framework: '@storybook/react-vite',
  async viteFinal(viteConfig) {
    viteConfig.plugins = [...(viteConfig.plugins ?? []), tailwindcss()];
    // Stories import @halth/design-system source, so Vite only discovers its dependencies
    // mid-session and serves stale pre-bundles (504) until restarted.
    viteConfig.optimizeDeps = {
      ...viteConfig.optimizeDeps,
      include: [...(viteConfig.optimizeDeps?.include ?? []), '@heroui/react'],
    };
    return viteConfig;
  },
};

export default config;
