const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const  MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/[name].[hash].js', //这个主要作用是将打包后的js已hash值的编码方式来生成出来
    path: path.resolve(__dirname, './dist'),
    // publicPath: "http://wangling.com/", // 每个引入到html里的都加上这样一个基础路径
  },
  module: {
    noParse: /jquery|lodash/, // 不去解析jquery的依赖库
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        include: path.resolve(path.join(__dirname), 'src'),
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
        exclude: /node_modules/,
        include: path.resolve(path.join(__dirname), 'src'),
        use: [/*'style-loader'*/MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(path.join(__dirname), 'src'),
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        exclude: /node_modules/,
        include: path.resolve(path.join(__dirname), 'src'),
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
      // {
      //   test: require.resolve('jquery'),
      //   loader: 'expose-loader',
      //   options: {
      //     exposes: ['$', 'jQuery'],
      //   },
      // }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MiniCssExtractPlugin({
      fileName: 'css/main.css'
    }),
    // new CleanWebpackPlugin(), // 这里使用会清空dll打包出来的文件，所以是在dll里面清空的
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, 'dist', './vendor.dll.js')
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, 'dist', './react.dll.js')
    }),
    new webpack.ProvidePlugin({ // 在每个模块中都注入$和publicUtils
      // $:'jquery',
      // publicUtils: './globalFunc',
      // EVIRONMENT: '1' 不知道为什么会报错
      // GlobalVariable: './GlobalVariable',
      // lodash: 'lodash',
      // DEVwangling: JSON.stringify("devasda"),
      // myAdd: ['lodash', 'add'],
    }),
    // new CopyWebpackPlugin([{
    //   from: './doc',
    //   to: './doc' // 会打包到dist/doc里
    // }])

    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, './dist/dll', 'react-manifest.json')
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, './dist/dll', 'vendor-manifest.json')
    })
  ]
}
