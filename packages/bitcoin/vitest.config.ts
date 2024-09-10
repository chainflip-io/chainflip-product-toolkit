import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 94.69,
        statements: 93.05,
        branches: 85.33,
        functions: 100,
        autoUpdate: true,
      },
    },
  },
};
