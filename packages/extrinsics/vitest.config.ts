import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 90.52,
        statements: 91.42,
        branches: 88.37,
        functions: 90,
        autoUpdate: true,
      },
    },
  },
};
