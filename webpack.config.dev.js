const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',  // 模式 默认两种 production development
  entry: {
    index: './src/index.js',
    login: './src/login.js'
  },
  output: {
    filename: 'js/[name].[hash].js', //这个主要作用是将打包后的js已hash值的编码方式来生成出来
    path: path.resolve(__dirname, './dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // 默认展示的目录
    port: 9000,
    open: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/html/index.html",
      filename: "html/index.html",
      chunks: ['index'],
      minify: {
        // collapseWhitespace: true,
        // keepClosingSlash: true,
        // removeComments: true,
        // removeRedundantAttributes: true,
        // removeScriptTypeAttributes: true,
        // removeStyleLinkTypeAttributes: true,
        // useShortDoctype: true
      }
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/login.html",
      filename: "html/login.html",
      chunks: ['login'],
      publicPath: '/html/',
      minify: {
        // collapseWhitespace: true,
        // keepClosingSlash: true,
        // removeComments: true,
        // removeRedundantAttributes: true,
        // removeScriptTypeAttributes: true,
        // removeStyleLinkTypeAttributes: true,
        // useShortDoctype: true
      }
    })
  ]
}
