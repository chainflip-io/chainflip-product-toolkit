import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 98.01,
        statements: 98.01,
        branches: 96.77,
        functions: 100,
        autoUpdate: true,
      },
    },
  },
};
