const path = require('path')
module.exports = {
  mode: 'development',
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
        use: {
          loader: "custom-babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: "test-api-loader?rrr",
      //     // options: {
      //     //   customProps: 'wangling'
      //     // }
      //   }
      // },
      {
        test: /\.jpg$/,
        use: {
          loader: "custom-url-loader"
        }
      },
      {
        test: /\.less$/,
        use: ['custom-style-loader', 'custom-css-loader', 'custom-less-loader']
      }
    ]
  }
}
