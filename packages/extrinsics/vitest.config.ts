import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 93.46,
        statements: 93.46,
        branches: 94.91,
        functions: 87.5,
        autoUpdate: true,
      },
    },
  },
};
