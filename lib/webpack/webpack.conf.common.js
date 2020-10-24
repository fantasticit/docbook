const os = require('os')
const Happypack = require('happypack')
const threadPoll = Happypack.ThreadPool({ size: os.cpus().length })
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const VueMdLoader = require('./vue-md-loader')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isProd ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=babel',
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                js: 'happypack/loader?id=babel'
              }
            }
          }
        ],
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                js: 'happypack/loader?id=babel'
              }
            }
          },
          VueMdLoader
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 3000,
          name: 'assets/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 3000,
          name: 'assets/fonts/[name].[hash].[ext]'
        }
      }
    ]
  },
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
  },
  plugins: [
    new VueLoaderPlugin(),
    new Happypack({
      id: 'babel',
      loaders: [
        {
          loader: 'babel-loader'
        }
      ],
      threadPool: threadPoll,
      verbose: false
    }),
    new ProgressBarPlugin({
      format: 'build [:bar] :percent (:elapsed seconds)',
      clear: false,
      width: 60
    }),
  ]
}
