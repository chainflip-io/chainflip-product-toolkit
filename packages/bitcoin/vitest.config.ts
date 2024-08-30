import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 0,
        statements: 0,
        branches: 0,
        functions: 0,
      },
    },
  },
};
