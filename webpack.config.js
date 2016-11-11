const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'assets', 'js'),
  style: path.join(__dirname, 'assets', 'css'),
  dist: path.join(__dirname, 'assets', 'bundles'),
};

module.exports = {
  context: __dirname,

  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    path.resolve(PATHS.app, 'index.jsx'),
  ],

  output: {
    path: PATHS.dist,
    filename: '[name]-[hash].js',
    publicPath: 'http://0.0.0.0:3000/assets/bundles/',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BundleTracker({
      filename: './webpack-stats.json',
    }),
    new ExtractTextPlugin('[name].css'),
  ],

  module: {
    loaders: [
      { test: /\.(jsx|js)$/,
        include: PATHS.app,
        loaders: ['react-hot', 'babel-loader'],
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css!less'),
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg|jpg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ],
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx'],
  },

  devServer: {
    stats: 'errors-only',
  },
};
