import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['@types/**/*', '*.js', 'dist/**/*', 'eslint.config.js', 'vite.config.js']
  },
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json']
      }
    }
    // rules: {
    //   'no-unused-vars': 'off',
    //   'prefer-const': ['error'],
    //   '@typescript-eslint/no-unused-vars': 'error',
    //   '@typescript-eslint/no-explicit-any': 'error',
    //   '@typescript-eslint/no-unsafe-assignment': 'error',
    //   '@typescript-eslint/no-unsafe-call': 'error',
    //   '@typescript-eslint/no-unsafe-member-access': 'warn',
    //   '@typescript-eslint/no-unsafe-return': 'error',
    //   '@typescript-eslint/restrict-template-expressions': 'warn',
    //   '@typescript-eslint/no-use-before-define': 'error'
    // }
  }
];
