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
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.resolve(PATHS.app, 'index.jsx'),
  ],

  output: {
    path: PATHS.dist,
    filename: '[name]-[hash].js',
    publicPath: 'http://localhost:3000/assets/bundles/',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BundleTracker({
      filename: './webpack-stats.json',
    }),
  ],

  module: {
    loaders: [
      { test: /\.(jsx|js)$/,
        include: PATHS.app,
        loaders: ['react-hot', 'babel-loader'] },
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
