import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 94.73,
        statements: 92.8,
        branches: 80,
        functions: 100,
        autoUpdate: true,
      },
    },
  },
};
