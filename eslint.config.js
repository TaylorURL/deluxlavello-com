import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

const shared = {
  'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^[A-Z_]' }],
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
  'object-shorthand': 'error',
  'prefer-template': 'error',
  'prefer-arrow-callback': 'error',
  'dot-notation': 'error',
  radix: 'error',
};

export default [
  {
    ignores: ['dist/**', 'node_modules/**', '.claude/**'],
  },
  js.configs.recommended,
  {
    // Build scripts, tests, the config files and the routing middleware run in node.
    files: ['scripts/**/*.{js,mjs}', '*.config.js', 'api/**/*.js', 'middleware.js'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: { ...globals.node },
    },
    // These are command-line tools, and printing is what they are for.
    rules: { ...shared, 'no-console': 'off' },
  },
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: { ...globals.browser, __BUILD_VERSION__: 'readonly' },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...shared,
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    // Hot reload keeps a component's state only when its file exports components
    // alone. The entries and the hooks under lib are not reloaded that way.
    files: ['src/app/components/**/*.jsx', 'src/app/pages/**/*.jsx', 'src/app/App.jsx'],
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
];
