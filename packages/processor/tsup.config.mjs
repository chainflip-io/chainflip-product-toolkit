import * as path from 'path';
import * as fs from 'fs/promises';
import { defineConfig } from 'tsup';
import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions';
import pkg from './package.json' with { type: 'json' };

const baseConfig = defineConfig({
  splitting: true,
  minify: false,
  dts: true,
  bundle: true,
  format: ['cjs', 'esm'],
  target: 'es2022',
  external: Object.keys(pkg.dependencies),
  outExtension: ({ format }) => {
    const type = format === 'esm' ? 'm' : 'c';

    return { js: `.${type}js`, dts: `.d.${type}ts` };
  },
  esbuildPlugins: [
    esbuildPluginFilePathExtensions({
      cjsExtension: 'cjs',
      esmExtension: 'mjs',
      filter: /^\./,
    }),
  ],
});

const processor = defineConfig({
  ...baseConfig,
  entry: ['./src/processor/*.ts'],
});

const generate = defineConfig({
  ...baseConfig,
  entry: ['./src/codegen/generate.ts'],
  external: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.devDependencies), 'prettier'],
  splitting: false,
  esbuildPlugins: [],
});

/**
 * @param {string} version
 */
const generated = (version) =>
  defineConfig({
    ...baseConfig,
    entry: [`./generated/${version}/**/*.ts`],
    outDir: `./dist/${version}`,
  });

const configs = (
  await fs.readdir(path.join(import.meta.dirname, 'generated'), { withFileTypes: true })
).reduce(
  (acc, dirent) => {
    if (dirent.isDirectory()) acc.push(generated(dirent.name));
    return acc;
  },
  [processor, generate],
);

export default configs;
