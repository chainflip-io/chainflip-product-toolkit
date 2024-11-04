import { defineConfig } from 'tsup';
import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions';

export default defineConfig({
  splitting: true,
  minify: false,
  dts: true,
  bundle: true,
  format: ['esm', 'cjs'],
  entry: ['./src/index.ts'],
  target: 'es2022',
  outExtension: ({ format }) => ({
    js: format === 'esm' ? '.mjs' : '.cjs',
    dts: format === 'esm' ? '.d.mts' : '.d.cts',
  }),
  esbuildPlugins: [
    esbuildPluginFilePathExtensions({
      cjsExtension: 'cjs',
      esmExtension: 'mjs',
    }),
  ],
});
