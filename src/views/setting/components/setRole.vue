<template>
  <el-dialog
    :visible="isShow"
    :title="'为[' + roleName + ']分配权限'"
    @close="closeEvent"
  >
    <!-- 
      el-tree
         :data="[
         {
             label:文本,
             children:[]
         }
         ]"
         :props={
             label:'label',
             children:'children'
         }  
         show-checkbox:显示多选框   
         node-key:配制树形组件的一个值,一定要独一无二(对应树形数据的一个字段名,后面可以用于默认设置选中的字段名)   
         default-checked-keys:设置默认选中哪些项 
            js代码设置默认选中与获取:    
              获取 this.$refs.tree.getCheckedKeys()  
              设置 this.$refs.tree.setCheckedKeys([node-key对应的字段名所对应的值])
         check-strictly:是否让父子节点没有联动效果   true:没有联动效果  false:有联动效果


      1:标题显示角色名         
      2:不可见的就不要显示出来
      3:树形组件有联动效果

     -->
    <el-tree
      ref="tree"
      check-strictly
      :data="list"
      :props="{ label: 'name' }"
      show-checkbox
      node-key="id"
      :default-checked-keys="checkedArr"
    ></el-tree>
    <template #footer>
      <div>
        <el-button @click="closeEvent">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { sysPermission } from '@/api/permission'
import { sysRoleGet, sysRoleAssignPremPut } from '@/api/setting'
import { changeData } from '@/utils'
export default {
  props: ['isShow'],
  model: {
    prop: 'isShow'
  },
  data () {
    return {
      list: [],
      roleName: '',
      checkedArr: [],
      id: ''
    }
  },
  async created () {
    const res = await sysPermission()
    window.console.log('列表', res)
    let _arr = res.filter(item => {
      return item.enVisible === '1'
    })
    this.list = changeData(_arr, '0')
  },
  methods: {
    closeEvent () {
      this.$emit('input', false)
      this.$refs.tree.setCheckedKeys([])
    },
    async getInfo (id) {
      this.id = id
      const res = await sysRoleGet(id)
      //   this.checkedArr = res.permIds
      this.$refs.tree.setCheckedKeys(res.permIds)
      window.console.log(res)
    },
    async submit () {
      window.console.log(this.$refs.tree.getCheckedKeys())
      await sysRoleAssignPremPut({
        id: this.id,
        permIds: this.$refs.tree.getCheckedKeys()
      })
      this.$message.success('分配权限成功')
      this.closeEvent()
    }
  }
}
</script>
<style></style>
