const path = require('path')
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'CustomLoader')]
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: ['loader1', 'loader2', 'loader3'] // 顺序loader3,loader2,loader1
      // },
      {
        test: /\.js$/,
        use: {
          loader: 'loader1'
        },
        enforce: "post"
      },
      {
        test: /\.js$/,
        use: {
          loader: 'loader2'
        },
        enforce: "pre"
      },
      {
        test: /\.js$/,
        use: {
          loader: 'loader3'
        }
      }
    ]
  }
}
