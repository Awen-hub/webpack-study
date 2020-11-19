const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  devServer: {
    index: "./doc/App.html",
    host: "192.168.50.194",
    port: 8081,
    hot: true,
    https: true,
    open: true,
    // openPage: "different/page",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css", //输出在css目录下，使用哈希
      chunkFilename: "css/[id].[hash].css",
      insert: function (linkTag) {
        const reference = document.querySelector("#app");
        if (reference) {
          reference.parentNode.insertBefore(linkTag, reference);
        }
      },
    }),
    new HtmlWebpackPlugin({
      title: "Webpack APP",
      filename: "./doc/App.html",
      template: "./load.html",
      inject: true,
      favicon: "./src/asset/favicon.ico",
      minify: {
        removeComments: true, //移除注释
        collapseWhitespace: true, //移除多余空格
        minifyJS: true, //压缩html中的js
        minifyCSS: true, //压缩html中的CSS
        removeAttributeQuotes: true, // 移除属性的引号
        sortAttributes: true,
        sortClassName: true,
        removeScriptTypeAttributes: true, //从脚本标签中删除type="text/javascript"。其他类型的属性值是完整的。
        removeStyleLinkTypeAttributes: true, //从style和link标签中删除type="text/css"。其他类型的属性值是完整的。
      },
    }),
  ],
};
