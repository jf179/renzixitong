// 用于全局注册components内的组件
import tools from './tools'
import upload from './upload'
// Vue.use(对象/function)
// 对象：它会调用它里面的install方法
// 函数：该函数就自动执行
// export default {
//   install: function (Vue) {
//     Vue.component(tools.name, tools)
//   }
// }
import uploadImg from './uploadImg'
import mixinsObj from './mixins'
import fullScreen from './fullScreen'
import lang from './lang'
export default function (Vue) {
  Vue.component('tools', tools)
  Vue.component('upload', upload)
  Vue.component('uploadImg', uploadImg)
  Vue.mixin(mixinsObj)
  Vue.component('fullScreen', fullScreen)
  Vue.component('lang', lang)
}
