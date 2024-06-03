import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 10.35,
        statements: 9.83,
        branches: 9.39,
        functions: 14.4,
        autoUpdate: true,
      },
    },
  },
};
