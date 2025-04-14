import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 93.54,
        statements: 93.54,
        branches: 95,
        functions: 87.5,
        autoUpdate: true,
      },
    },
  },
};
