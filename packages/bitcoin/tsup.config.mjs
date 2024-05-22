import { defineConfig } from 'tsup';

export default defineConfig({
  minify: false,
  dts: true,
  bundle: false,
  format: ['cjs', 'esm'],
  entry: ['./wasm/index.ts'],
  target: 'es2022',
});
