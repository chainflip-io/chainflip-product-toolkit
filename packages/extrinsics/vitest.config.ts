import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 90.36,
        statements: 90.36,
        branches: 80.64,
        functions: 92.3,
        autoUpdate: true,
      },
    },
  },
};
