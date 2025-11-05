import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 86.87,
        statements: 86.87,
        branches: 76.78,
        functions: 91.66,
        autoUpdate: true,
      },
    },
  },
};
