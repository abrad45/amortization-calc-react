import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

// Formatting is Prettier's job (see .prettierrc) — no stylistic rules here.
export default [
  {
    ignores: ['dist', 'coverage', '.cache', '.yarn'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Without these, no-unused-vars can't see that a component referenced
      // only inside JSX is actually used.
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    // The entry point defines App and mounts it; it isn't meant to export.
    files: ['src/index.jsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    // vite.config.js is still CommonJS.
    files: ['vite.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
    },
  },
  {
    // vite.config.js sets test.globals, so describe/it/expect/vi are ambient.
    files: ['**/*.test.{js,jsx}', 'src/test/**'],
    languageOptions: {
      globals: globals.vitest,
    },
  },
];
