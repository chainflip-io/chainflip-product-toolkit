import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  { ignores: ['**/coverage', '**/dist', '**/generated', '**/wasm/built'] },
  { files: ['**/*.ts'], rules: { 'no-console': 'error' } },
  {
    files: ['packages/processor/**/*.ts'],
    rules: { 'no-console': 'off' },
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ...pluginJs.configs.recommended,
  },
  ...tseslint.configs.strictTypeChecked,
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
        },
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
        },
      ],
      '@typescript-eslint/no-invalid-void-type': [
        'error',
        {
          allowInGenericTypeArguments: true,
        },
      ],
    },
  },
  {
    files: ['**/*.js', '**/*.config.ts'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-base-to-string': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      'no-console': 'off',
    },
  },
];
