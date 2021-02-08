const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const SRC_PATH = path.resolve(__dirname, './src');
const PUBLIC_PATH = path.resolve(__dirname, '../public');
const UPLOAD_PATH = path.resolve(__dirname, '../upload');
const DIST_PATH = path.resolve(__dirname, '../dist');

/** @type {import('webpack').Configuration} */
const config = {
  entry: [
    path.resolve(SRC_PATH, './index.css'),
    path.resolve(SRC_PATH, './index.jsx'),
  ],
  output: {
    path: DIST_PATH,
    publicPath: '/',
    filename: 'scripts/main-[contenthash:8].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      fs: false,
      path: false,
    },
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { url: false } },
          { loader: 'postcss-loader' },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/main-[contenthash:8].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_PATH, './index.html'),
      inject: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'terms.html',
      template: path.resolve(SRC_PATH, './terms.html'),
      inject: true,
    }),
  ],
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    contentBase: [PUBLIC_PATH, UPLOAD_PATH],
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
  },
};

module.exports = config;
