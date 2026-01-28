import * as path from 'path';
import { coverageConfigDefaults } from 'vitest/config';
import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      exclude: ['**/index.ts', '**/__test__/**', ...coverageConfigDefaults.exclude],
      thresholds: {
        lines: 100,
        statements: 100,
        branches: 95,
        functions: 100,
      },
    },
  },
  resolve: {
    alias: {
      'scale-ts': path.join(
        import.meta.dirname,
        'node_modules',
        'scale-ts',
        'dist',
        'scale-ts.mjs',
      ),
    },
  },
};
