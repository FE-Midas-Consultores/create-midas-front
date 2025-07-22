import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import checkFilePlugin from 'eslint-plugin-check-file'
import importOrderPlugin from 'eslint-plugin-import'
import unicornPlugin from 'eslint-plugin-unicorn'
import tsEslint from 'typescript-eslint'

export default [
  {
    ignores: ['node_modules', 'build', './src/templates'],
  },
  // Vanilla ESLint
  {
    rules: {
      ...eslint.configs.recommended.rules,
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-await-in-loop': 'error',
      'no-console': 'error',
      'no-else-return': 'warn',
      'no-implicit-coercion': 'error',
      'no-param-reassign': 'error',
      'no-return-await': 'error',
      'no-self-compare': 'error',
      'no-undef-init': 'warn',
      'no-unneeded-ternary': 'error',
      'no-var': 'error',
      'object-shorthand': 'warn',
      'prefer-const': 'warn',
      'prefer-object-spread': 'warn',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'warn',
    },
  },
  // Check files
  {
    plugins: { 'check-file': checkFilePlugin },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        { '**/*.{js,jsx,ts,tsx}': 'KEBAB_CASE' },
        { ignoreMiddleExtensions: true },
      ],
      'check-file/folder-naming-convention': ['error', { 'src/**/': 'KEBAB_CASE' }],
    },
  },
  // Import order
  {
    plugins: { import: importOrderPlugin },
    rules: {
      'import/first': 'error',
      'import/newline-after-import': 'warn',
      'import/no-cycle': 'error',
      'import/no-extraneous-dependencies': ['error', { includeTypes: true }],
      'import/no-mutable-exports': 'error',
      'import/no-self-import': 'error',
      'import/no-useless-path-segments': 'error',
      'import/order': [
        'warn',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          pathGroups: [
            { pattern: '@/**', group: 'internal', position: 'after' },
            {
              pattern: '{react,react-dom,react-dom/**}',
              group: 'builtin',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'internal'],
          warnOnUnassignedImports: true,
        },
      ],
    },
  },
  // Stylistic
  {
    rules: {
      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'always', prev: '*', next: 'block-like' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['singleline-const', 'singleline-let', 'singleline-var'],
          next: ['singleline-const', 'singleline-let', 'singleline-var'],
        },
      ],
    },
  },
  // TypeScript
  ...[
    ...tsEslint.configs.strictTypeChecked,
    ...tsEslint.configs.stylisticTypeChecked,
    {
      languageOptions: {
        parserOptions: {
          project: './tsconfig.json',
          tsconfigRootDir: import.meta.dirname,
        },
      },
      rules: {
        '@typescript-eslint/consistent-type-exports': [
          'warn',
          { fixMixedExportsWithInlineTypeSpecifier: true },
        ],
        '@typescript-eslint/consistent-type-imports': ['warn', { fixStyle: 'inline-type-imports' }],
        '@typescript-eslint/default-param-last': 'error',
        '@typescript-eslint/member-ordering': [
          'error',
          { interfaces: { order: 'natural-case-insensitive' } },
        ],
        '@typescript-eslint/method-signature-style': 'warn',
        '@typescript-eslint/naming-convention': [
          'error',
          { format: ['PascalCase'], selector: ['typeLike', 'enumMember'] },
          {
            custom: {
              match: false,
              regex: '^I[A-Z]|^(Interface|Props|State)$',
            },
            format: ['PascalCase'],
            selector: 'interface',
          },
        ],
        '@typescript-eslint/no-confusing-void-expression': [
          'error',
          { ignoreArrowShorthand: true },
        ],
        '@typescript-eslint/no-loop-func': 'error',
        '@typescript-eslint/no-redundant-type-constituents': 'warn',
        '@typescript-eslint/no-unnecessary-qualifier': 'warn',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
        '@typescript-eslint/prefer-nullish-coalescing': [
          'error',
          {
            ignorePrimitives: {
              bigint: true,
              boolean: true,
              number: true,
              string: true,
            },
          },
        ],
        '@typescript-eslint/require-array-sort-compare': 'error',
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
      },
    },
  ],
  // Disable type checked in .js files
  {
    files: ['**/*.{js,cjs,mjs}', './tsup.config.ts'],
    ...tsEslint.configs.disableTypeChecked,
  },
  // Unicorn
  {
    plugins: { unicorn: unicornPlugin },
    rules: {
      'unicorn/error-message': 'error',
      'unicorn/no-empty-file': 'error',
      'unicorn/prefer-node-protocol': 'warn',
    },
  },
  // Prettier
  eslintConfigPrettier,
]
