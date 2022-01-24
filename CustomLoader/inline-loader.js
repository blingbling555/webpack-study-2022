function loader(source) {
  console.log('inner-loader')
  return source
}

module.exports = loader
