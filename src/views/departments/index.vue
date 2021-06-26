<template>
  <el-card>
    <div class="departments">
      <div class="content">
        <!-- $emit
      子传父（子触发父方法）
           1:在子组件标签上绑定一个方法   @子组件方法名="父组件方法名"
           2：子组件内触发父组件方法   this.$emit('子组件方法名')
      兄弟传值
      1:创建一个bus.js   export default new Vue()
         Vue.prototype.$bus=new Vue()
      2:监听
          this.$bus.$on('事件名',()=>{...})
      3:触发
          this.$bus.$emit("事件名",参数值)
      4：销毁
          this.$bus.$off("事件名")   

      编辑:
        1:打开弹框,将当前编辑行数据(深拷贝)传给新增组件
        2:定义一个字段来区分当前是新增还是编辑
        3:表单验证如果不需要变化不处理,有可能 需要有调整的话就调
        4:api处理(区分新增与编辑)
        5:标题,数据清空小细节调整

       -->
        <treeItem
          :treeObj="treeObj"
          :isTop="true"
          @getData="getData"
        ></treeItem>
        <hr />
        <el-tree :data="list">
          <template v-slot="{ data }">
            <treeItem
              :treeObj="data"
              style="width:100%"
              @getData="getData"
            ></treeItem>
          </template>
        </el-tree>
      </div>
      <add :allDepts="allDepts" @getData="getData"></add>
    </div>
  </el-card>
</template>
<script>
import { companyDepartment } from '@/api/departments'
import { changeData } from '@/utils'
import treeItem from './component/treeItem'
import add from './component/add'
export default {
  components: {
    treeItem,
    add
  },
  data () {
    return {
      list: [],
      allDepts: [],
      treeObj: {
        manager: '负责人',
        id: ''
        // noShowEdit: true
      }
    }
  },

  async created () {
    this.getData()
  },
  methods: {
    async getData () {
      // window.console.log('删除了')
      const res = await companyDepartment()
      this.allDepts = res.depts
      this.treeObj = { ...res.depts[0], ...this.treeObj }
      this.list = changeData(res.depts)
      // window.console.log('list', this.list)
    }
    // changeData (arr, str = '') {
    //   return arr.filter(item => {
    //     if (item.pid === str) {
    //       item.children = this.changeData(arr, item.id)
    //       return true
    //     }
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped>
.departments {
  .content {
    width: 1000px;
    margin: 50px auto 0;
  }
}
</style>
