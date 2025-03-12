import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

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
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
  {
    ...pluginJs.configs.recommended,
  },
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.ts', '**/*.tsx'],
    // i copied all these from airbnb-base
    rules: {
      // enforce or disallow variable initializations at definition
      'init-declarations': 'off',
      // disallow the catch clause parameter name being the same as a variable in the outer scope
      'no-catch-shadow': 'off',
      // disallow labels that share a name with a variable
      // https://eslint.org/docs/rules/no-label-var
      'no-label-var': 'error',
      // disallow declaration of variables already declared in the outer scope
      'no-shadow': 'error',
      // disallow use of undefined when initializing variables
      'no-undef-init': 'error',
      // disallow use of undefined variable
      // https://eslint.org/docs/rules/no-undefined
      'no-undefined': 'off',
      // enforces no braces where they can be omitted
      // https://eslint.org/docs/rules/arrow-body-style
      // TODO: enable requireReturnForObjectLiteral?
      'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: false }],
      // disallow importing from the same path more than once
      // https://eslint.org/docs/rules/no-duplicate-imports
      // replaced by https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md
      'no-duplicate-imports': 'off',
      // disallow symbol constructor
      // https://eslint.org/docs/rules/no-new-symbol
      'no-new-symbol': 'error',
      // Disallow specified names in exports
      // https://eslint.org/docs/rules/no-restricted-exports
      'no-restricted-exports': [
        'error',
        {
          restrictedNamedExports: [
            'default', // use `export default` to provide a default export
            'then', // this will cause tons of confusion when your module is dynamically `import()`ed, and will break in most node ESM versions
          ],
        },
      ],
      // disallow useless computed property keys
      // https://eslint.org/docs/rules/no-useless-computed-key
      'no-useless-computed-key': 'error',
      // disallow renaming import, export, and destructured assignments to the same name
      // https://eslint.org/docs/rules/no-useless-rename
      'no-useless-rename': [
        'error',
        { ignoreDestructuring: false, ignoreImport: false, ignoreExport: false },
      ],
      // require let or const instead of var
      'no-var': 'error',
      // require method and property shorthand syntax for object literals
      // https://eslint.org/docs/rules/object-shorthand
      'object-shorthand': ['error', 'always', { ignoreConstructors: false, avoidQuotes: true }],
      // suggest using arrow functions as callbacks
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
      // suggest using of const declaration for variables that are never modified after declared
      'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: true }],
      // Prefer destructuring from arrays and objects
      // https://eslint.org/docs/rules/prefer-destructuring
      'prefer-destructuring': [
        'error',
        {
          VariableDeclarator: { array: false, object: true },
          AssignmentExpression: { array: true, object: false },
        },
        { enforceForRenamedProperties: false },
      ],
      // disallow parseInt() in favor of binary, octal, and hexadecimal literals
      // https://eslint.org/docs/rules/prefer-numeric-literals
      'prefer-numeric-literals': 'error',
      // suggest using Reflect methods where applicable
      // https://eslint.org/docs/rules/prefer-reflect
      'prefer-reflect': 'off',
      // use rest parameters instead of arguments
      // https://eslint.org/docs/rules/prefer-rest-params
      'prefer-rest-params': 'error',
      // suggest using the spread syntax instead of .apply()
      // https://eslint.org/docs/rules/prefer-spread
      'prefer-spread': 'error',
      // suggest using template literals instead of string concatenation
      // https://eslint.org/docs/rules/prefer-template
      'prefer-template': 'error',
      // require a Symbol description
      // https://eslint.org/docs/rules/symbol-description
      'symbol-description': 'error',
      // enforces getter/setter pairs in objects
      // https://eslint.org/docs/rules/accessor-pairs
      'accessor-pairs': 'off',
      // enforces return statements in callbacks of array's methods
      // https://eslint.org/docs/rules/array-callback-return
      'array-callback-return': ['error', { allowImplicit: true }],
      // treat var statements as if they were block scoped
      // https://eslint.org/docs/rules/block-scoped-var
      'block-scoped-var': 'error',
      // specify curly brace conventions for all control statements
      // https://eslint.org/docs/rules/curly
      curly: ['error', 'multi-line'], // multiline
      // Enforce default clauses in switch statements to be last
      // https://eslint.org/docs/rules/default-case-last
      'default-case-last': 'error',
      // https://eslint.org/docs/rules/default-param-last
      'default-param-last': 'error',
      // encourages use of dot notation whenever possible
      // https://eslint.org/docs/rules/dot-notation
      'dot-notation': ['error', { allowKeywords: true }],
      // require the use of === and !==
      // https://eslint.org/docs/rules/eqeqeq
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      // Require grouped accessor pairs in object literals and classes
      // https://eslint.org/docs/rules/grouped-accessor-pairs
      'grouped-accessor-pairs': 'error',
      // make sure for-in loops have an if statement
      // https://eslint.org/docs/rules/guard-for-in
      'guard-for-in': 'error',
      // disallow the use of alert, confirm, and prompt
      // https://eslint.org/docs/rules/no-alert
      'no-alert': 'warn',
      // disallow use of arguments.caller or arguments.callee
      // https://eslint.org/docs/rules/no-caller
      'no-caller': 'error',
      // Disallow returning value in constructor
      // https://eslint.org/docs/rules/no-constructor-return
      'no-constructor-return': 'error',
      // disallow division operators explicitly at beginning of regular expression
      // https://eslint.org/docs/rules/no-div-regex
      'no-div-regex': 'off',
      // disallow else after a return in an if
      // https://eslint.org/docs/rules/no-else-return
      'no-else-return': ['error', { allowElseIf: false }],
      // disallow comparisons to null without a type-checking operator
      // https://eslint.org/docs/rules/no-eq-null
      'no-eq-null': 'off',
      // disallow use of eval()
      // https://eslint.org/docs/rules/no-eval
      'no-eval': 'error',
      // disallow adding to native types
      // https://eslint.org/docs/rules/no-extend-native
      'no-extend-native': 'error',
      // disallow unnecessary function binding
      // https://eslint.org/docs/rules/no-extra-bind
      'no-extra-bind': 'error',
      // disallow Unnecessary Labels
      // https://eslint.org/docs/rules/no-extra-label
      'no-extra-label': 'error',
      // deprecated in favor of no-global-assign
      // https://eslint.org/docs/rules/no-native-reassign
      'no-native-reassign': 'off',
      // disallow implicit type conversions
      // https://eslint.org/docs/rules/no-implicit-coercion
      'no-implicit-coercion': ['off', { boolean: false, number: true, string: true, allow: [] }],
      // disallow var and named functions in global scope
      // https://eslint.org/docs/rules/no-implicit-globals
      'no-implicit-globals': 'off',
      // disallow use of eval()-like methods
      // https://eslint.org/docs/rules/no-implied-eval
      'no-implied-eval': 'error',
      // disallow this keywords outside of classes or class-like objects
      // https://eslint.org/docs/rules/no-invalid-this
      'no-invalid-this': 'off',
      // disallow usage of __iterator__ property
      // https://eslint.org/docs/rules/no-iterator
      'no-iterator': 'error',
      // disallow use of labels for anything other than loops and switches
      // https://eslint.org/docs/rules/no-labels
      'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
      // disallow unnecessary nested blocks
      // https://eslint.org/docs/rules/no-lone-blocks
      'no-lone-blocks': 'error',
      // disallow creation of functions within loops
      // https://eslint.org/docs/rules/no-loop-func
      'no-loop-func': 'error',
      // disallow magic numbers
      // https://eslint.org/docs/rules/no-magic-numbers
      'no-magic-numbers': [
        'off',
        { ignore: [], ignoreArrayIndexes: true, enforceConst: true, detectObjects: false },
      ],
      // disallow use of multiline strings
      // https://eslint.org/docs/rules/no-multi-str
      'no-multi-str': 'error',
      // disallow use of new operator when not part of the assignment or comparison
      // https://eslint.org/docs/rules/no-new
      'no-new': 'error',
      // disallow use of new operator for Function object
      // https://eslint.org/docs/rules/no-new-func
      'no-new-func': 'error',
      // disallows creating new instances of String, Number, and Boolean
      // https://eslint.org/docs/rules/no-new-wrappers
      'no-new-wrappers': 'error',
      // disallow use of octal escape sequences in string literals, such as
      // var foo = 'Copyright \251';
      // https://eslint.org/docs/rules/no-octal-escape
      'no-octal-escape': 'error',
      // disallow reassignment of function parameters
      // disallow parameter object manipulation except for specific exclusions
      // rule: https://eslint.org/docs/rules/no-param-reassign.html
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: [
            'acc', // for reduce accumulators
            'accumulator', // for reduce accumulators
            'e', // for e.returnvalue
            'ctx', // for Koa routing
            'context', // for Koa routing
            'req', // for Express requests
            'request', // for Express requests
            'res', // for Express responses
            'response', // for Express responses
            '$scope', // for Angular 1 scopes
            'staticContext', // for ReactRouter context
          ],
        },
      ],
      // disallow usage of __proto__ property
      // https://eslint.org/docs/rules/no-proto
      'no-proto': 'error',
      // disallow certain object properties
      // https://eslint.org/docs/rules/no-restricted-properties
      'no-restricted-properties': [
        'error',
        { object: 'arguments', property: 'callee', message: 'arguments.callee is deprecated' },
        { object: 'global', property: 'isFinite', message: 'Please use Number.isFinite instead' },
        { object: 'self', property: 'isFinite', message: 'Please use Number.isFinite instead' },
        { object: 'window', property: 'isFinite', message: 'Please use Number.isFinite instead' },
        { object: 'global', property: 'isNaN', message: 'Please use Number.isNaN instead' },
        { object: 'self', property: 'isNaN', message: 'Please use Number.isNaN instead' },
        { object: 'window', property: 'isNaN', message: 'Please use Number.isNaN instead' },
        { property: '__defineGetter__', message: 'Please use Object.defineProperty instead.' },
        { property: '__defineSetter__', message: 'Please use Object.defineProperty instead.' },
        {
          object: 'Math',
          property: 'pow',
          message: 'Use the exponentiation operator (**) instead.',
        },
      ],
      // disallow use of assignment in return statement // https://eslint.org/docs/rules/no-return-assign
      'no-return-assign': ['error', 'always'],
      // disallow redundant `return await`
      // https://eslint.org/docs/rules/no-return-await
      'no-return-await': 'error',
      // disallow use of `javascript:` urls.
      // https://eslint.org/docs/rules/no-script-url
      'no-script-url': 'error',
      // disallow comparisons where both sides are exactly the same
      // https://eslint.org/docs/rules/no-self-compare
      'no-self-compare': 'error',
      // disallow use of comma operator
      // https://eslint.org/docs/rules/no-sequences
      'no-sequences': 'error',
      // restrict what can be thrown as an exception
      // https://eslint.org/docs/rules/no-throw-literal
      'no-throw-literal': 'error',
      // disallow unmodified conditions of loops
      // https://eslint.org/docs/rules/no-unmodified-loop-condition
      'no-unmodified-loop-condition': 'off',
      // disallow usage of expressions in statement position
      // https://eslint.org/docs/rules/no-unused-expressions
      'no-unused-expressions': [
        'error',
        { allowShortCircuit: false, allowTernary: false, allowTaggedTemplates: false },
      ],
      // disallow unnecessary .call() and .apply()
      // https://eslint.org/docs/rules/no-useless-call
      'no-useless-call': 'off',
      // disallow useless string concatenation
      // https://eslint.org/docs/rules/no-useless-concat
      'no-useless-concat': 'error',
      // disallow redundant return; keywords
      // https://eslint.org/docs/rules/no-useless-return
      'no-useless-return': 'error',
      // disallow usage of configurable warning terms in comments: e.g. todo
      // https://eslint.org/docs/rules/no-warning-comments
      'no-warning-comments': ['off', { terms: ['todo', 'fixme', 'xxx'], location: 'start' }],
      // require using Error objects as Promise rejection reasons
      // https://eslint.org/docs/rules/prefer-promise-reject-errors
      'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
      // Suggest using named capture group in regular expression
      // https://eslint.org/docs/rules/prefer-named-capture-group
      'prefer-named-capture-group': 'off',
      // https://eslint.org/docs/rules/prefer-regex-literals
      'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
      // Enforce the use of u flag on RegExp
      // https://eslint.org/docs/rules/require-unicode-regexp
      'require-unicode-regexp': 'off',
      // requires to declare all vars on top of their containing scope
      // https://eslint.org/docs/rules/vars-on-top
      'vars-on-top': 'error',
      // require immediate function invocation to be wrapped in parentheses
      // https://eslint.org/docs/rules/wrap-iife.html
      'wrap-iife': ['error', 'outside', { functionPrototypeMethods: false }],
      // require or disallow Yoda conditions
      // https://eslint.org/docs/rules/yoda
      yoda: 'error',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      import: importPlugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
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
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'object-shorthand': ['error', 'always'],
      'import/no-extraneous-dependencies': 'off',
      'import/extensions': 'off',
      'import/prefer-default-export': 'off',
      'import/no-unresolved': 'off',
      'import/order': [
        'error',
        {
          pathGroups: [
            { pattern: '@/**', group: 'internal' },
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: 'next/**', group: 'external', position: 'before' },
          ],
          groups: [['external', 'builtin'], 'internal', ['sibling', 'parent'], 'index'],
          pathGroupsExcludedImportTypes: ['internal'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
    },
  },
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.config.ts', '**/scripts/*'],
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
