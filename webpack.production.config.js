const { merge } = require('webpack-merge')
const common = require('./webpack.common.config')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const purgecss = require('@fullhuman/postcss-purgecss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

const production = {
  mode: 'production',
  entry: './src/production.js',
  plugins: [
    new HtmlWebpackTagsPlugin({
      tags: ['assets/css/tailwind.css', 'assets/css/core.css'],
      append: true,
      usePublicPath: false
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css',
              outputPath: 'assets/css'
            }
          },
          'extract-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  purgecss({
                    content: ['src/templates/**/*.pug']
                  }),
                  autoprefixer(),
                  cssnano({ preset: 'default' })
                ]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css',
              outputPath: 'assets/css'
            }
          },
          'extract-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  purgecss({
                    content: ['src/templates/**/*.pug']
                  }),
                  autoprefixer(),
                  cssnano({ preset: 'default' })
                ]
              }
            }
          }
        ]
      }
    ]
  }
}

module.exports = merge(production, common)
