import { defineConfig } from 'tsdown';

export default defineConfig({
  minify: false,
  dts: true,
  unbundle: true,
  format: ['cjs', 'esm'],
  entry: ['./generated/**/*.ts'],
  target: 'es2022',
  outExtensions: ({ format }) => ({
    js: format === 'es' ? '.js' : '.cjs',
    dts: '.d.ts',
  }),
});
