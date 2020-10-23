const chokidar = require('chokidar');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack/webpack.conf.dev');
const { handleWebpackConfig } = require('./handle-webpack-config');
const { config, port, docsPath, outputSrc } = require('./resolve');
const { parse } = require('./parse')

module.exports = function dev() {
  process.env.NODE_ENV = 'development';
  
  parse()

  chokidar
    .watch(docsPath, {
      ignored:  [outputSrc],
      ignoreInitial: true,
      persistent: true,
      awaitWriteFinish: {
        stabilityThreshold: 200,
        pollInterval: 100,
      },
    })
    .on('change', parse);

  return new Promise((resolve, reject) => {
    const compiler = webpack(handleWebpackConfig(webpackConfig));
    const server = new webpackDevServer(compiler, {
      contentBase: docsPath,
      compress: true,
      hot: true,
      inline: true,
      quiet: 'debug' in config ? config.debug : true,
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
