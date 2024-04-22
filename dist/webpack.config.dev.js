"use strict";

var path = require('path');

var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var isProduction = process.env.NODE_ENV === 'production';
var devMode = process.env.NODE_ENV !== 'production';
var config = {
  entry: './dist/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public')
  },
  devServer: {
    "static": path.resolve(__dirname, 'public'),
    open: true,
    host: 'localhost'
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'index.html',
    favicon: './dist/favicon.png'
  })].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
  module: {
    rules: [{
      test: /\.(sa|sc|c)ss$/,
      use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
    }]
  }
};

module.exports = function () {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }

  return config;
};