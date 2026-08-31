import globals from 'globals'

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-implicit-globals': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-alert': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-return-assign': 'error',
      'no-param-reassign': 'error',
      'no-shadow': 'error',
      'no-throw-literal': 'error',
      'no-unneeded-ternary': 'error',
      'no-useless-concat': 'error',
      'no-else-return': 'error',
      eqeqeq: ['error', 'smart'],
      curly: ['error', 'multi-line'],
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'prefer-arrow-callback': 'error',
      'dot-notation': 'error',
      radix: 'error',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
]
