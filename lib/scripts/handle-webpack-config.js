const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { docsPath, config } = require('./resolve')

exports.handleWebpackConfig = function handleWebpackConfig(webpackConfig) {
  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      dir: JSON.stringify(docsPath),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../vue/index.html.ejs'),
      filename: 'index.html',
      ...config,
      js: config.js || []
    })
  )

  return webpackConfig
}
