import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 51.36,
        statements: 51.19,
        branches: 59.53,
        functions: 50.41,
        autoUpdate: true,
      },
    },
  },
};
