import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 100,
        statements: 100,
        branches: 97.72,
        functions: 100,
      },
    },
  },
};
