const { merge } = require("webpack-merge");
const common = require("./webpack.common.config");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const production = {
  mode: "production",
  plugins: [
    new HtmlWebpackTagsPlugin({
      tags: ["core.css", "tailwind.css"],
      append: true,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].css",
            },
          },
          "extract-loader",
          "css-loader",
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("@fullhuman/postcss-purgecss")({
                    content: ["src/templates/**/*.pug"],
                  }),
                  require("cssnano")({ preset: "default" }),
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].css",
            },
          },
          "extract-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("@fullhuman/postcss-purgecss")({
                    content: ["src/templates/**/*.pug"],
                  }),
                  require("cssnano")({ preset: "default" }),
                ],
              },
            },
          },
        ],
      },
    ],
  },
};

module.exports = merge(production, common);
