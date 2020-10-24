const path = require('path')
const merge = require('webpack-merge')
const OfflinePlugin = require('offline-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.conf.common')

module.exports = merge(common, {
  entry: path.resolve(__dirname, '../vue/'),
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash:7].js'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(s)?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new OfflinePlugin(),
    new CssMinimizerPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    })
  ]
})
