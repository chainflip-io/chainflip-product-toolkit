import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 36.85,
        statements: 36.85,
        branches: 94.18,
        functions: 61.53,
        autoUpdate: true,
      },
    },
  },
};
