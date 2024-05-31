import * as fs from 'fs/promises';
import * as path from 'path';
import { defineConfig } from 'tsup';
import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions';

export default defineConfig({
  splitting: true,
  minify: false,
  dts: true,
  bundle: true,
  format: ['esm', 'cjs'],
  entry: ['./wasm/index.ts'],
  target: 'es2022',
  outExtension: ({ format }) => ({
    js: format === 'esm' ? '.mjs' : '.cjs',
    dts: format === 'esm' ? '.d.mts' : '.d.cts',
  }),
  esbuildPlugins: [
    {
      name: 'wasm',
      setup: (build) => {
        build.onResolve({ filter: /(\.wasm|bitcoin\.js)$/ }, (args) => ({
          path: args.path,
          namespace: 'wasm',
          pluginData: args.resolveDir,
        }));
        build.onLoad({ filter: /.*/, namespace: 'wasm' }, async (args) => {
          const fullPath = path.join(args.pluginData as string, args.path);

          if (!args.path.endsWith('bitcoin.js')) return { contents: '', loader: 'empty' };

          const contents = (await fs.readFile(fullPath, 'utf8'))
            .replace(/.+require\(`util`\);\n/, '')
            .replace(/const path = .+\n/, '')
            .replace(
              /const bytes = .+\n/,
              `
const bytes = (() => {
  const base64 = "${await fs.readFile(path.join(args.pluginData as string, 'built', 'bitcoin_bg.wasm'), 'base64')}";
  const binary = atob(base64);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return array.buffer;
})();
            `,
            );
          return { contents };
        });
      },
    },
    esbuildPluginFilePathExtensions({
      cjsExtension: 'cjs',
      esmExtension: 'mjs',
    }),
  ],
});
