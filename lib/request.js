// 通过axios来获取结果
const axios = require('axios');

axios.interceptors.response.use(res => res.data);

async function fetchRepoList () {
  // return axios.get('组织仓库地址');
  // 可以通过配置文件，拉取不同仓库对应用户下的文件
  return axios.get('https://api.github.com/orgs/zhu-cli/repos')
}

async function fetchTagList (repo) {
  // return axios.get(`代码地址`);
  return axios.get(`https://api.github.com/repos/zhu-cli/${ repo }/tags`)
}

module.exports = {
  fetchRepoList,
  fetchTagList
}
