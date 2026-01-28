import { defineConfig } from 'tsdown';

export default defineConfig({
  minify: false,
  dts: true,
  unbundle: true,
  format: ['cjs', 'esm'],
  entry: ['./generated/**/*.ts'],
  target: 'es2022',
  outExtensions: ({ format }) => ({
    js: format === 'es' ? '.mjs' : '.cjs',
    dts: format === 'es' ? '.d.mts' : '.d.cts',
  }),
});
