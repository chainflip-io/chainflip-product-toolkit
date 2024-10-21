import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 35.69,
        statements: 35.69,
        branches: 94.31,
        functions: 61.53,
        autoUpdate: true,
      },
    },
  },
};
