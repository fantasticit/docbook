process.env.NODE_ENV = 'development';

const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack/webpack.conf.dev');
const { handleWebpackConfig } = require('./handle-webpack-config');
const { config, docsPath, port } = require('./resolve');

module.exports = function dev() {
  return new Promise((resolve, reject) => {
    const compiler = webpack(handleWebpackConfig(webpackConfig));
    const server = new webpackDevServer(compiler, {
      contentBase: docsPath,
      compress: true,
      hot: true,
      inline: true,
      quiet: !config.debug,
      open: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 3000,
      },
    });
    server.listen(port, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
