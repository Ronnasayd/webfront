const { merge } = require('webpack-merge')
const common = require('./webpack.common.config')

const development = {
  mode: 'development',
  entry: './src/app.js',
  devtool: 'eval',
  devServer: {
    contentBase: './dist',
    hot: true,
    inline: true
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  }
}
module.exports = merge(development, common)
