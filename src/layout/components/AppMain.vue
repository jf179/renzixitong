<template>
  <section class="app-main">
    <!-- 动画 -->
    <transition name="fade-transform" mode="out-in">
      <!-- <div class="main-padding"> -->
      <router-view class="main-padding" :key="key" />
      <!-- </div> -->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key () {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
.main-padding {
  min-height: calc(100vh - 50px);
  background-color: #f0f2f5;
  box-sizing: border-box;
  padding: 20px;
}
</style>
