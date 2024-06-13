import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 45.55,
        statements: 45.3,
        branches: 55.19,
        functions: 48.69,
        autoUpdate: true,
      },
    },
  },
};
