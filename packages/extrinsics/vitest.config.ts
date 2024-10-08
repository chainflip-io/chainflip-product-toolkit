import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 86.66,
        statements: 87.3,
        branches: 89.28,
        functions: 86.95,
        autoUpdate: true,
      },
    },
  },
};
