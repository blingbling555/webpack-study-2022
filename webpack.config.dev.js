const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const  MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  devtool: 'eval-source-map',
  watch:false,
  watchOptions:{ // 监控的选项
    poll:1000, // 每秒 问我 1000次
    aggregateTimeout:500, // 防抖 我一直输入代码
    ignored:/node_modules/ // 不需要进行监控哪个文件
  },
  mode: 'development',  // 模式 默认两种 production development
  entry: './src/index.js',
  output: {
    filename: 'js/[name].[hash].js', //这个主要作用是将打包后的js已hash值的编码方式来生成出来
    path: path.resolve(__dirname, './dist'),
    // publicPath: "http://wangling.com/", // 每个引入到html里的都加上这样一个基础路径
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // 默认展示的目录
    port: 9000,
    open: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // {
          //   loader: 'style-loader',
          //   options:{
          //     insertAt:'top'
          //   }
          // },
          {
            loader: 'css-loader'
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [/*'style-loader'*/MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1024,
            name: '[name].[hash].[ext]',
            outputPath: './img/',
            // publicPath: 'http://img.com/img/'
          }
        }
      },
      {
        test: /\.html?$/,
        use: {
          loader: "html-withimg-loader",
        }
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader',
        options: {
          exposes: ['$', 'jQuery'],
        },
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      fileName: 'css/main.css'
    }),
    new webpack.ProvidePlugin({ // 在每个模块中都注入$和publicUtils
      $:'jquery',
      publicUtils: './globalFunc',
      // EVIRONMENT: '1' 不知道为什么会报错
      GlobalVariable: './GlobalVariable',
      lodash: 'lodash'
    }),
    new CopyWebpackPlugin([{
      from: './doc',
      to: './doc' // 会打包到dist/doc里
    }]),
    new webpack.BannerPlugin('make by wangling'), // 字符串就是版权声明
  ],

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
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log'], // 移除console
          },
        },
      })
    ],
  },
}
