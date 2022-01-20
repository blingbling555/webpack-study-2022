const path    = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  mode: 'development', // 不配置会报警告
  entry: {
    vendor: ['moment','lodash'],
    react: ['react','react-dom']
  },
  output: {
    path: path.resolve('./dist'),
    // 输出的动态连接库的文件名称，[name] 表明当前动态连接库的名称,就是上面vendor和react
    filename: '[name].dll.js',
    //  library必须和后面new webpack.DllPlugin中的name一致 后面会说明
    library: '[name]_library',

  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      // 描述动态连接库的 manifest.json 文件输出时的文件名称
      path: path.resolve(__dirname, './dist/dll', '[name]-manifest.json'),
      // 动态连接库的全局变量名称，须要和 output.library 中保持一致
      // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
      name: '[name]_library'
    })
  ]
};
