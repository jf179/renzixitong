<template>
  <div class="upload">
    <input
      ref="excel-upload-input"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleClick"
    />
    <div class="left">
      <el-button
        :loading="loading"
        style="margin-left:16px;"
        size="mini"
        type="primary"
        @click="handleUpload"
      >
        点击上传
      </el-button>
    </div>
    <div
      class="right"
      @drop="handleDrop"
      @dragover="handleDragover"
      @dragenter="handleDragover"
    >
      <span>将文件拖到此外</span>
    </div>
  </div>
  <!-- <div>
    <input
      ref="excel-upload-input"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleClick"
    />
    <div
      class="drop"
      @drop="handleDrop"
      @dragover="handleDragover"
      @dragenter="handleDragover"
    >
      Drop excel file here or
      <el-button
        :loading="loading"
        style="margin-left:16px;"
        size="mini"
        type="primary"
        @click="handleUpload"
      >
        Browse
      </el-button>
    </div>
  </div> -->
</template>

<script>
import XLSX from 'xlsx'
export default {
  props: {
    // beforeUpload:可以做一些上传前的限制最后它要return一个boolean值  true:允许上传,false:中止上传
    beforeUpload: Function, // eslint-disable-line
    // onSuccess({header,results})
    onSuccess: Function // eslint-disable-line
  },
  data () {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null
      }
    }
  },
  methods: {
    generateData ({ header, results }) {
      this.excelData.header = header
      this.excelData.results = results
      this.onSuccess && this.onSuccess(this.excelData)
    },
    handleDrop (e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('Only support uploading one file!')
        return
      }
      const rawFile = files[0] // only use files[0]
      if (!this.isExcel(rawFile)) {
        this.$message.error(
          'Only supports upload .xlsx, .xls, .csv suffix files'
        )
        return false
      }
      this.upload(rawFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover (e) {
      e.stopPropagation()
      e.preventDefault()
      // 改变鼠标开状
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload () {
      this.$refs['excel-upload-input'].click()
    },
    handleClick (e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      if (!this.isExcel(rawFile)) {
        this.$message.error(
          'Only supports upload .xlsx, .xls, .csv suffix files'
        )
        return
      }
      this.upload(rawFile)
    },
    upload (rawFile) {
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel
      if (!this.beforeUpload) {
        this.readerData(rawFile)
        return
      }
      const before = this.beforeUpload(rawFile) // return boolean值  true:允许 上传  false:中止上传
      if (before) {
        this.readerData(rawFile)
      }
    },
    // 插件解析excel
    readerData (rawFile) {
      this.loading = true
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const header = this.getHeaderRow(worksheet)
          const results = XLSX.utils.sheet_to_json(worksheet)
          this.generateData({ header, results })
          this.loading = false
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    getHeaderRow (sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    isExcel (file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.excel-upload-input {
  display: none;
  z-index: -9999;
}
/* .drop {
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
} */
.upload {
  width: 1000px;
  height: 200px;
  margin: 100px auto;
  border: 2px dashed #bbb;
  display: flex;
  .left {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 2px dashed #bbb;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
