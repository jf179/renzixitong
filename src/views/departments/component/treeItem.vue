<template>
  <div class="treeItem">
    <div class="left">{{ treeObj.name }}</div>
    <div class="right">
      <div class="r1">{{ treeObj.manager }}</div>
      <div class="r2">
        <el-dropdown @command="commandEvent">
          <span>
            <span>操作</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="add">新增</el-dropdown-item>
              <el-dropdown-item v-if="!isTop" command="edit"
                >编辑</el-dropdown-item
              >
              <el-dropdown-item v-if="!isTop" command="del"
                >删除</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import { companyDepartmentDel } from '@/api/departments'
export default {
  props: {
    treeObj: {
      type: Object,
      required: true, // 表示必传
      //   props定义默认值：原始值：直接写，引用值：()=>{return 引用值 }
      default: () => {
        return {}
      }
    },
    isTop: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async commandEvent (str) {
      switch (str) {
        case 'add':
          //   this.$message.success('新增 ')
          this.$bus.$emit('showDialog', true, this.treeObj, 'add')
          break
        case 'edit':
          this.$bus.$emit('showDialog', true, this.treeObj, 'edit')
          // this.$message.success('编辑')
          break
        case 'del':
          //   this.$message.success('删除 ')
          try {
            await this.$confirm('您确定删除些条数据吗？', '删除操作')
            await companyDepartmentDel(this.treeObj.id)
            // window.console.log(this.$parent)
            // this.$parent.getData()
            this.$emit('getData')
          } catch {}

          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.treeItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
  }
  .right {
    display: flex;
    .r1 {
      width: 120px;
    }
  }
}
</style>
