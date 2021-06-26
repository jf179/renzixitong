<template>
  <!-- props传值:
        单向数据流:
        父传子:
           传的是原始值,不可修改
           传的是引用值,只要不修改它的引用地址,它的值还是随便修改的
           栈里的东西不能修改,堆里面的随便修改
    子组件标签 :属性名.sync="值"
       子组件内可以通过emit来修改该属性的值  this.$emit("update:属性名",属性值)
       this.$emit("update:visible",false) -->

  <el-dialog
    :visible="isShow"
    :title="mode === 'add' ? '新增角色' : '编辑角色'"
    @close="closeEvent"
  >
    <el-form label-width="120px" :model="form" :rules="rules" ref="form">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label-width="0">
        <div style="text-align:center">
          <el-button @click="closeEvent">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { sysRoleAdd, sysRolePut } from '@/api/setting'
export default {
  props: ['isShow'],
  model: {
    prop: 'isShow',
    event: 'isShowClose'
  },
  data () {
    return {
      mode: 'add', // add:新增  edit:编辑
      form: {
        name: '', //string	必须		角色名称
        description: '' //string	必须		角色描述
      },
      rules: {
        name: [
          {
            required: true,
            message: '必填',
            trigger: 'blur'
          }
        ], //string	必须		角色名称
        description: [
          {
            required: true,
            message: '必填',
            trigger: 'blur'
          }
        ] //string	必须		角色描述
      }
    }
  },
  methods: {
    closeEvent () {
      //   this.$emit('update:addShow', false)
      // 触发父组件方法实现关闭
      this.$emit('isShowClose', false)
      this.$refs.form.resetFields()
      this.form = {
        name: '', //string	必须		角色名称
        description: '' //string	必须		角色描述
      }
      this.mode = 'add'
    },
    submit () {
      this.$refs.form.validate(async result => {
        if (result) {
          // this.$message.success('验证通过')
          if (this.mode === 'add') {
            await sysRoleAdd(this.form)
            this.$message.success('新增成功')
            /*
            新增后的处理
            1:关闭弹窗
            2：清除表单验证（数据清除）
            3：刷新父组件列表数据

            */
          } else {
            await sysRolePut(this.form)
            this.$message.success('编辑成功')
          }
          this.closeEvent()
          this.$emit('getData')
        } else {
          this.$message.error('验证失败')
        }
      })
    }
  }
}
</script>
<style></style>
