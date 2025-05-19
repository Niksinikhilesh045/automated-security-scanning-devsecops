// eslint.config.js
import js from '@eslint/js';
import { globSync } from 'glob';

/**
 * ESLint Flat Config for modern JavaScript/Node.js projects.
 * Add additional plugins or configs as needed.
 */

const files = globSync('**/*.js', {
  ignore: ['node_modules/**', 'dist/**'],
});

export default [
  // Base recommended rules
  js.configs.recommended,

  // Custom rules or overrides
  {
    files,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module', // or 'script' for older codebases
    },
    rules: {
      // Customize rules here
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'eqeqeq': 'error',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
    },
  },
];
