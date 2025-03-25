import config from '../../vitest.config.mjs';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 29.76,
        statements: 28.79,
        branches: 88.88,
        functions: 68.75,
        autoUpdate: true,
      },
    },
  },
};
