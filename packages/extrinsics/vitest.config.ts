import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 90.96,
        statements: 90.96,
        branches: 84.12,
        functions: 92.3,
        autoUpdate: true,
      },
    },
  },
};
