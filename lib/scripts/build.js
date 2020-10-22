process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const webpackConfig = require('../webpack/webpack.conf.prod');
const { handleWebpackConfig } = require('./handle-webpack-config')
const { outputDir } = require('./resolve')
const { parse } = require('./parse')

module.exports = function build() {
  parse()
  return new Promise((resolve, reject) => {
    webpackConfig.output.path = outputDir
    const compiler = webpack(handleWebpackConfig(webpackConfig));
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        if (stats.hasErrors()) {
          reject('Build failed with errors.\n');
          process.exit(1);
        } else {
          resolve(stats);
        }
      }
    });
  });
}
