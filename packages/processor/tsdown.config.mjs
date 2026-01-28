import * as path from 'path';
import * as fs from 'fs/promises';
import { defineConfig } from 'tsdown';

const baseConfig = defineConfig({
  minify: false,
  dts: true,
  unbundle: true,
  format: ['esm', 'cjs'],
  target: 'es2022',
  inlineOnly: false,
  outExtensions: ({ format }) => {
    const type = format === 'es' ? 'm' : 'c';

    return { js: `.${type}js`, dts: `.d.${type}ts` };
  },
});

const BUILD_TARGET = process.env.BUILD_TARGET;

if (!BUILD_TARGET) {
  console.error('BUILD_TARGET env var is required');
  process.exit(1);
}

const versions = (
  await fs.readdir(path.join(import.meta.dirname, 'generated'), { withFileTypes: true })
)
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let config;
if (BUILD_TARGET === 'processor') {
  config = defineConfig({
    ...baseConfig,
    entry: ['./src/processor/*.ts'],
  });
} else if (BUILD_TARGET === 'generate') {
  config = defineConfig({
    ...baseConfig,
    entry: ['./src/codegen/generate.ts'],
    clean: false,
  });
} else if (versions.includes(BUILD_TARGET)) {
  config = defineConfig({
    ...baseConfig,
    entry: [`./generated/${BUILD_TARGET}/**/*.ts`],
    outDir: `./dist/${BUILD_TARGET}`,
  });
} else {
  console.error(`Unknown BUILD_TARGET: ${BUILD_TARGET}`);
  process.exit(1);
}

export default config;
