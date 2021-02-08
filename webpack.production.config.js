const { merge } = require('webpack-merge')
const common = require('./webpack.common.config')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const purgecss = require('@fullhuman/postcss-purgecss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

const postCSSPlugins = [
  purgecss({
    content: ['src/templates/**/*.pug'],
    safelist: {
      greedy: [/dropdown-menu/, /dropdown-icon/]
    }
  }),
  autoprefixer(),
  cssnano({ preset: 'default' })
]

const production = {
  mode: 'production',
  entry: './src/app.js',
  plugins: [
    new HtmlWebpackTagsPlugin({
      tags: ['assets/css/tailwindcss.css', 'assets/css/core.css'],
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
                plugins: [...postCSSPlugins]
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
                plugins: [...postCSSPlugins]
              }
            }
          }
        ]
      }
    ]
  }
}

module.exports = merge(production, common)
