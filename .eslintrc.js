module.exports = {
  env: {
    browser: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
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
  },
}
