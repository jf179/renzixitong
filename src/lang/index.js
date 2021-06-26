/*
i18n
1:安装  npm i vue-i18n@8.22.2
2:导入 import VueI18n from 'vue-i18n'
3:注册
    Vue.use(VueI18n)
4:实例化
   const i18n=new VueI18n({
       locale:'语言标识zh/en'
       messages:{
           en:{
               xx:'home'
           },           
           zh:{xx:'首页'}中文的语言包
       }
   })
5:暴露出去  
export default i18n
6:在main.js挂载
  import i18n from '@/lang'
  new Vue({
      i18n
  })
7:让element-ui与i18n建立关系
  Vue.use(Element,{
      // elementui与i18n建立联系的固定写法
      i18n:(key,value)=>i18n.t(key,value)
  }) 
*/
import VueI18n from 'vue-i18n'
import Vue from 'vue'
import elementEn from 'element-ui/lib/locale/lang/en'
import elementZh from 'element-ui/lib/locale/lang/zh-CN'
import en from './en'
import zh from './zh'
import cookie from 'js-cookie'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: cookie.get('lang') || 'zh',
  messages: {
    // 语言包  en:{}
    en: {
      ...elementEn,
      ...en
    },
    zh: { ...elementZh, ...zh }
  }
})
/*
i18n用法
$t('key值')返回相应语言的值
    en: { ...elementEn, home: { work: 'work canceldar' } },
    zh: { ...elementZh, home: { work: '工作日历' } }
    {{$t('home.work')}}
国际化:
   1:收集:分模块
   2:代码一定要注释
   3:样式一定要考虑一些特别情况
   4:不要主动参与翻译

1:vue.config.js       publicPath:'./'
2:npm run build


*/

export default i18n
