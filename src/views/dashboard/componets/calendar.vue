<template>
  <div class="calendar">
    <div style="text-align:right">
      <!-- 根据传入时间上下都加6年 -->
      <el-select v-model="year" @change="dateChange">
        <el-option
          v-for="(item, index) in yearArr"
          :key="index"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
      <el-select v-model="month" @change="dateChange">
        <el-option
          v-for="(item, index) in 12"
          :key="index"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </div>
    <el-calendar v-model="nowTime">
      <!-- el-calendar
           slot:
              具名插槽:dateCell
              作用域插槽 :{date,data}   
              date:当前时间的标准时间格式
              data:elementui帮我们包装的一些数据 
         -->
      <template #dateCell="{ date }">
        <div class="date">
          <span class="day">{{ date | formatDate }}</span>
          <span class="week" v-if="isWeek(date)">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>
<script>
export default {
  props: {
    localDate: {
      type: Date,
      default: () => {
        return new Date()
      } // 原始值直接赋值,引用值,()=>{return 引用值}
    }
  },
  watch: {
    localDate: {
      deep: true,
      immediate: true, // 第一次加入监听时就执行
      handler (newVal) {
        this.year = newVal.getFullYear()
        this.month = newVal.getMonth() + 1
        this.nowTime = newVal
        this.setYearArr(this.year)
      }
    }
  },
  data () {
    return {
      nowTime: new Date(),
      year: 2020,
      month: 1,
      yearArr: []
    }
  },
  filters: {
    formatDate (date) {
      let _data = new Date(date)
      return _data.getDate()
    }
  },
  methods: {
    setYearArr (_year) {
      let _min = _year - 6
      let _max = _year + 6
      let _newYear = _min
      let _arr = []
      while (_newYear <= _max && _newYear >= _min) {
        _arr.push(_newYear)
        _newYear++
      }
      this.yearArr = _arr
    },
    btnClick (data) {
      window.console.log(data)
    },
    isWeek (date) {
      //  1:判断当前时间是否当年当月
      let _date = new Date(date)
      let _year = _date.getFullYear()
      let _month = _date.getMonth() + 1
      if (_year === this.year && _month === this.month) {
        //  2:判断是否星期六与星期日
        let _day = _date.getDay()
        if (_day === 0 || _day === 6) {
          return true
        }
      }
    },
    dateChange () {
      // 如果是当前时间,就使用当前 的日,如果不是当前时间,选择1号
      let _date = new Date()
      let _year = _date.getFullYear()
      let _month = _date.getMonth() + 1

      if (this.year === _year && this.month === _month) {
        this.nowTime = new Date()
      } else {
        this.nowTime = new Date(`${this.year}/${this.month}/01`)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.calendar {
  ::v-deep .el-calendar__header {
    display: none;
  }
  ::v-deep .el-calendar-day {
    text-align: center;
  }
  .date {
    // display: flex;
    // justify-content: center;
    .day {
      display: inline-block;
      width: 30px;
      margin-right: 15px;
      line-height: 30px;
      text-align: center;
    }
    .week {
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      color: #fff;
      font-size: 14px;
      line-height: 30px;
      background-color: #fa7c4d;
    }
  }
  ::v-deep .el-calendar-table th:nth-child(6) {
    color: #fa7c4d;
  }

  ::v-deep .el-calendar-table th:nth-child(7) {
    color: #fa7c4d;
  }
}
</style>
