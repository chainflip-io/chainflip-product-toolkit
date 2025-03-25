import * as path from 'path';
import config from '../../vitest.config.mjs';

export default {
  ...config,
  test: {
    ...config.test,
    coverage: {
      ...config.test?.coverage,
      thresholds: {
        lines: 100,
        statements: 100,
        branches: 97.72,
        functions: 100,
      },
    },
  },
  resolve: {
    alias: {
      'scale-ts': path.join(
        import.meta.dirname,
        'node_modules',
        'scale-ts',
        'dist',
        'scale-ts.mjs',
      ),
    },
  },
};
