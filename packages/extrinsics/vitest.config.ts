import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 90.32,
        statements: 90.32,
        branches: 80.35,
        functions: 91.66,
        autoUpdate: true,
      },
    },
  },
};
