function loader(source) {
  console.log('inner-loader', source)
  return source
}

module.exports = loader
