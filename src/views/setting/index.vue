<template>
  <div class="setting">
    <el-card>
      <el-tabs>
        <el-tab-pane label="角色管理" lazy>
          <el-button type="primary" @click="addRoles">+新增角色</el-button>
          <!-- el-table
                data:数据绑定
              el-table-column 
                label:标题名
                prop:字段名
            插槽
                template  v-slot="scope"
                  scope:row:当前行数据
                        $index:索引下标
            form表单/table表格
            // 资料能进不能出
          -->
          <el-table :data="list" border>
            <el-table-column label="序号">
              <!-- 
     [0,1,2,3,4...100]   $index+1
     [0,1,2,3,4...100]           1条/页       1页         1  
     0,1   2,3                   2条/页       2页1条      (2-1)*2+0+1=3
                                10条/页       3页/6      (页码-1)*页容量+索引+1

 -->

              <template v-slot="scope" type="index">
                {{ (page.page - 1) * page.pagesize + scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column label="角色名" prop="name"> </el-table-column>
            <el-table-column label="描述" prop="description"> </el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <!-- scope.row:当前行数据  scope.$index:当前项的索引 -->
                <div>
                  <!-- <h3>{{ scope.row }}</h3> -->
                  <!-- 
                        1:弹框组件
                        2:树形组件(选择功能)
                           1:树形数据(所有的权限列表转换成树形数据)
                           2:获取当前角色已有权限列表
                        3:修改权限(调用接口修改)
                      
                    -->

                  <el-button type="text" @click="setRole(scope.row)"
                    >分配权限</el-button
                  >
                  <!-- 编辑
                  1:打开弹框，将当前行数据（深拷贝）传递给弹框组件
                  2：传递一个参数作为标识 （新增：add,编辑:edit）
                  3：如果表单验证需要调整的就调整一下
                  4：接口调用（区分新增与删除）                 
                  
                   -->

                  <el-button type="text" @click="edit(scope.row)"
                    >修改</el-button
                  >
                  <!-- 删除：
                      1：确定弹框
                      2：删除api调用
                      3：刷新列表数据
                      4：提示处理      
                    
                        -->
                  <el-button type="text" @click="del(scope.row.id)"
                    >删除</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="page">
            <!-- 
              @size-change:页容量改变时触发
              @current-change:页码改变时触发
              current-page:默认哪一页
              page-sizes:页容量选项
              layout:功能配制
              total:总条数

             -->
            <!-- @size-change="handleSizeChange"
              @current-change="handleCurrentChange" -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page.page"
              :page-sizes="[1, 10, 100, 200, 300, 400]"
              :page-size="page.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="公司信息" lazy>
          <info></info>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 新增
    1:子组件dialog弹框处理
    2:控制显示与关闭弹框
    3:表单处理(布局与验证)
    4:保存接口调用
        关闭时:清空验证,还原表单数据,刷新父组件的列表数据    
     -->
    <!-- <add :addShow.sync="isShow"></add> -->
    <!-- sync
       子组件标签  :属性名.sync="值"
       子组件内  props:["属性名"]   
         子组件内部可以直接使用this.$emit("update:属性名",属性值)来修改父组件传入子组件的属性值
       v-model
       子组件  :属性名(value)=value对应的值  @input="父组件的一个事件"
                父组件的一个事件(形参){
                  this.value对应的值=形参
                }
       子组件内
           props:['属性名(value)']
           修改该value   this.$emit("input",修改后的值)
           model:{
             prop:"value(可以随意修改)",
             event:"input(可以随意修改)"
           }

           v-model只对父组件简化
            子组件  v-model=value对应的值 
            
             
    
    
     -->
    <!-- 
      v-model:双向绑定
      它是针对父组件的简写

     -->
    <!-- <add :value="isShow" @input="inputEvent"></add> -->

    <add ref="add" v-model="isShow" @getData="getData"></add>
    <setRole v-model="showRole" ref="setRole"></setRole>
  </div>
</template>
<script>
import { sysRole, sysRoleDel } from '@/api/setting'
import add from './components/add'
import setRole from './components/setRole'
import info from './components/info'
export default {
  components: {
    add,
    info,
    setRole
  },
  data () {
    return {
      showRole: false,
      isShow: false,
      list: [],
      page: {
        page: 1, // 当前页码
        pagesize: 10, // 页容量
        total: 10 // 总条数
      }
    }
  },
  async beforeCreate () {
    // beforeCreate:创建前,vue实例化还没有完成,不能访问data与methods
  },
  async created () {
    this.getData()
  },
  methods: {
    // inputEvent (bol) {
    //   this.isShow = bol
    // },
    async getData () {
      const res = await sysRole(this.page)
      // 异步一定在实例化后面
      this.list = res.rows
      this.page.total = res.total
      window.console.log(res)
    },
    handleSizeChange (size) {
      this.page.pagesize = size
      // window.console.log(size, this.page.pagesize)
      this.page.page = 1
      this.getData()
    },
    handleCurrentChange (page) {
      this.page.page = page
      this.getData()
    },
    // 新增角色
    addRoles () {
      this.isShow = true
      // this.$refs.add.mode = 'add'
    },
    // 删除
    del (id) {
      this.$confirm('您确定删除该角色吗？', '提示').then(async () => {
        // 调用删除api
        await sysRoleDel(id)
        this.page.page = 1
        this.getData()
        this.$message.success('删除成功')
      })
    },
    // 编辑
    edit (row) {
      this.isShow = true
      this.$refs.add.form = JSON.parse(JSON.stringify(row))
      this.$refs.add.mode = 'edit'
    },
    // 分配权限
    setRole (row) {
      this.showRole = true
      this.$refs.setRole.roleName = row.name
      this.$refs.setRole.getInfo(row.id)
    }
  }
}
</script>
<style></style>
