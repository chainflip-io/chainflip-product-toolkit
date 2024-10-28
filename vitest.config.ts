import * as path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

const exclude = [
  '**/generated/**',
  '**/dist/**',
  '**/node_modules/**',
  '**/*.js',
  '**/*.d.ts',
  '**/*.config.*',
  '**/scripts/**',
];

const include = ['**/*.test.ts', '**/*.test.tsx'];

export default defineConfig({
  plugins: [
    tsconfigPaths({
      projects: [path.join(import.meta.dirname, 'tsconfig.json')],
    }),
  ],
  test: {
    restoreMocks: true,
    exclude,
    include,
    coverage: {
      exclude: [...exclude, ...include],
      enabled: true,
    },
  },
});
