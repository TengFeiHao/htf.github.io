<template>
  <div class="dialogMinfoMg" style="margin-right: 0px">
    <el-button @click="dialogFormVisible = true" size="mini">{{title}}</el-button>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="closeForm"  width="500px" top="0">
      <table border="1" width="100%"  cellspacing="0"  align="center">
        <tbody>
          <tr>
            <td width="80" class="weight">
              昵称
            </td>
            <td width="112">
              Daisy
            </td>
            <td width="80" class="weight">性别</td>
            <td width="100">女</td>
            <td rowspan="2" class="userImg">
              <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543136214224&di=8461231c4bd4f6af0e4c75d353fe619d&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171207%2F60918cbd27fe4642b2b68668f450abed.jpeg" alt="">
            </td>
          </tr>
          <tr>
            <td class="weight">城市</td>
            <td>北京</td>
            <td class="weight">
              手机号
            </td>
            <td>13888888888</td>
          </tr>
          <tr>
            <td class="weight">等级</td>
            <td>黑卡</td>
            <td class="weight">升级渠道</td>
            <td colspan="2">特权</td>
          </tr>
          <tr>
            <td class="weight">成长值(总)</td>
            <td>6666</td>
            <td class="weight">成长值(刷)</td>
            <td>9999</td>
            <td>
              <span class="brush" @click="brush">刷成长值</span>
            </td>
          </tr>
          <tr>
            <td colspan="3" class="weight">近12月累计消费</td>
            <td colspan="2">￥188,888.88</td>
          </tr>
          <tr>
            <td colspan="3" class="weight">注册时间</td>
            <td colspan="2">2018-11-28 17：04：43</td>
          </tr>
        </tbody>
      </table>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeForm">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Dialog',
  props: {
    title: {
      type: String
    }
  },
  data () {
    return {
      dialogFormVisible: false,
    }
  },
  methods: {
    // 关闭dialog
    closeForm () {
      this.dialogFormVisible = false
    },
    // 刷票
    brush () {
      this.$emit('brush','传值')
    } 
  }
}
</script>
<style lang='stylus' ref='stylesheet/stylus' scoped>
.dialogMinfoMg
  img
    width 87px
    height 87px
    background-size 100% 100%
  table
    border-top 1px solid #ebeef5
    border-left 1px solid #ebeef5
    border-bottom none
    border-right none
    .weight
      font-weight 600
    .brush
      font-weight 600
      color #66b1ff
      cursor pointer
      display inline
      text-align center
      position relative
      &::after
        position absolute
        left 0
        top 100%
        content ''
        background-color #666
        width 100%
        transform scale(0)
        -webkit-transform scale(0)
        transition all .5s
        -webkit-transition all .5s
      &:hover::after
        height 2px
        -webkit-transform scale(1)
        transform scale(1)
    tr,td
      border-top none
      border-left none
      text-align center
    .userImg
      padding 0px
      line-height 0px
</style>
