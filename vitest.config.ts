import * as fs from 'fs/promises';
import * as path from 'path';
// import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

const exclude = [
  '**/generated/**',
  '**/dist/**',
  '**/node_modules/**',
  '**/*.js',
  '**/*.d.ts',
  '**/*.config.*',
  '**/scripts/**',
];

const include = ['**/*.test.ts', '**/*.test.tsx'];

export default defineConfig({
  // plugins: [
  //   tsconfigPaths({
  //     projects: [path.join(import.meta.dirname, 'tsconfig.json')],
  //   }),
  // ],
  test: {
    restoreMocks: true,
    exclude,
    include,
    coverage: {
      exclude: [...exclude, ...include],
      enabled: true,
    },
  },
  resolve: {
    alias: [
      {
        find: 'scale-ts',
        replacement: '',
        async customResolver(source, importer) {
          const packages = (await fs.readdir(path.join(import.meta.dirname, 'packages'))).map((p) =>
            path.join(import.meta.dirname, 'packages', p),
          );
          const pkg = packages.find((p) => importer!.startsWith(p))!;
          return path.join(pkg, 'node_modules', 'scale-ts', 'dist', 'scale-ts.mjs');
        },
      },
    ],
  },
});
