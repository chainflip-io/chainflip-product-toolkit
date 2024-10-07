import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 29.96,
        statements: 28.98,
        branches: 26.15,
        functions: 28,
        autoUpdate: true,
      },
    },
  },
};
