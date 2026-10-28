import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const root = import.meta.dirname;
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const externals = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
  'react',
];

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        index: resolve(root, 'src/index.ts'),
        avatar: resolve(root, 'src/avatar.ts'),
        'booking-card': resolve(root, 'src/booking-card.ts'),
        button: resolve(root, 'src/button.ts'),
        card: resolve(root, 'src/card.ts'),
        chip: resolve(root, 'src/chip.ts'),
        modal: resolve(root, 'src/modal.ts'),
        tabs: resolve(root, 'src/tabs.ts'),
        typography: resolve(root, 'src/typography.ts'),
        dropdown: resolve(root, 'src/dropdown.ts'),
        'attribute-chip': resolve(root, 'src/attribute-chip.ts'),
        'card-logo': resolve(root, 'src/card-logo.ts'),
        icons: resolve(root, 'src/icons.ts'),
        alert: resolve(root, 'src/alert.ts'),
        badge: resolve(root, 'src/badge.ts'),
        checkbox: resolve(root, 'src/checkbox.ts'),
        'copy-button': resolve(root, 'src/copy-button.ts'),
        'empty-state': resolve(root, 'src/empty-state.ts'),
        input: resolve(root, 'src/input.ts'),
        skeleton: resolve(root, 'src/skeleton.ts'),
        spinner: resolve(root, 'src/spinner.ts'),
        switch: resolve(root, 'src/switch.ts'),
        tooltip: resolve(root, 'src/tooltip.ts'),
        utils: resolve(root, 'src/utils.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: (id) =>
        externals.some((dep) => id === dep || id.startsWith(`${dep}/`)),
      output: {
        // One file per module keeps each component's 'use client' directive
        // scoped to that component, so Next.js server components stay server-side.
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
    sourcemap: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
