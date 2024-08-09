import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 47.52,
        statements: 47.47,
        branches: 58.11,
        functions: 48.71,
        autoUpdate: true,
      },
    },
  },
};
