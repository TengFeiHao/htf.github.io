<template>
  <div class="home">
    <div class="top">
      <div class="content">
        <div class="item">
          <i class="iconfont htf-xinzengyugengxinkehudangan icon icon1"></i>
          <div class="itemRight">
            <div class="font1">0</div>
            <div>今日新增用户</div>
          </div>
        </div>
        <div class="item">
          <i class="iconfont htf-liulanjilu icon icon2"></i>
          <div class="itemRight">
            <div class="font2">0</div>
            <div>今日浏览量</div>
          </div>
        </div>
        <div class="item">
          <i class="iconfont htf-xinzengyugengxinxiaoshoudingdan icon icon3"></i>
          <div class="itemRight">
            <div class="font3">0</div>
            <div>今日新增订单</div>
          </div>
        </div>
        <div class="item">
          <i class="iconfont htf-xinzengdaikuan icon icon4"></i>
          <div class="itemRight">
            <div class="font4">0</div>
            <div>今日营收</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="glod">交易统计</div>
      <ve-histogram
        :data="chartData"
        :settings="chartSettings"
        :data-zoom="dataZoom"
        :grid="grid"
        :loading="loading"
        :data-empty="dataEmpty"
        :after-set-option="getEcharts"></ve-histogram>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'Home',
  data () {
    this.grid = {
      show: true,
      top: 50,
      left: 0,
      right: 0,
      borderColor: '#e8eaec'
    }
    this.dataZoom = [
      {
        type: 'slider',
        start: 0,
        end: 100
      }
    ]
    this.chartSettings = {
      showLine: ['成功交易笔数'],
      axisSite: { right: ['成功交易笔数'] },
      yAxisName: ['单位:元           ', '           单位:笔']
    }
    return {
      echartsExa: '',
      chartData: {
        columns: ['日期', '成功交易额', '成功交易笔数'],
        rows: [
          { '日期': '01/01', '成功交易额': 1393, '成功交易笔数': 3222 },
          { '日期': '01/02', '成功交易额': 3530, '成功交易笔数': 222 },
          { '日期': '01/03', '成功交易额': 2923, '成功交易笔数': 424 },
          { '日期': '01/04', '成功交易额': 1723, '成功交易笔数': 2222 },
          { '日期': '01/05', '成功交易额': 3792, '成功交易笔数': 212 },
          { '日期': '01/06', '成功交易额': 4593, '成功交易笔数': 33 },
          { '日期': '01/07', '成功交易额': 1393, '成功交易笔数': 3222 },
          { '日期': '01/08', '成功交易额': 3530, '成功交易笔数': 222 },
          { '日期': '01/09', '成功交易额': 2923, '成功交易笔数': 424 },
          { '日期': '01/10', '成功交易额': 1723, '成功交易笔数': 2222 },
          { '日期': '01/11', '成功交易额': 3792, '成功交易笔数': 212 },
          { '日期': '01/12', '成功交易额': 4593, '成功交易笔数': 33 },
          { '日期': '01/13', '成功交易额': 1393, '成功交易笔数': 3222 },
          { '日期': '01/14', '成功交易额': 3530, '成功交易笔数': 222 },
          { '日期': '01/15', '成功交易额': 2923, '成功交易笔数': 424 },
          { '日期': '01/16', '成功交易额': 1723, '成功交易笔数': 2222 },
          { '日期': '01/17', '成功交易额': 3792, '成功交易笔数': 212 },
          { '日期': '01/18', '成功交易额': 4593, '成功交易笔数': 33 },
          { '日期': '01/19', '成功交易额': 1393, '成功交易笔数': 3222 },
          { '日期': '01/20', '成功交易额': 3530, '成功交易笔数': 222 },
          { '日期': '01/21', '成功交易额': 2923, '成功交易笔数': 424 },
          { '日期': '01/22', '成功交易额': 1723, '成功交易笔数': 2222 },
          { '日期': '01/23', '成功交易额': 3792, '成功交易笔数': 212 },
          { '日期': '01/24', '成功交易额': 4593, '成功交易笔数': 33 },
          { '日期': '01/25', '成功交易额': 1393, '成功交易笔数': 3222 },
          { '日期': '01/26', '成功交易额': 3530, '成功交易笔数': 222 },
          { '日期': '01/27', '成功交易额': 2923, '成功交易笔数': 424 },
          { '日期': '01/28', '成功交易额': 1723, '成功交易笔数': 2222 },
          { '日期': '01/29', '成功交易额': 3792, '成功交易笔数': 212 },
          { '日期': '01/30', '成功交易额': 4593, '成功交易笔数': 33 }
        ]
      },
      loading: false,
      dataEmpty: false
    }
  },
  computed: {
    ...mapState(['slideBarToggle'])
  },
  watch: {
    slideBarToggle () {
      setTimeout(() => {
        this.echartsExa.resize()
      }, 300)
    }
  },
  methods: {
    getEcharts (echarts) {
      this.echartsExa = echarts
    }
  }
}
</script>
<style lang='stylus' ref='stylesheet/stylus' scoped>
.home
  .top
    margin-bottom 18px
    .content
      display flex
      justify-content space-around
      .item
        width 25%
        height 100px
        display flex
        align-items center
        .icon
          width 30%
          height 100%
          display flex
          align-items center
          justify-content center
          color #fff
          border-radius: 4px 0 0 4px
          &.icon1
            font-size 40px
            background-color #409eff
          &.icon2
            font-size 46px
            background-color rgb(100, 213, 114)
          &.icon3
            font-size 40px
            background-color rgb(45, 140, 240)
          &.icon4
            font-size 44px
            background-color rgb(255, 213, 114)
        .itemRight
          width 80%
          height 100%
          display flex
          flex-direction column
          align-items center
          justify-content space-between
          padding 18px 0
          border 1px solid #e8eaec
          border-top-right-radius 4px
          border-bottom-right-radius 4px
          border-left none
          margin-right 18px
          color #c8c8c8
          font-size 14px
          font-weight 500
          .font1
            font-size 30px
            font-weight 700
            color #409eff
          .font2
            font-size: 30px
            font-weight: 700
            color rgb(100, 213, 114)
          .font3
            font-size: 30px
            font-weight: 700
            color rgb(45, 140, 240)
          .font4
            font-size: 30px
            font-weight: 700
            color rgb(255, 213, 114)
  .bottom
    .glod
      color #c8c8c8
      font-weight bold
      text-shadow -1px 0px #000
</style>
