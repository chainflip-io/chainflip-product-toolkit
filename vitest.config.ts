import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as url from 'url';
import * as path from 'path';

export default defineConfig({
  plugins: [
    tsconfigPaths({
      projects: [path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'tsconfig.json')],
    }),
  ],
});
