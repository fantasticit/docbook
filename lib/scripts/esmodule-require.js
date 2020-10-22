require('@babel/register')({
  ignore: [/node_modules/],
  presets: [
    [require('@babel/preset-env').default],
    [require('babel-preset-vue')]
  ],
  plugins: [
    [require('@babel/plugin-transform-runtime').default],
  ],
  extensions: ['.jsx', '.js', '.vue'],
  babelrc: false,
  cache: false,
});

module.exports = function esModuleRequire(c) {
  const s = require(c)
  return s.__esModule ? s.default : s;
}
