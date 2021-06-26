<template>
  <el-form label-width="120px">
    <el-form-item label="企业名称">
      <el-input disabled v-model="info.name"></el-input>
    </el-form-item>
    <el-form-item label="公司地址">
      <el-input disabled v-model="info.companyAddress"></el-input>
    </el-form-item>
    <el-form-item label="公司电话">
      <el-input disabled v-model="info.companyPhone"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input disabled v-model="info.mailbox"></el-input>
    </el-form-item>
    <el-form-item label="备注">
      <el-input disabled v-model="info.remarks"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import { companyGet } from '@/api/setting'
export default {
  data () {
    return {
      info: ''
    }
  },
  async created () {
    const res = await companyGet(this.$store.state.user.userInfo.companyId)
    this.info = res
    window.console.log(res)
  }
}
</script>
<style></style>
