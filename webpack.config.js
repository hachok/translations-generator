const webpack = require('webpack');
const path = require('path');
const NodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.ts',
  },
  output: {
    path: __dirname,
    filename: '[name].js',
  },
  target: 'node',
  resolve: {
    modules: [path.resolve(__dirname, './'), 'node_modules'],
    extensions: ['.ts', '.js'],
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [{ test: /\.ts?$/, loader: 'ts-loader' }],
  },
  plugins: [new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })],
  node: {
    fs: 'empty',
    child_process: 'empty',
  },
  externals: [NodeExternals()],
};
