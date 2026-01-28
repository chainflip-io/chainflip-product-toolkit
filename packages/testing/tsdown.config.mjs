import { defineConfig } from 'tsdown';

export default defineConfig({
  minify: false,
  dts: true,
  unbundle: true,
  format: ['cjs', 'esm'],
  skipNodeModulesBundle: true,
  entry: ['./src/*.ts'],
  target: 'es2022',
  outExtensions: ({ format }) => ({
    dts: '.d.ts',
    js: format === 'es' ? '.js' : '.cjs',
  }),
});
