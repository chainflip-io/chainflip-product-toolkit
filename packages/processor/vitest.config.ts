import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 45.75,
        statements: 45.58,
        branches: 55.8,
        functions: 48.69,
        autoUpdate: true,
      },
    },
  },
};
