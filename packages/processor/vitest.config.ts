import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 37.83,
        statements: 37.97,
        branches: 49.2,
        functions: 39.18,
        autoUpdate: true,
      },
    },
  },
};
