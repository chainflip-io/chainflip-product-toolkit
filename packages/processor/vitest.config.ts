import config from '../../vitest.config';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 10.12,
        statements: 9.65,
        branches: 9.39,
        functions: 13.82,
        autoUpdate: true,
      },
    },
  },
};
