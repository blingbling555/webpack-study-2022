// import Styles from 'inline-loader?modules!./a.js'; // 内联loader写法1
// require('inline-loader!./a') // 内联loader写法2
// 不会让 pre和normal来处理
// require('-!inline-loader!./a')
// 不会让 normal来处理
// require('!inline-loader!./a')
// 什么都不要，只要内联
// require('!!inline-loader!./a')
// console.log('haha')
// class MyName {
//   constructor(name) {
//     this.name = name
//   }
//   getName() {
//     return this.name
//   }
// }
// const name = new MyName('wangling')
// console.log(name.getName())

import imgUrl from './images/zly.jpg'
const img = new Image()
img.src = imgUrl
document.body.appendChild(img)


