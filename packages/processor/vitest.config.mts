import config from '../../vitest.config.mjs';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
    },
  },
};
