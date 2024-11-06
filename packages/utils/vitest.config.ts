import { coverageConfigDefaults } from 'vitest/config';
import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      exclude: ['**/consts.ts', '**/chainflip.ts', ...coverageConfigDefaults.exclude],
      thresholds: {
        lines: 90,
        statements: 90,
        branches: 90,
        functions: 90,
      },
    },
  },
};
