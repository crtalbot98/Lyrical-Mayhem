const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './build/app.js',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Lyrical Mayhem'
    }),
    // new CopyPlugin({
    //     patterns: [
    //         { from: 'src/assets', to: 'assets' },
    //     ]
    // })
  ],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  }
};