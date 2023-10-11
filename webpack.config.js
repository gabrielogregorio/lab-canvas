const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./base1.ts",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist",
  },
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./base.html",
    }),
  ],
};
