module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'react-native/no-inline-styles': 'off',
    'prettier/prettier': 'off',
    'jsx-quotes': ['warn', 'prefer-single'],
    'react/react-in-jsx-scope': 'off',
    semi: ['warn', 'never'],
  },
}
