import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 85.71,
        statements: 85.88,
        branches: 72.22,
        functions: 90.9,
      },
    },
  },
};
