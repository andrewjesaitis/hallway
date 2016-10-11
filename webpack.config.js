const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

const PATHS = {
  app: path.join(__dirname, 'assets', 'js'),
  dist: path.join(__dirname, 'assets', 'bundles'),
};

module.exports = {
  context: __dirname,

  entry: [
    path.resolve(PATHS.app, 'index.jsx'),
  ],

  output: {
    path: PATHS.dist,
    filename: '[name]-[hash].js',
  },

  plugins: [
    new BundleTracker({
      filename: './webpack-stats.json',
    }),
  ],

  module: {
    loaders: [
      { test: /\.(jsx|js)$/,
        include: PATHS.app,
        loaders: ['babel'] },
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
