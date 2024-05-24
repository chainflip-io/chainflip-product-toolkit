import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 14.32,
        statements: 13.75,
        branches: 11.72,
        functions: 19.54,
        autoUpdate: true,
      },
    },
  },
};