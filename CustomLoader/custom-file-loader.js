let loaderUtils = require('loader-utils');
function loader(source) {
  // file-loader 需要返回一个路径
  let filename = loaderUtils.interpolateName(this, '[name].[hash].[ext]', { content: source});
  console.log(filename, 'filename') // 4d069064177f2de284d771e6ff46df22.jpg filename
  this.emitFile(filename, source); // 发射文件
  return `module.exports="${filename}"`
}
loader.raw = true; // 二进制
module.exports = loader;
