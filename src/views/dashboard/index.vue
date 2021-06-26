<template>
  <div class="dashboard">
    <button @click="btnClick">查看语言</button>
    <!-- 1:工作日历布局
     2:年与月的处理
      取当前年月
      传入一个年月给你使用
     3:日历组件样式调整
     4:日历组件与年月选择产生互动
    -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <h3 class="title">{{ $t('home.work') }}</h3>
          <hr />
          <calendar></calendar>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card></el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import calendar from './componets/calendar'
import cookie from 'js-cookie'
export default {
  components: {
    calendar
  },
  data () {
    return {}
  },
  created () {},
  methods: {
    btnClick () {
      // this.$i18n.locale = 'en'
      // 刷新
      if (this.$i18n.locale === 'en') {
        this.$i18n.locale = 'zh'
      } else {
        this.$i18n.locale = 'en'
      }
      cookie.set('lang', this.$i18n.locale)
      this.$router.go(0)
      window.console.log(this.$i18n.locale)
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard {
}
</style>
