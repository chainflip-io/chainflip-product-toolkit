import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';

const exclude = [
  '**/generated/**',
  '**/dist/**',
  '**/node_modules/**',
  '**/*.js',
  '**/*.d.ts',
  'packages/**/scripts/**',
];

export default defineConfig({
  plugins: [
    tsconfigPaths({
      projects: [path.join(import.meta.dirname, 'tsconfig.json')],
    }),
  ],
  test: {
    exclude,
    include: ['**/*.test.ts', '**/*.test.tsx'],
    coverage: {
      exclude,
      enabled: true,
      provider: 'istanbul',
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
});
