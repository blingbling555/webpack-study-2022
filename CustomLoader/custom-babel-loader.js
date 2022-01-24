let babel = require('@babel/core');
let loaderUtils = require('loader-utils')

function loader(source) {
  /*
   loaderUtils.getOptions(this) 获取options这部分
  * options: {
      presets: ['@babel/preset-env']
    }
  * */
  let options = loaderUtils.getOptions(this);
  let cb = this.async();
  babel.transform(source,{
    ...options,
    // 源代码调试
    sourceMap:true,
    // 主要是为了sourceMap显示文件名名称，不然会显示undefined
    filename: this.resourcePath.split('/').pop() // 文件名
  },function (err,result) {
    cb(err,result.code,result.map); // 异步
  });
}


module.exports = loader;
