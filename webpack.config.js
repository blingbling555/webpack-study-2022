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
      {
        test: /\.js$/,
        use: ['loader3', 'loader2', 'loader1']
      }
    ]
  }
}
