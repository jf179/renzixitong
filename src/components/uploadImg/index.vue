<template>
  <div class="uploadImg">
    <!-- 
       el-upload
         action:上传的接口地址
         show-file-list:是否显示文件列表
        on-success:上传和成功的回调处理
        before-upload:上传前的处理(限制上传文件大小与类型之类)
        http-request:自定义上传
        需求:1:图片的显示预览    
               v-model
               子组件标签  v-model="图片的路径变量"  (:value="图片的路径变量" @input="(str)=>{图片的路径变量=str}")
               子组件内:
                   props:['value']
                   上传成功后:this.$emit('input',图片路径)
             2:图片删除
             有图片时鼠标移入出现x,点击x删除图片
             3:点击图片,大图片预览
                点击img
                预览:el-dialog
             4:上传功能
                需要使用腾讯云插件
                1:安装
                   npm i cos-js-sdk-v5 --save
                2:导入
                  import COS from 'cos-js-sdk-v5'
                3:实例化
                   var cos = new COS({
                        SecretId: 'COS_SECRETID', // 身份识别 ID
                        SecretKey: 'COS_SECRETKEY', // 身份密钥
                    });
                4:使用
                   cos.putObject({
                        Bucket: '存储桶名', /* 必须 */
                        Region: '区域字段',     /* 存储桶所在地域，必须字段 */
                        Key: '上传文件的名字',              /* 必须 */
                        StorageClass: 'STANDARD',
                        Body: '上传的文件对象', // 上传文件对象
                        onProgress: (progressData)=> {
                        progressData:上传过程中的实时进度对象
                            console.log(JSON.stringify(progressData));
                        }
                        }, (err, data)=> {
                        data:上传成功后的返回值
                        err:上传出错的错误信息
                        console.log(err || data);
                        });
               5:el-upload
                    http-request(res){  res.file文件对象 }

       -->

    <el-upload
      class="avatar-uploader"
      action="#"
      :http-request="httpRequest"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
    >
      <img
        @click.stop.prevent="isShow = true"
        v-if="imageUrl"
        :src="imageUrl"
        class="avatar"
        v-imgerror="avatar"
      />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div v-if="imageUrl" class="del" @click="del">X</div>
    <!-- 
       vue动画
       动画条件:  v-if/v-show/路由切换
          单元素动画:
             1:用transition包住动画元素
             2:transition  name="值就是动画css的前缀xxx"
             .xxx-enter-active:进入动画执行体
             .xxx-leave-active:进入动画执行体
             .xxx-enter:进入前状态处理(希望从某个状态变到正常状态)
             .xxx-leave-to:离开时.希望从正常状态变到某个状态
     -->
    <transition name="xxx">
      <el-progress
        v-if="showLoading"
        :percentage="percentage"
        :color="customColor"
      ></el-progress>
    </transition>
    <el-dialog :visible.sync="isShow" title="图片预览">
      <div style="text-align:center">
        <img :src="imageUrl" alt="" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
// SecretId: AKIDNXR8bpeSF1JL8EyZopxRfdHgqGUeuEn8
// SecretKey: HJ9mAbQEn7jgjY9swEI6yAamk7MN8hty
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDNXR8bpeSF1JL8EyZopxRfdHgqGUeuEn8', // 身份识别 ID
  SecretKey: 'HJ9mAbQEn7jgjY9swEI6yAamk7MN8hty' // 身份密钥
})
export default {
  props: ['imageUrl'],
  model: {
    prop: 'imageUrl'
  },
  data () {
    return {
      isShow: false,
      percentage: 0,
      customColor: '#409eff',
      showLoading: false,
      avatar: require('@/assets/common/head.jpg')
    }
  },
  methods: {
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG,PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    del () {
      this.$emit('input', '')
    },
    // 自定义上传
    httpRequest (res) {
      window.console.log('httpRequest', res)
      this.showLoading = true
      cos.putObject(
        {
          Bucket: 'dhf481229-1305249343' /* 必须:存储桶 */,
          Region: 'ap-guangzhou' /* 存储桶所在地域，必须字段 */,
          Key: res.file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: res.file, // 上传文件对象
          onProgress: progressData => {
            this.percentage = progressData.percent * 100
            if (progressData.percent === 1) {
              setTimeout(() => {
                this.showLoading = false
                this.percentage = 0
              }, 2000)
            }
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          // err:有错误时表示 上传失败了,没有表示 上传成功,上传成功就会返回data数据
          if (!err) {
            let _imgUrl = 'http://' + data.Location
            this.$emit('input', _imgUrl)
          }
        }
      )
    }
  }
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.uploadImg {
  width: 178px;
  height: 178px;
  position: relative;
  &:hover {
    .del {
      display: block;
    }
  }
}
.del {
  position: absolute;
  top: 20px;
  right: 10px;
  color: red;
  font-size: 24px;
  display: none;
  cursor: pointer;
}
</style>
<style lang="scss" scoped>
.xxx-enter-active {
  transition: all 0.5s;
}
.xxx-leave-active {
  transition: all 0.5s;
}

.xxx-enter {
  opacity: 0;
  transform: translateY(50px);
}
.xxx-leave-to {
  opacity: 0;
  transform: translateY(50px);
}
</style>
