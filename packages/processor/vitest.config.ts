import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 45.86,
        statements: 45.68,
        branches: 55.8,
        functions: 49.12,
        autoUpdate: true,
      },
    },
  },
};
