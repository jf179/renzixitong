<template>
  <div>
    <h3>{{ obj }}</h3>

    <button @click="btnClick">修改obj</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      obj: {
        a: 1
      }
    }
  },
  watch: {
    // 监听地址的变化 (监听的栈的变化)
    // obj (newVal) {
    //   window.console.log('修改了', newVal)
    // }

    obj: {
      deep: true,
      handler (newVal) {
        window.console.log('修改了', newVal)
      },
      immediate: true // 第一次绑定监听时就执行
    }
  },
  methods: {
    btnClick () {
      // this.$store.dispatch('routes/filterRoutes')
      this.obj.a = Math.random() * 999

      // this.obj = { a: Math.random() * 999 }
    }
  }
}
</script>
<style></style>
