import { defineConfig } from 'tsup';

export default defineConfig({
  minify: false,
  dts: true,
  bundle: false,
  format: ['cjs', 'esm'],
  entry: ['./src/*.ts'],
  target: 'es2022',
});
