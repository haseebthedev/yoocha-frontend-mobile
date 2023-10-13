module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          src: './src',
          assets: './src/assets',
          components: './src/components',
          configs: './src/configs',
          enums: './src/enums',
          hooks: './src/hooks',
          interfaces: './src/interfaces',
          navigators: './src/navigators',
          screens: './src/screens',
          store: './src/store',
          constant: './src/constant',
          styles: './src/styles',
          utils: './src/utils',
        },
      },
    ],
  ],
};
