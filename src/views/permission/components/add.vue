<template>
  <el-dialog
    :visible="isShow"
    :title="mode === 'add' ? '新增权限' : '编辑权限'"
    @close="closeEvent"
  >
    <el-form :model="form" :rules="rules" ref="form" label-width="120px">
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="权限描述" prop="description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="企业可见" prop="enVisible">
        <!-- el-switch
              v-model:值boolean(true(右边),false(左边))
              active-text:右边文本内容
              inactive-text:左边文本内容
              active-value:右边先中时的值
              inactive-value:左边选中时的值        
         -->
        <el-switch
          v-model="form.enVisible"
          inactive-text="不可见"
          active-text="可见"
          inactive-value="0"
          active-value="1"
        ></el-switch>
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="text-align:center">
        <el-button @click="closeEvent"> 取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { sysPermissionAdd, sysPermissionPut } from '@/api/permission'
export default {
  props: ['isShow'],
  data () {
    return {
      mode: 'add', // add:新增  edit:编辑
      form: {
        enVisible: '0', //	string	非必须
        name: '', //	string	非必须
        code: '', //	string	非必须
        description: '', //	string	非必须
        type: '', //	number	非必须  type:1表示 菜单  2:表示按钮
        pid: '' //	string	非必须   最外层: "0"  某个菜单内部:菜单对应的id
      },
      rules: {
        name: [{ required: true, message: '必填', trigger: 'blur' }], //	string	非必须
        code: [{ required: true, message: '必填', trigger: 'blur' }], //	string	非必须
        description: [{ required: true, message: '必填', trigger: 'blur' }] //	string	非必须
      }
    }
  },
  methods: {
    closeEvent () {
      this.$emit('update:isShow', false)
      this.$refs.form.resetFields()
      this.form = {
        enVisible: '0', //	string	非必须
        name: '', //	string	非必须
        code: '', //	string	非必须
        description: '', //	string	非必须
        type: '', //	number	非必须  type:1表示 菜单  2:表示按钮
        pid: '' //	string	非必须   最外层: "0"  某个菜单内部:菜单对应的id
      }
    },
    addEvent (type, pid) {
      this.form.type = type
      this.form.pid = pid
    },
    submit () {
      this.$refs.form.validate(async result => {
        if (result) {
          if (this.mode === 'add') {
            await sysPermissionAdd(this.form)
            this.$message.success('新增成功')
          } else {
            await sysPermissionPut(this.form)
            this.$message.success('编辑成功')
          }
          this.closeEvent()
          this.$emit('getData')
          //   this.$message.success('验证通过')
        }
      })
    }
  }
}
</script>
<style></style>
