'use strict'

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';
const devMode = process.env.NODE_ENV !== "production";

const config = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public'),
    },
    devServer: {
        static: path.resolve(__dirname, 'public'),
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
    ].concat(devMode ? [] : [new MiniCssExtractPlugin()]),

    module: {
    rules: [
        {
            test: /\.(sa|sc|c)ss$/,
            use: [
              devMode ? "style-loader" : MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "sass-loader",
            ],
        },
        {
            test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
            type: 'asset',
        },
    ]
  }
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
    } else {
        config.mode = 'development';
    }
    return config;
};
