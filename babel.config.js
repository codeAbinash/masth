module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'nativewind/babel',
    [
      'module-resolver',
      {
        alias: {
          '@components': './src/components',
          '@icons': './src/assets/icons/src',
          '@images': './src/assets/images/src',
          '@assets': './src/assets',
          '@utils': './src/utils',
          '@screens': './src/screens',
          '@': './src/*',
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['nativewind/babel', 'react-native-paper/babel', 'react-native-reanimated/plugin'],
    },
  },
}
