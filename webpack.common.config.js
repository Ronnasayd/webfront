const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");


module.exports = {
  output: {
    path: path.resolve(__dirname, "dist/assets/js"),
    filename: "[name].[contenthash].js",
    chunkFilename: '[name].[contenthash].js',
    publicPath: 'assets/js/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/templates/index.pug",
      filename:"../../index.html"
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.pug$/,
        use: ["html-loader", "pug-html-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use:[
          {
            loader: "file-loader",
            options: {
              name: "[name].[contenthash].[ext]",
              outputPath:"../images",
              publicPath: 'assets/images',
            },
          },
        ],
      },
    ],
  },
};
