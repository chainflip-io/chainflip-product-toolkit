import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 38.46,
        statements: 38.55,
        branches: 50,
        functions: 39.18,
        autoUpdate: true,
      },
    },
  },
};
