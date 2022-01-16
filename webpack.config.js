const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['./build/app.js', './src/assets/style/app.css'],
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Lyrical Mayhem'
    }),
    new CopyWebpackPlugin({
        patterns: [
            { from: 'src/assets/sprites' }
        ]
    })
  ],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  }
};