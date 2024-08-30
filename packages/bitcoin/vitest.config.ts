import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 94.61,
        statements: 92.95,
        branches: 82.53,
        functions: 100,
        autoUpdate: true,
      },
    },
  },
};
