import axios from 'axios'
let _cancenFn = ''
export function getJoke (num) {
  // 关闭操作
  try {
    _cancenFn()
  } catch {}
  return axios({
    url: 'https://autumnfish.cn/api/joke/list?num=' + num,
    cancelToken: new axios.CancelToken(cancelFunction => {
      // cancelFunction:想取消当前api调用就执行该方法
      _cancenFn = cancelFunction
    })
  })
}
