import { defineConfig } from 'tsup';

export default defineConfig({
  splitting: true,
  minify: false,
  dts: true,
  bundle: false,
  format: ['cjs', 'esm'],
  entry: ['./src/*.ts'],
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
