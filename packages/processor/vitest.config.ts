import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 45.55,
        statements: 45.39,
        branches: 55.8,
        functions: 47.86,
        autoUpdate: true,
      },
    },
  },
};
