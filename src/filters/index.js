// import employeesData from '@/utils/constant/employees'
// Vue.filter('formatFormOf', str => {
//   let _obj = employeesData.hireType.find(item => {
//     return item.id === str
//   })
//   return _obj.value
// })

import employeesData from '@/utils/constant/employees'
import moment from 'moment'
export default {
  formatFormOf: function (str) {
    let _obj = employeesData.hireType.find(item => {
      return item.id === str
    })
    return _obj.value
  },
  formatTime: function (str) {
    return moment(str).format('YYYY-MM-DD')
  }
}
