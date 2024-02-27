module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-native/no-inline-styles': 'off',
    'prettier/prettier': 'off',
    'react/react-in-jsx-scope': 'off',
    semi: ['warn', 'never'],
  },
}
