// 很多指令
// export default {
//   imgerror: {
//     inserted (dom, obj) {
//       dom.src = dom.src || obj.value
//       dom.onerror = () => {
//         dom.src = obj.value
//       }
//     }
//   }
// }

const imgerror = {
  bind () {
    // window.console.log('bind')
  },
  inserted (dom, obj) {
    // window.console.log('inserted')
    dom.src = dom.src || obj.value
    dom.onerror = () => {
      dom.src = obj.value
    }
  },
  update () {
    // window.console.log('update')
  },
  componentUpdated (dom, obj) {
    dom.src = dom.src || obj.value
    // window.console.log('componentUpdated')
  },
  unbind () {
    // window.console.log('unbind')
  }
}
const xxx = {}
export { imgerror, xxx }
