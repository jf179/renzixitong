<template>
  <div class="employees">
    <tools :showLeft="false">
      <template #right>
        <div>
          <el-button
            type="primary"
            @click="$router.push('/uploadExcel?redirect=' + $route.fullPath)"
            >导入</el-button
          >
          <!-- v-if="$store.getters.roles.points.includes('employees_addButton')" -->
          <el-button
            v-if="checkButton('employees_addButton')"
            type="primary"
            @click="addClick"
            >+新增员工</el-button
          >
          <!-- 
            1:定义一个弹框组件
            2：完成基本布局
            3：新增 时能够控制弹框显示
            4：表单处理
            5：新增接口调用
            6：调用完成：关闭弹框清空数据，刷新父级列表数据
           -->
        </div>
      </template>
    </tools>
    <el-card>
      <el-table :data="list">
        <el-table-column label="序号">
          <template v-slot="{ $index }">
            {{ (page.page - 1) * page.size + $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="照片">
          <template v-slot="{ row }">
            <!-- 
              1:点击事件
                做些限制,如果图片地址没有的就不能显示弹框
              2:弹框组件
                  生成二维码
                  1:安装
                  2:导入
                  3:使用
              


             -->
            <img
              class="avatar"
              @click="showQrcode(row.staffPhoto)"
              v-imgerror="avatar"
              :src="row.staffPhoto"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="username"> </el-table-column>
        <el-table-column label="手机号" prop="mobile"> </el-table-column>
        <el-table-column label="工号" prop="workNumber"> </el-table-column>
        <!-- 
          1:导入相应的js文件
          2:将表格数据写成自定义插槽模式
          3:过滤器转换
          filters:只用于字符加工
             filters:{
               // 不能使用this,只能用于{{}}与v-bind
               方法名(参数){
                 return 值
               }
             }
             {{参数 | 方法名(参数2)}}
             Vue.filter(方法名,(参数)=>{ return值})
         -->
        <el-table-column
          label="聘用形式"
          prop="formOfEmployment"
          :formatter="formatterFormOf"
        >
          <!-- <template v-slot="scope">
            {{ scope.row.formOfEmployment | formatFormOf }}
          </template> -->
        </el-table-column>
        <el-table-column label="部门" prop="departmentName"> </el-table-column>
        <el-table-column label="入职时间" prop="timeOfEntry">
          <template v-slot="{ row }">
            {{ row.timeOfEntry | formatTime }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="是否在职" > </el-table-column> -->
        <!-- <el-table-column label="状态"> </el-table-column> -->
        <el-table-column label="操作" width="300">
          <template v-slot="{ row }">
            <div>
              <!-- 新的页面跳转
              1:创建一个详情页面
              2:配制路由
              3:路由传参
                 基本路由传参
                    传:
                      this.$router.push("/xxx?参数名=值")
                      this.$router.push({
                        path:"/xxx",
                        query:{
                          参数名:值
                        }
                      })
                    收:this.$route.query.参数名
                 动态路由匹配
                    路由配制
                       {
                         path:'/xxx/:参数名?',
                         component...
                       }
                     路由跳转
                     this.$router.push('/xxx/参数值')
                     接收参数:
                     this.$route.params.参数名
                 通过name传参
                     路由匹配
                     {
                       path:"/xxx",
                       name:'xxx'
                     }
                     路由跳转
                     this.$router.push({
                       name:"name的值(xxx)",
                       query:{
                         它是拼接在url上的
                         参数名:参数值
                         接收:this.$route.query.参数名
                       },
                       params:{
                         它是在内存中存在的(刷新页面就没有了)
                         参数名:参数值
                         接收:this.$route.params.参数名
                       }
                     })
                     






              
               -->
              <el-button type="text" @click="look(row.id)">查看</el-button>
              <el-button type="text">转正</el-button>
              <el-button type="text">调岗</el-button>
              <el-button type="text">离职</el-button>
              <el-button type="text" @click="roleClick(row.id)">角色</el-button>

              <el-button type="text" @click="del(row.id)">删除</el-button>
              <!-- 
                1:确定弹框
                2：删除api调用
                3：刷新列表数据（需要page回到第一页）
               -->
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.page"
        :page-sizes="[5, 100, 200, 300, 400]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </el-card>
    <!-- <div>{{ 1 | formatFormOf }}</div>
    {{ num }}
    <button @click="num++">点我啊</button> -->
    <add v-model="isShow" @getData="getData"></add>
    <setRole ref="setRole" @getData="getData"></setRole>
    <el-dialog :visible.sync="qrcodeShow" title="图片二维码">
      <!-- el-form
         this.$refs.form.resetFields()     重置      
       -->
      <div style="text-align:center">
        <canvas ref="canvas"></canvas>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 1:定义api  2:导入api  3:created调用渲染数据
import { sysUser, sysUserDel } from '@/api/employees'
import employeesData from '@/utils/constant/employees'
import add from './components/add'
import setRole from './components/setRole'
import QRCode from 'qrcode'
export default {
  components: {
    add,
    setRole
  },
  data () {
    return {
      qrcodeShow: false,
      avatar: require('@/assets/common/head.jpg'),
      isShow: false,
      list: [],
      num: 1,
      page: {
        page: 1,
        size: 5,
        total: 10
      }
    }
  },
  async created () {
    await this.getData()
  },

  methods: {
    formatterFormOf (row, column, value, index) {
      let _obj = employeesData.hireType.find(item => {
        return item.id === +value
      })
      return _obj ? _obj.value : '未知'
    },
    formatFormOf (str) {
      window.console.log('formatFormOf', str)
      let _obj = employeesData.hireType.find(item => {
        return item.id === str
      })
      return _obj.value
    },
    async getData () {
      const res = await sysUser(this.page)
      this.list = res.rows
      this.page.total = res.total
      // window.console.log('员工列表：', res)
    },
    handleSizeChange (size) {
      this.page.size = size
      this.page.page = 1
      this.getData()
    },
    handleCurrentChange (page) {
      this.page.page = page
      this.getData()
    },
    // 删除
    del (id) {
      this.$confirm('您确定删除该员工帐号吗?', '温馨提示').then(async () => {
        await sysUserDel(id)
        this.$message.success('删除成功')
        this.handleCurrentChange(1)
      })
    },
    // 新增
    addClick () {
      this.isShow = true
    },
    // 查看员工详情
    look (id) {
      this.$router.push('/employees/detail/' + id)
    },
    showQrcode (src) {
      if (src) {
        // 显示二维码弹框
        this.qrcodeShow = true
        // window.console.log(this.$refs.canvas)
        this.$nextTick(() => {
          QRCode.toCanvas(this.$refs.canvas, src, { width: 200, height: 200 })
        })
      }
    },
    // 角色 点击
    roleClick (id) {
      this.$refs.setRole.isShow = true
      // 获取当前用户的角色信息
      this.$refs.setRole.getUserRole(id)
    }
  }
}
</script>
<style lang="scss" scoped>
.avatar {
  width: 50px;
  height: 50px;
  object-fit: contain;
}
</style>
