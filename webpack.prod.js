const webpack = require('webpack')
const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');
const  MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const mergeConfig = merge(base,{
  mode: 'production',
  devtool:'none',
  // 优化项
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      // 压缩css,注意使用了这个插件，js就不会自动压缩了，需要用
      new optimizeCssAssetsWebpackPlugin(),
      // 压缩js
      new TerserPlugin({
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {
            // drop_console: true,
            // drop_debugger: true,
            // pure_funcs: ['console.log'], // 移除console
          },
        },
      })
    ],
  },
  plugins:[
    new webpack.BannerPlugin('make by wangling'), // 字符串就是版权声明
    new webpack.ProvidePlugin({
      'NODE_ENV': '../.env.prod'
    }),
  ],

})
module.exports = mergeConfig
