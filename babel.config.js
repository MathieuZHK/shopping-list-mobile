module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['nativewind/babel', 'react-native-paper/babel'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
