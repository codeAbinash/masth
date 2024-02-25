module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['nativewind/babel'],
  env: {
    production: {
      plugins: ['nativewind/babel', 'react-native-paper/babel'],
    },
  },
}
