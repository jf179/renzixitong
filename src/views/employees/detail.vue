<template>
  <div class="detail">
    <el-card>
      <div class="main">
        <el-button
          class="print"
          type="primary"
          size="small"
          @click="$router.push('/employees/print/' + id + '?type=' + active)"
          >打印</el-button
        >
        <el-tabs v-model="active">
          <el-tab-pane label="登陆帐号设置" name="t1">
            <el-form
              label-width="120px"
              :model="form"
              :rules="rules"
              ref="form"
            >
              <el-form-item label="姓名" prop="username">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password"></el-input>
              </el-form-item>
            </el-form>
            <div style="text-align:center">
              <el-button type="primary" @click="submit">更新</el-button>
              <el-button>取消</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="个人详情" lazy name="t2">
            <component :is="'userInfo'" :userInfo="info2"></component>
          </el-tab-pane>
          <el-tab-pane label="岗位信息" lazy name="t3">
            <jobInfo></jobInfo>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>
<script>
import { sysUser, sysUserPut } from '@/api/user'
export default {
  components: {
    userInfo: () => import('./components/userInfo'),
    jobInfo: () => import('./components/jobInfo')
  },
  data () {
    return {
      id: this.$route.params.id,
      active: 't2',
      form: {
        username: '', //string	非必须
        password: '' //	string	非必须
      },
      info: '',
      info2: '',
      rules: {
        username: [{ required: true, message: '必填', trigger: 'blur' }], //string	非必须
        password: [{ required: true, message: '必填', trigger: 'blur' }] //	string	非必须
      }
    }
  },
  async created () {
    const res = await sysUser(this.id)
    // undefined  obj:{a:undefined,fn:function(){}}
    // 递归处理深拷贝
    this.info = res
    this.info2 = JSON.parse(JSON.stringify(res))
    this.form.username = res.username
    window.console.log('用户信息:', res)
  },
  methods: {
    submit () {
      this.$refs.form.validate(async result => {
        if (result) {
          await sysUserPut({ ...this.info, ...this.form })
          this.$message.success('更新成功')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  position: relative;
  .print {
    position: absolute;
    right: 20px;
    top: 0px;
    z-index: 9999;
  }
}
</style>
