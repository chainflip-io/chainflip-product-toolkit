import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 99.94,
        statements: 99.94,
        branches: 98.36,
        functions: 100,
        autoUpdate: true,
      },
    },
  },
};
