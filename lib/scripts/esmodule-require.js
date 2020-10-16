require('@babel/register')({
  ignore: [/node_modules/],
  presets: [
    [require('@babel/preset-env').default],
  ],
  plugins: [
    [require('@babel/plugin-transform-runtime').default],
  ],
  extensions: ['.jsx', '.js'],
  babelrc: false,
  cache: false,
});

module.exports = function esModuleRequire(c) {
  const s = require(c)
  return s.__esModule ? s.default : s;
}
