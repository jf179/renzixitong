import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg component

// register globally
Vue.component('svg-icon', SvgIcon)
// webpack代码处理
const req = require.context('./svg', false, /\.svg$/)
// 全局加载了所有的svg文件
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
