<template>
  <el-card>
    <div style="text-align:right">
      <!-- 
        新增
         1:新建基本新增组件,完成基本页面结构
         2:点击添加,打开弹框
         3:表单验证处理
         4:定义新增 api,在表单验证完成后添加
         5:添加完成清除表单数据,关闭弹框,刷新父级列表数据
        编辑:
          1:打开弹框
          2:将当前行数据(深拷贝)传递到新增组件中并显示
          3:同时传递一个mode:区分新增与编辑
          4:如果有表单验证修改还得调整一下
          4:修改标题,同时根据mode不同调用不同接口
       -->

      <el-button type="primary" @click="add(1, '0')">添加</el-button>
    </div>
    <!-- table使用树形结构 
    1:数据要有children
    2:el-table 要设置一个row-key="数据的唯一标识"
    
     -->
    <el-table :data="list" row-key="id">
      <el-table-column label="菜单名称" prop="name"></el-table-column>
      <el-table-column label="权限标识" prop="code"></el-table-column>
      <el-table-column label="描述" prop="description"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <div>
            <el-button type="text" @click="add(2, row.id)">添加</el-button>
            <el-button type="text" @click="edit(row)">编辑</el-button>
            <!-- 删除
            1:定义api
            2:点击删除确认框
               调用删除api
               刷新列表数据
               提示一下            
             -->
            <el-button type="text" @click="del(row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <add :isShow.sync="isShow" ref="add" @getData="getData"></add>
  </el-card>
</template>
<script>
import { sysPermission, sysPermissionDel } from '@/api/permission'
import add from './components/add'
export default {
  components: {
    add
  },
  data () {
    return {
      list: [],
      isShow: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const res = await sysPermission()
      this.list = this.changeData(res, '0')
      window.console.log('权限:', this.list)
    },
    changeData (arr, str) {
      return arr.filter(item => {
        if (item.pid === str) {
          item.children = this.changeData(arr, item.id)
          return true
        }
      })
    },
    del (id) {
      this.$confirm('您确定删除该权限点吗', '提示').then(async () => {
        await sysPermissionDel(id)
        this.$message.success('删除成功')
        this.getData()
      })
    },
    // 新增
    add (type, pid) {
      this.isShow = true
      this.$refs.add.mode = 'add'
      this.$refs.add.addEvent(type, pid)
    },
    // 编辑
    edit (row) {
      this.isShow = true
      this.$refs.add.form = JSON.parse(JSON.stringify(row))
      this.$refs.add.mode = 'edit'
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-card__body {
  background-color: #fff;
}
</style>
