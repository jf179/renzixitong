<template>
  <!-- 上传页面 -->
  <div>
    <upload :beforeUpload="beforeUpload" :onSuccess="onSuccess"></upload>
  </div>
</template>
<script>
import { sysUserBatch } from '@/api/employees'
export default {
  methods: {
    beforeUpload (file) {
      let _limit2M = file.size / 1024 / 1024 < 2
      if (!_limit2M) {
        this.$message.error('请上传2M内的文件')
      }
      return _limit2M
    },
    async onSuccess (obj) {
      // 只是针对员工的处理
      //  let _redirect = this.$route.query.redirect
      // 是员工页面才做下面处理
      let _obj = {
        入职日期: 'timeOfEntry',
        姓名: 'username',
        工号: 'workNumber',
        手机号: 'mobile',
        转正日期: 'correctionTime'
      }

      let _result = obj.results.map(item => {
        let _newObj = {}
        Object.keys(item).forEach(item2 => {
          if (
            _obj[item2] === 'timeOfEntry' ||
            _obj[item2] === 'correctionTime'
          ) {
            let _date = new Date((item[item2] - 1) * 24 * 60 * 60 * 1000)
            // _date.setYear(年份)  把某个时间的年设置成相应的年
            _date.setYear(_date.getFullYear() - 70)
            _newObj[_obj[item2]] = _date
          } else {
            _newObj[_obj[item2]] = item[item2]
          }
        })
        return _newObj
      })
      window.console.log(obj)
      await sysUserBatch(_result)
      let _redirect = this.$route.query.redirect
      this.$router.push(_redirect)
    }
  }
}
</script>
<style></style>
