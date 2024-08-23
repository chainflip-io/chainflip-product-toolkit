import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 51.17,
        statements: 51.1,
        branches: 59.53,
        functions: 50.41,
        autoUpdate: true,
      },
    },
  },
};
