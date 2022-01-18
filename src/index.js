// import "expose-loader?exposes=publicUtils!jquery";
// import "expose-loader?exposes=publicUtils!./globalFunc";
import login from './login'
import './css/index.css'
import './css/index.less'
console.log(publicUtils, 'index.js', window.publicUtils, global.publicUtils)
console.log(GlobalVariable.haha, 'GlobalVariable')
// console.log(lodash.add(3,4), 'lodash')



