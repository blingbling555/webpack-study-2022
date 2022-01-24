// import "expose-loader?exposes=publicUtils!jquery";
// import "expose-loader?exposes=publicUtils!./globalFunc";
// import login from './login'
// import './css/index.css'
// import './css/index.less'
// 全局变量
// console.log(publicUtils, 'index.js', window.publicUtils, global.publicUtils)
// console.log(GlobalVariable.haha, 'GlobalVariable')
// console.log(lodash.add(3,4), 'lodash')

// js创建图片
// 注意图片都需要引入
// import img1 from './img/1.jpg'; // 把图片引入，返回的结果是一个新的图片地址
// let image = new Image();
// console.log(img1) // b0478990a400c8846399d1629bf15b3d.jpg
// image.src = img1; // 就是一个普通的字符串
// document.body.appendChild(image);

// 环境变量
// console.log(myAdd(11,11),NODE_ENV)

// import jquery from 'jquery'
// import lodash from 'lodash'
// import moment from 'moment'
//
// import React from 'react'
// import  ReactDom from 'react-dom'
// console.log(jquery, lodash)
//
// console.log(moment().startOf('day').fromNow(), 'haha')
//
// ReactDom.render(<h1>jsx</h1>,  document.getElementById('app'))

// import { sum } from './test'
// console.log(sum(1 , 2))
// // scope hosting 作用域提升 - 去看打包结果
// let a = 1;
// let b = 2;
// let c = 3;
// let d = a+b+c; // 在webpack中自动省略 可以简化的代码
// console.log(d,'-------------');

import login from './login'
import { model1 } from "./js/model1";
import { model2 } from "./js/model2";
console.log(model1(), model2())



