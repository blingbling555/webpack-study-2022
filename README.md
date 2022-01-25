# 命令创建脚手架
希望使用 wangling create vue来创建脚手架
- 1. 创建可执行的脚本
bin/wangling
```js
#! /usr/bin/env node
```
- 2. 配置package.json的bin字段
```json
{
  "main": "index.js",
  "bin": "./bin/wangling"
}
```
- 3. 把包临时放到全局下
npm link链接到本地环境中
```json
npm link
```

