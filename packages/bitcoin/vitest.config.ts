import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 97.72,
        statements: 97.72,
        branches: 96.42,
        functions: 100,
        autoUpdate: true,
      },
    },
  },
};
