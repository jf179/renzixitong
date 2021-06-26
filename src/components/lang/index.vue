<template>
  <!-- dropdown -->
  <el-dropdown @command="commandEvent">
    <span
      ><svg-icon
        style="width:20px;height:20px;color:#fff;"
        iconClass="language"
      ></svg-icon
    ></span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh">中文</el-dropdown-item>
        <el-dropdown-item command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script>
import cookie from 'js-cookie'
export default {
  methods: {
    commandEvent (str) {
      this.$i18n.locale = str
      cookie.set('lang', str)
      this.$router.go(0)
    }
  }
}
</script>
<style></style>
