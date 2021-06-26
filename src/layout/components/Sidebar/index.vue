<template>
  <div :class="{ 'has-logo': showLogo }" class="sidebar">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <!-- el-menu-item    el-submenu -->
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  created () {
    // window.console.log(this.$router)
  },
  computed: {
    ...mapGetters(['sidebar']),
    routes () {
      // options不是双向绑定的，后面我们addRoutes动态添加后，options不会变化
      // 读取vuex的值（所有路由配制信息）
      //  options不是双向绑定的
      // return this.$router.options.routes
      return this.$store.state.routes.routes
    },
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo () {
      return this.$store.state.settings.sidebarLogo
    },
    variables () {
      return variables
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss" scoped>
.sidebar {
  background: -webkit-linear-gradient(bottom, #3d6df8, #5b8cff);
  .el-scrollbar {
    background: url(~@/assets/common/leftnavBg.png) no-repeat;
    background-position: 0 100%;
  }
  ::v-deep .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;

    a {
      &.router-link-exact-active,
      &:hover {
        .svg-icon {
          color: #43a7fe;
        }
        span {
          color: #43a7fe;
        }
        background-color: #fff !important;
      }
      li {
        .svg-icon {
          color: #fff;
          font-size: 18px;
          vertical-align: middle;
          .icon {
            color: #fff;
          }
        }
        span {
          color: #fff;
        }
      }
    }
  }
}
</style>
