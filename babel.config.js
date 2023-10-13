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
          config: './src/config',
          constant: './src/constant',
          enums: './src/enums',
          hooks: './src/hooks',
          interfaces: './src/interfaces',
          navigators: './src/navigators',
          screens: './src/screens',
          theme: './src/theme',
          utils: './src/utils',
        },
      },
    ],
  ],
};
