// 创建项目
const path = require('path')
const fs = require('fs-extra')
const Inquirer = require('inquirer')
const Creator = require('./Creator')
module.exports = async function(projectName, options) {
  const cwd = process.cwd() // 获取当前命令执行时的工作目录
  const targetDir = path.join(cwd, projectName)
  // 判断当前的创建的项目名是否已经存在
  if (fs.pathExistsSync(targetDir)) {
    if (options.force) { // 如果强制创建，则先删除目录
      await fs.remove(targetDir)
    } else {
      // 提示用户是否确定要覆盖
      const { action } = await Inquirer.prompt([ // 配置询问方式
        {
          name: 'action',
          type: 'list',
          message: '当前的目录已经存在了,请选择：',
          choices: [
            {
              name: '覆盖',
              value: true
            },
            {
              name: '取消',
              value: false
            }
          ]
        }
      ])
      if (!action) {
        return
      }
      console.log('删除中...')
      await fs.remove(targetDir)
    }
  }
  // 创建项目
  const creator = new Creator(projectName, targetDir)
  creator.create()
}
