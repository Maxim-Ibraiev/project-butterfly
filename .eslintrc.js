const rulesBasic = {
  'no-unsafe-optional-chaining': 0,
  semi: ['warn', 'never'],
  'import/prefer-default-export': 'off',
  'react/react-in-jsx-scope': 'off',
  'jsx-a11y/anchor-is-valid': 'off',
  'import/no-unresolved': 'off',
  'import/extensions': 'off',
  'no-return-assign': 'off',
  'react/prop-types': 'off',
  'import/no-cycle': 'off',
  'arrow-parens': 'off',
  'no-console': 'off',
  'no-unused-vars': 'warn',
  'linebreak-style': 0,
  'global-require': 0,
  'eslint linebreak-style': [0, 'error', 'windows'],
  'react/jsx-props-no-spreading': 0,
  'arrow-body-style': 'warn',
  'react/self-closing-comp': 'warn',
}

const rulesTS = {
  'no-use-before-define': 0,
  'no-unused-vars': 0,
  'react/jsx-filename-extension': 0,
  '@typescript-eslint/explicit-module-boundary-types': 0,
  '@typescript-eslint/no-unused-vars': 'warn',
  'react/require-default-props': 0,
  'eslint-disable no-return-await': 'off',
}

module.exports = {
  env: {
    browser: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['react'],
  overrides: [
    {
      files: ['./**/*.{js,jsx}'],
      extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'plugin:@next/next/recommended'],
      rules: rulesBasic,
    },
    {
      files: ['./**/*.{ts,tsx}'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'airbnb',
        'prettier',
        'plugin:@next/next/recommended',
      ],
      excludedFiles: '*.d.ts',
      rules: {
        ...rulesBasic,
        ...rulesTS,
      },
    },
  ],
}
