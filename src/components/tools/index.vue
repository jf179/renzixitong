<template>
  <!-- 
  1:完成公共组件结构 
  2：全局注册
       Vue.component(组件名,导入的组件)
       Vue.use(js文件（{intall:function(Vue){ Vue.component(组件名,导入的组件)}}）)
 -->
  <el-card>
    <div class="main">
      <div class="left">
        <div class="left-content" v-if="showLeft">
          <i class="el-icon-info"></i>
          <slot name="left"></slot>
        </div>
      </div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'tools',
  props: {
    showLeft: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    .left-content {
      display: flex;
      align-items: center;
      border: 1px solid #c8eaff;
      background-color: #e6f7ff;
      padding: 10px;
      i {
        color: #409eff;
      }
    }
  }
}
</style>
