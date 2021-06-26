<template>
  <el-dialog :visible.sync="isShow" title="分配角色" @close="cancelEvent">
    <!-- 
      el-checkbox   
           v-model="选中的值''"               
           label="值"
     -->
    <!--  -->
    <el-checkbox-group v-model="checkVal">
      <el-checkbox
        v-for="(item, index) in list"
        :key="index"
        :label="item.id"
        >{{ item.name }}</el-checkbox
      >
    </el-checkbox-group>
    <template #footer>
      <div style="text-align:center">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="cancelEvent">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { sysRole } from '@/api/setting'
import { sysUser } from '@/api/user'
import { sysUserAssignRoles } from '@/api/employees'
export default {
  data () {
    return {
      isShow: false,
      checkVal: [],
      list: [],
      userId: ''
    }
  },
  async created () {
    const res = await sysRole({
      page: 1, // 当前页码
      pagesize: 1000 // 页容量
    })
    this.list = res.rows
    window.console.log('角色列表:', res)
  },
  methods: {
    async getUserRole (id) {
      const res = await sysUser(id)
      this.userId = id
      this.checkVal = res.roleIds
      window.console.log(res)
    },
    cancelEvent () {
      this.isShow = false
      this.checkVal = []
    },
    async submit () {
      if (this.checkVal.length > 0) {
        await sysUserAssignRoles({ id: this.userId, roleIds: this.checkVal })
        this.$message.success('分配角色成功')
        this.cancelEvent()
      }
    }
  }
}
</script>
<style></style>
