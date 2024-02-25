module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-native/no-inline-styles': 'off',
    'prettier/prettier': 'off',
    'jsx-quotes': ['warn', 'prefer-single'],
    semi: ['warn', 'never'],
  },
}
