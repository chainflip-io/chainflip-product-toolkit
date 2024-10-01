import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 39.07,
        statements: 39.13,
        branches: 52.59,
        functions: 36.61,
        autoUpdate: true,
      },
    },
  },
};
