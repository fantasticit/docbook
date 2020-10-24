const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.conf.common')

module.exports = merge(common, {
  entry: path.resolve(__dirname, '../vue/'),
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(s)?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin([/\.d\.ts$/]),
  ]
})
