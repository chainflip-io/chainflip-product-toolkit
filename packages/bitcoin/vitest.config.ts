import { coverageConfigDefaults } from 'vitest/config';
import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      exclude: ['**/index.ts', ...coverageConfigDefaults.exclude],
      thresholds: {
        lines: 100,
        statements: 100,
        branches: 100,
        functions: 100,
        autoUpdate: true,
      },
    },
  },
};
