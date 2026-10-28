import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/tailwind-preset.ts',
    'src/nativewind-preset.ts',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
});
