let loaderUtils = require('loader-utils')

function loader(source) {
  // console.log(loaderUtils.getOptions(this))
  console.log(this.resourceQuery)
  console.log(loaderUtils.isUrlRequest(this.resourceQuery))
  return source
}

module.exports = loader
