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
    'linebreak-style': 0,
    'global-require': 0,
    'eslint linebreak-style': [0, 'error', 'windows'],
    'no-return-assign': 'off',
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'react/react-in-jsx-scope': 'off',
    'arrow-parens': 'off',
    'import/no-unresolved': 'off',
    'react/prop-types': 'off',
    'import/no-cycle': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
  },
}
