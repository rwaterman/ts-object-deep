'use strict'

module.exports = (() => {
  return {
    parserOptions: {
      ecmaVersion: 9, // ES2018 / Node10 (LTS)
      sourceType: 'module',
      project: 'tsconfig.json',
      ecmaFeatures: {
        // "jsx": false // Enable for React
      }
    },
    parser: '@typescript-eslint/parser',
    rules: {
      "import/prefer-default-export": "off"

      // Common rules to set depending upon extended configuration
      // semi: 'error' // Override's eslint-standard's rule
    },
    env: {
      node: true,
      jest: true
    },
    extends: ['airbnb-typescript/base', 'plugin:jest/recommended']
  }
})();
