<template>
  <!-- el-dialog
        visible:控制是否显示弹框
        title
        width...
        slot="default/title/footer"
        事件  close:当窗口关闭时回调
    表单验证：
         1：el-form   ref  model   rules
         2:el-form-item   prop="字段名"
         rules:{
             prop字段名：[
             {required:true,message:错误信息,trigger:"blur/change"},
             {min:最小长度,max:最大长度,message,trigger},
             {validator:(rule,value,callback)=>{
                 成功：callback()
                 失败:callbacl(new Error(错误信息))
             },trigger:"blur/change"}
             ]
         }
      this.$refs.ref值.validate(result=>{
          if(result){
              // 验证通过
          }
      })
      this.$refs.ref值.validateField(['prop的值']，errorMessage=>{
          验证成功：，errorMessage===''
          验证不成功: errorMessage!==''
      })


 -->
  <el-dialog
    class="dialog"
    :visible.sync="isShow"
    :title="mode === 'add' ? '新增组织架构' : '编辑组织架构'"
    @close="reset"
  >
    <el-form :model="form" ref="form" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model.trim="form.name"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code">></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <!-- v-mdoel   :value   @input -->
        <el-select v-model="form.manager">
          <el-option
            v-for="(item, index) in allUser"
            :key="index"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="form.introduce" type="textarea" :rows="6"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="footer">
        <el-button @click="reset">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import {
  sysUserSimple,
  companyDepartmentAdd,
  companyDepartmentPut
} from '@/api/departments'
export default {
  props: ['allDepts'],
  data () {
    return {
      mode: 'add', // add:新增   edit:编辑
      isShow: false,
      allUser: [],
      treeObj: '',
      form: {
        name: '', //	string	非必须		部门名称
        code: '', //	string	非必须		部门编码，同级部门不可重复
        introduce: '', //	string	非必须		介绍
        manager: '', //	string	非必须		负责人名称
        pid: '' //	string	非必须		父级部门ID
      },
      rules: {
        name: [
          { required: true, message: '请输入', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '请输入1-50个字符',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              //    1:找出子级的同级部门  通过id找同，给一树形结构 非树形结构
              //    2：同级部门对比，如果存在：callback(new Error(部门名重复))
              //                   如果不存在  callback()
              if (this.mode === 'add') {
                const _arr = this.allDepts.filter(item => {
                  if (item.pid === this.treeObj.id) {
                    return true
                  }
                })
                let _index = _arr.findIndex(item => {
                  return item.name === value
                })
                _index === -1
                  ? callback()
                  : callback(new Error('请不要添加重复的部门名称'))
                // window.console.log('validator', _arr)
              } else {
                // 编辑:找到自己的同级部门(pid相同),名字不能和同级其它(除自己以外不能包含自己的id的部门)部门重复
                const _arr = this.allDepts.filter(item => {
                  if (
                    item.pid === this.treeObj.pid &&
                    item.id !== this.treeObj.id
                  ) {
                    return true
                  }
                })
                let _index = _arr.findIndex(item => {
                  return item.name === value
                })
                _index === -1
                  ? callback()
                  : callback(new Error('请不要添加重复的部门名称'))
              }
            }
          }
        ], //	string	非必须		部门名称
        code: [
          { required: true, message: '请输入', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '请输入1-50个字符',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (this.mode === 'add') {
                // 整个数据内都不能有相应code
                // 返回值=数组.some(item=>{  return boolean值(true,返回值=true)(所有项都是false,返回值就是false)     })
                let _bol = this.allDepts.some(item => {
                  return item.code === value
                })
                //
                _bol ? callback(new Error('不能输入重复的code')) : callback()
              } else {
                let _bol = this.allDepts.some(item => {
                  return item.code === value && item.id !== this.treeObj.id
                })
                //
                _bol ? callback(new Error('不能输入重复的code')) : callback()
              }
            },
            trigger: 'blur'
          }
        ], //	string	非必须		部门编码，同级部门不可重复
        introduce: [
          { required: true, message: '请输入', trigger: 'blur' },
          {
            min: 1,
            max: 300,
            message: '请输入1-50个字符',
            trigger: 'blur'
          }
        ], //	string	非必须		介绍
        manager: [{ required: true, message: '请输入', trigger: 'change' }] //	string	非必须		负责人名称
      }
    }
  },
  created () {
    this.getAllUser()
    //   监听
    // 草稿/模板
    this.$bus.$on('showDialog', (bol, treeObj, mode) => {
      //   window.console.log('showDialog')
      this.isShow = bol
      this.treeObj = treeObj
      this.mode = mode
      if (mode === 'edit') {
        this.form = JSON.parse(JSON.stringify(treeObj))
      }
      // this.form = JSON.parse(JSON.stringify(treeObj))
      // this.form = treeObj
    })
  },
  /*
  新增 :
      1:弹框组件
      2:表单验证
      3:新增api处理
      4:关闭弹窗
      5:清除表单验证与数据
      6:刷新父级列表
  */
  // watch: {
  //   isShow: {
  //     handler (newVal, oldVal) {
  //       if (!newVal) {
  //         this.reset()
  //       }
  //     }
  //   }
  // },
  methods: {
    async getAllUser () {
      this.allUser = await sysUserSimple()
      //   this.allUser=res
      //   window.console.log(res)
    },
    // 确定点击
    async submit () {
      try {
        const res = await this.$refs.form.validate()
        if (res) {
          // this.$message.success('验证成功')
          if (this.mode === 'add') {
            await companyDepartmentAdd({ ...this.form, pid: this.treeObj.id })
          } else {
            await companyDepartmentPut(this.form)
          }
          // window.console.log(123)
          this.reset()
          // window.console.log(456)
          this.$emit('getData')
        }
      } catch {
        this.$message.success('验证失败')
      }
    },
    // 取消方法
    reset () {
      this.isShow = false
      this.$refs.form.resetFields()
      this.form = {
        name: '', //	string	非必须		部门名称
        code: '', //	string	非必须		部门编码，同级部门不可重复
        introduce: '', //	string	非必须		介绍
        manager: '', //	string	非必须		负责人名称
        pid: '' //	string	非必须		父级部门ID
      }
      // 重置表单(form):将表单数据重置成初始数据(form表单第一次读取时你的数据)
    }
  },
  beforeDestroy () {
    this.$bus.$off('showDialog')
  }
}
</script>
<style lang="scss" scoped>
.dialog {
  .footer {
    text-align: center;
  }
}
</style>
