import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 95.34,
        statements: 95.34,
        branches: 92.85,
        functions: 100,
        autoUpdate: true,
      },
    },
  },
};
