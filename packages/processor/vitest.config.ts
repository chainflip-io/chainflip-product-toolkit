import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 49.69,
        statements: 49.52,
        branches: 59.33,
        functions: 47.36,
        autoUpdate: true,
      },
    },
  },
};
