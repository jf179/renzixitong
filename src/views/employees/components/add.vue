<template>
  <el-dialog :visible="isShow" @close="closeEvent" title="新增员工">
    <el-form label-width="120px" :model="form" :rules="rules" ref="form">
      <el-form-item prop="username" label="姓名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item prop="mobile" label="手机">
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item prop="timeOfEntry" label="入职时间">
        <el-date-picker
          v-model="form.timeOfEntry"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="formOfEmployment" label="聘用形式">
        <el-select v-model="form.formOfEmployment">
          <el-option
            v-for="(item, index) in employeesData.hireType"
            :key="index"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="workNumber" label="工号">
        <el-input v-model="form.workNumber"></el-input>
      </el-form-item>
      <el-form-item prop="departmentName" label="部门">
        <el-input
          v-model="form.departmentName"
          @focus="focusEvent"
          readonly
        ></el-input>
        <el-tree
          default-expand-all
          @node-click="handleNodeClick"
          v-if="showTree"
          :data="treeData"
          :props="{ label: 'name' }"
        ></el-tree>
      </el-form-item>
    </el-form>
    <template #footer>
      <div>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="closeEvent">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { validatePhone } from '@/utils/validate'
import employeesData from '@/utils/constant/employees'
import { companyDepartment } from '@/api/departments'
import { sysUserAdd } from '@/api/employees'
export default {
  props: ['isShow'],
  model: {
    prop: 'isShow'
  },
  data () {
    return {
      showTree: false,
      employeesData: employeesData,
      treeData: [],
      form: {
        username: '', //string	非必须		姓名
        mobile: '', //string	非必须		手机号
        timeOfEntry: '', //string	非必须		入职时间
        formOfEmployment: '', //	number	非必须		聘用形式
        workNumber: '', //string	非必须		工号
        departmentName: '' //string	非必须		组织名称
        // correctionTime: '' //string	非必须		转正时间
      },
      rules: {
        username: [{ required: true, message: '必填', trigger: 'blur' }], //string	非必须		姓名
        mobile: [
          { required: true, message: '必填', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              validatePhone(value)
                ? callback()
                : callback(new Error('请正确输入手机号'))
            },
            trigger: 'blur'
          }
        ], //string	非必须		手机号
        timeOfEntry: [{ required: true, message: '必填', trigger: 'blur' }], //string	非必须		入职时间
        formOfEmployment: [
          { required: true, message: '必填', trigger: 'change' }
        ], //	number	非必须		聘用形式
        workNumber: [{ required: true, message: '必填', trigger: 'blur' }], //string	非必须		工号
        departmentName: [{ required: true, message: '必填', trigger: 'change' }] //string	非必须		组织名称
      }
    }
  },
  methods: {
    closeEvent () {
      this.$emit('input', false)
      this.$refs.form.resetFields()
      this.form = {
        username: '', //string	非必须		姓名
        mobile: '', //string	非必须		手机号
        timeOfEntry: '', //string	非必须		入职时间
        formOfEmployment: '', //	number	非必须		聘用形式
        workNumber: '', //string	非必须		工号
        departmentName: '' //string	非必须		组织名称
      }
    },
    submit () {
      this.$refs.form.validate(async result => {
        if (result) {
          // this.$message.success('验证成功')
          await sysUserAdd(this.form)
          this.closeEvent()
          this.$emit('getData')
        } else {
          this.$message.error('验证失败')
        }
      })
    },
    async getTreeData () {
      if (this.treeData.length > 0) {
        return
      }
      const res = await companyDepartment()
      this.treeData = this.changeData(res.depts, '')
      window.console.log(res)
    },
    changeData (arr, str) {
      return arr.filter(item => {
        if (item.pid === str) {
          item.children = this.changeData(arr, item.id)
          return true
        }
      })
    },
    focusEvent () {
      this.showTree = true
      this.getTreeData()
    },
    handleNodeClick (data) {
      this.form.departmentName = data.name
      this.showTree = false
      window.console.log(data)
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-form-item__label {
  text-align: left;
}
</style>
