import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 29.76,
        statements: 28.79,
        branches: 26.15,
        functions: 27.27,
        autoUpdate: true,
      },
    },
  },
};
