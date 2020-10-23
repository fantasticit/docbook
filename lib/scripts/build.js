const fs = require('fs-extra')
const path = require('path')
const webpack = require('webpack');
const webpackConfig = require('../webpack/webpack.conf.prod');
const { handleWebpackConfig } = require('./handle-webpack-config')
const { outputDir, config } = require('./resolve')
const { parse } = require('./parse')

module.exports = function build() {
  process.env.NODE_ENV = 'production';

  parse()

  if (config.manifest) {
    fs.outputJSONSync(path.join(outputDir, 'manifest.json'), config.manifest)
  }

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
