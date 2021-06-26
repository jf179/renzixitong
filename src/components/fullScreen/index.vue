<template>
  <!-- 全屏组件 -->
  <svg-icon
    style="color:#fff;width:20px;height:20px;"
    iconClass="fullscreen"
    @click="svgClick"
  ></svg-icon>
</template>
<script>
import ScreenFull from 'screenfull'
export default {
  methods: {
    svgClick () {
      window.console.log(ScreenFull)
      if (!ScreenFull.isEnabled) {
        this.$message.error('该浏览器不支持全屏')
      } else {
        ScreenFull.toggle()
      }
    }
  }
}
</script>
<style></style>
