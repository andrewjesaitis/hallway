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
  devtool: 'source-map',
  context: __dirname,

  entry: [
    path.resolve(PATHS.app, 'index.jsx'),
  ],

  output: {
    path: PATHS.dist,
    filename: '[name]-[hash].js'
  },

  plugins: [
    new BundleTracker({
      comments: false,
      filename: './webpack-stats-prod.json',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('[name].css'),
  ],

  module: {
    loaders: [
      { test: /\.(jsx|js)$/,
        include: PATHS.app,
        loaders: ['babel'],
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

};
