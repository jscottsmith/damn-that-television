import { defineConfig } from 'tsup';

const asciiLoader = {
  esbuildOptions(options: { loader?: Record<string, string> }) {
    options.loader = { ...options.loader, '.ascii': 'text', '.level': 'text' };
  },
};

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: true,
    clean: true,
    sourcemap: true,
    ...asciiLoader,
  },
  {
    entry: ['src/cli/bin.ts'],
    format: ['esm'],
    clean: false,
    sourcemap: true,
    banner: {
      js: '#!/usr/bin/env node',
    },
    ...asciiLoader,
  },
]);
