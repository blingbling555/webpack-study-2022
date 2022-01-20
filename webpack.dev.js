const { merge } = require('webpack-merge');
const path = require('path')
const base = require('./webpack.base.js');
const webpack = require('webpack')
module.exports = merge(base,{
   mode: 'development',
   devServer: {
      contentBase: path.join(__dirname, 'dist'), // 默认展示的目录
      port: 9000,
      open: true,
      hot: true
   },
   devtool:'source-map',
   plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProvidePlugin({ // 在每个模块中都注入$和publicUtils
         'NODE_ENV': '../.env.dev'
      }),
   ],
   watch:false,
   watchOptions:{ // 监控的选项
      poll:1000, // 每秒 问我 1000次
      aggregateTimeout:500, // 防抖 我一直输入代码
      ignored:/node_modules/ // 不需要进行监控哪个文件
   },
})
