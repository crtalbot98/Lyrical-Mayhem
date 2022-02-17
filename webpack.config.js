const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DotEnv = require('dotenv-webpack');

module.exports = {
  entry: {
    app: path.resolve(__dirname, './build/app.js'), 
    login: path.resolve(__dirname, './build/auth/login.js')
  },
  mode: 'development',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  plugins: [
    new DotEnv(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './src/views/index.html',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './src/views/login.html',
      filename: 'login.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      chunks: ['login']
    }),
    new CopyWebpackPlugin({
        patterns: [
            { from: 'src/assets/sprites' }
        ]
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.es.js', '.css'],
    fallback: {
      'path': false,
      'fs': false
    }
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace('@', '')}`;
          }
        }
      }
    }
  }
};