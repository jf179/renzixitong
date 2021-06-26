<template>
  <div class="navbar">
    <div class="left">
      <i v-if="sidebar.opened" class="el-icon-s-fold" @click="iClick"></i>
      <i v-else class="el-icon-s-unfold" @click="iClick"></i>
      <div class="app-breadcrumb">
        江苏传智播客教育科技股份有限公司
        <span class="breadBtn">体验版</span>
      </div>
    </div>
    <div class="right">
      <lang style="margin-right:20px;"></lang>
      <fullScreen style="margin-right:20px;"></fullScreen>
      <el-dropdown @command="commandEvent">
        <span class="user">
          <img
            v-imgerror="avatar"
            class="avatar"
            :src="userInfo.staffPhoto"
            alt=""
          />
          <span>{{ userInfo.username }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="home">首页</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { sysProfile } from '@/api/user'
export default {
  computed: {
    ...mapState('app', ['sidebar']),
    ...mapState('user', ['userInfo'])
  },
  data () {
    return {
      avatar: require('@/assets/common/head.jpg')
    }
  },
  async created () {
    const res = await sysProfile()
    // window.console.log(res)
  },
  // 全局注册
  /*
  Vue.directive('名字',{})
  */

  // 局部自定义指令
  // directives: {
  //   imgerror: {
  //     inserted (dom, obj) {
  //       dom.src = dom.src || obj.value
  //       dom.onerror = () => {
  //         dom.src = obj.value
  //       }
  //     }
  //   }
  // },
  methods: {
    // ...mapActions('app', ['toggleSideBar']),
    ...mapActions(['app/toggleSideBar']),
    iClick () {
      // this.$store.dispatch('app/toggleSideBar')
      // this.toggleSideBar()
      this['app/toggleSideBar']()
    },
    commandEvent (command) {
      switch (command) {
        case 'home':
          this.$router.push('/')
          break
        case 'logout':
          // this.$message.success('退出成功')
          /*
          确定提示：this.$confirm("内容",'标题',{配制确定按钮与取消按钮的内容 confirmButtonText:,cancelButtonText:}).then(()=>{// 点击了确定的回调}).catch(()=>{// 点击了取消的回调})
          1:删除token  2:删除用户信息   3：提示   4：跳转到登录页
          */

          this.$confirm('您确定退出吗？', '温馨提示').then(() => {
            this.$store.commit('user/logout')
            this.$message.success('退出成功')
            // 调用接口  1：后端有可能 还有前端有联系的处理 2：后端在前端留下过cookie之类的东西
            this.$router.push('/login?redirect=' + this.$route.fullPath)
            // this.$router.push('/login')
          })
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar {
  background-color: #4576fa;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  .left {
    display: flex;
    i {
      padding: 0 15px;
      cursor: pointer;
    }
    .breadBtn {
      background-color: #84a9fe;
      padding: 8px;
      border-radius: 8px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .user {
      display: flex;
      align-items: center;
      padding-right: 15px;
      color: #fff;
    }
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
}
</style>
