const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { docsPath, configPath, routesPath, config } = require('./resolve')

exports.handleWebpackConfig = function handleWebpackConfig(webpackConfig) {
  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      DOCS_PATH: JSON.stringify(docsPath),
      CONFIG_PATH: JSON.stringify(configPath),
      ROUTES_PATH: JSON.stringify(routesPath),
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
