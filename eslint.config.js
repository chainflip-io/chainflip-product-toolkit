import config from './packages/eslint-config/base.js';

export default config({
  tsconfigRootDir: import.meta.dirname,
  project: './tsconfig.eslint.json',
});
