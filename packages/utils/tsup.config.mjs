import { defineConfig } from 'tsup';

export default defineConfig({
  minify: false,
  dts: true,
  bundle: true,
  format: ['cjs', 'esm'],
  external: ['*'],
  noExternal: ['@noble/hashes/*'],
  entry: ['./src/*.ts'],
  target: 'es2022',
});
