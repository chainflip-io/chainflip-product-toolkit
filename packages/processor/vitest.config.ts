import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 9.97,
        statements: 9.52,
        branches: 9.09,
        functions: 13.7,
        autoUpdate: true,
      },
    },
  },
};
