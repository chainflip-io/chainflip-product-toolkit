import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 46.9,
        statements: 46.89,
        branches: 57.51,
        functions: 48.71,
        autoUpdate: true,
      },
    },
  },
};
