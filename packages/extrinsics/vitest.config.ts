import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 89.18,
        statements: 90.12,
        branches: 90,
        functions: 90.9,
        autoUpdate: true,
      },
    },
  },
};
