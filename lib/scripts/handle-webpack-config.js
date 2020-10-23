const fs = require('fs-extra')
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const { docsPath, configPath, routesPath, config, outputDir } = require('./resolve')

exports.handleWebpackConfig = function handleWebpackConfig(webpackConfig) {
  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      DOCS_PATH: JSON.stringify(docsPath),
      CONFIG_PATH: JSON.stringify(configPath),
      ROUTES_PATH: JSON.stringify(routesPath),
      BUILD_TIME: JSON.stringify(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../vue/index.html.ejs'),
      filename: 'index.html',
      ...config,
      js: config.js || []
    })
  )

  const assetsPath = path.join(docsPath, 'assets')

  if (process.env.NODE_ENV === 'production' && fs.existsSync(assetsPath)) {
    webpackConfig.plugins.push(
      new CopyPlugin({
        patterns: [
          { from: assetsPath, to: path.join(outputDir, 'assets') },
        ],
      }),
    )
  }

  return webpackConfig
}
