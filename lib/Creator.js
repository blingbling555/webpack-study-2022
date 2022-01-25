/*
   * 采用远程拉取
   * api.github.com/repos/zhu-cli/vue-template/tags
   * api.github.com/orgs/zhu-cli/repos
   * */
const { fetchRepoList, fetchTagList } = require("./request");
const Inquirer = require('inquirer');
const { wrapLoading } = require('./util');
const downloadGitRepo = require('download-git-repo'); // 不支持promise
const util = require('util');
const path = require('path');
class Creator {
  constructor(projectName, targetDir) {
    this.name = projectName;
    this.target = targetDir;
    // 此时这个方法就是一个promise方法了
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }
  async fetchRepo () {
    // 失败重新拉取
    let repos = await wrapLoading(fetchRepoList, 'waiting fetch template');
    if (!repos) return;
    repos = repos.map(item => item.name);
    let { repo } = await Inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: 'please choose a template to create project'
    });
    return repo
  }
  async fetchTag (repo) {
    let tags = await wrapLoading(fetchTagList, 'waiting fetch tag', repo);
    if (!tags) return;
    tags = tags.map(item => item.name);
    let { tag } = await Inquirer.prompt({
      name: 'tag',
      type: 'list',
      choices: tags,
      message: 'please choose a tag to create project'
    });
    return tag;
  }
  async download (repo, tag) {
    // 1.需要拼接处下载路径来
    // let requestUrl = `项目名/${repo}${tag ? '#' + tag : ''}`
    // zhu-cli/vue-template#1.0
    let requestUrl = `zhu-cli/${repo}${tag ? '#' + tag : ''}`
    // 2.把资源下载到某个路径上(后续可以增加缓存功能)
    await wrapLoading(this.downloadGitRepo, 'waiting donwload', requestUrl, path.resolve(process.cwd(), `${repo}@${tag}`));
    return this.target;
  }
  async create () {
    // 真实开始创建了
    // 1) 先去拉取当前组织下的模板
    let repo = await this.fetchRepo();
    // 2) 在通过模板找到版本号
    let tag = await this.fetchTag(repo);
    // 3) 下载
    await this.download(repo, tag);
  }
}

module.exports = Creator;
