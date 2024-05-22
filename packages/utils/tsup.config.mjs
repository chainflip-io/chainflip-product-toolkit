import { defineConfig } from 'tsup';

export default defineConfig({
  minify: false,
  dts: true,
  bundle: true,
  format: ['cjs', 'esm'],
  external: ['*'],
  noExternal: ['@noble/hashes/blake2b'],
  entry: ['./src/*.ts'],
  target: 'es2022',
});
