import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 45.65,
        statements: 45.49,
        branches: 55.8,
        functions: 48.27,
        autoUpdate: true,
      },
    },
  },
};
