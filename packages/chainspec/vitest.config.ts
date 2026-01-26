import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 77.31,
        statements: 76,
        branches: 71.69,
        functions: 78.57,
      },
    },
  },
};
