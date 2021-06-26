<template>
  <div class="login">
    <!-- 
    el-form  
       label-width="标题的宽度"
       model:数据绑定
       rules:规则
    el-form-item  prop="验证项的字段名" 

    表单验证:
       1:基本表单验证
          el-form:  model   rules   ref
          el-form-item   prop
          rules:{
            prop值:[
            {required:true,message:"错误提示",trigger:"blur/change"},
            {min:最小长度,max:最大长度,message,trigger},
            {validator:(rule,value,callback)=>{
              rule:规则
              value:当前验证项的值
              callback:
                 如果验证成功  callback()
                 如果验证不成功 callback(new Error(错误信息))
            }}
            ]
          }
      2:全局表单验证
         this.$refs.form.validate((result)=>{
           result:true:验证难过
                  false:验证失败
         })
      3:局部表单验证
         this.$refs.form.validateField(['需要验证项的prop的值'],errorMessage=>{
           如果验证通过，errorMessage===''
           如果验证不通过 errorMessage：错误信息
           特点：数组有几个项它的回调函数就执行几次
         })
     -->
    <el-form
      v-loading="loading"
      class="form"
      :model="form"
      :rules="rules"
      ref="form"
    >
      <img class="logo" src="@/assets/common/login-logo.png" alt="" />
      <el-form-item prop="mobile">
        <el-input
          prefix-icon="el-icon-user-solid"
          v-model="form.mobile"
          @keyup.enter.native="submit"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          prefix-icon="el-icon-unlock"
          v-model="form.password"
          type="password"
          @keyup.enter.native="submit"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" class="btn" @click="submit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { validatePhone } from '@/utils/validate'
// import { login } from '@/api/user' // Object...
export default {
  data () {
    return {
      loading: false,
      form: {
        mobile: '13800000002', //string	必须		手机号
        password: '123456' //string	必须		密码
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            // validator: (rule, value, callback) => {
            //   let _result = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
            //     value
            //   )
            //   _result ? callback() : callback(new Error('请输入正确手机号'))
            // },
            validator: (rule, value, callback) => {
              validatePhone(value)
                ? callback()
                : callback(new Error('请输入正确手机号'))
            },
            trigger: 'blur'
          }
        ], //string	必须		手机号
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 12,
            message: '请输入6-12位密码',
            trigger: 'blur'
          }
        ] //string	必须		密码
      }
    }
  },
  created () {
    // if (this.$store.state.user.token) {
    //   this.$router.push('/')
    // }
  },
  methods: {
    // 登录
    submit () {
      this.$refs.form.validate(async result => {
        if (result) {
          // const res = await login(this.form)
          // // token存储到localStorage
          // // token:cookie与vuex
          // window.console.log(res)
          // loading
          this.loading = true
          const res = await this.$store.dispatch('user/getUserToken', this.form)
          // window.console.log('结果:', res)
          this.loading = false
          // loading取消
          let _redirect = this.$route.query.redirect
          // 是否同一帐号  1:退出 时记录一下帐号userId存储到cookie  2:登陆成功跳转
          if (_redirect) {
            this.$router.push(_redirect)
          } else {
            this.$router.push('/')
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// scoped:只管当前组件和子组件的最外层  组件的插槽它可以管  富文本
// scoped:看得到的就可以管,看不到的就管不到
.login {
  height: 100%;
  background: url(~@/assets/common/login.jpg) no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  .form {
    width: 500px;
    text-align: center;
    .logo {
      padding-bottom: 20px;
    }
    .btn {
      width: 100%;
      background: linear-gradient(to right, #407ffe, #407ffe);
      border-width: 0;
      color: #fff;
    }
  }
  ::v-deep .el-form-item__error {
    color: #fff;
  }
}
</style>
