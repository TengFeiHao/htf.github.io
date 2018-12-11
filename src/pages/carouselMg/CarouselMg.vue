<template>
  <div class="carouselMg">
    <!-- 表格按钮 -->
    <div class="tableBtn">
      <dia-log title="新增" mold='0'></dia-log>
      <el-button size="small" :disabled="multipleSelection.length===0 || delflag" @click="startUp">启用</el-button>
      <el-button size="small" :disabled="multipleSelection.length===0" @click="stop">停用</el-button>
    </div>
    <!-- 表格 -->
    <div class="tableContainer">
      <el-table
        size="medium"
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          label-class-name="checkboxSelect"
          align="center">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="imgName"
          label="图片名称"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="图片路径"
          align="center">
          <template slot-scope="scope">
            <el-popover
              placement="right"
              trigger="hover">
              <img width="400" height="200" :src="scope.row.imgUrl" alt="">
              <div class="imgUrlText">{{scope.row.imgUrl}}</div>
              <span class="imgUrlmodel" slot="reference">{{scope.row.imgUrl}}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="imgJump"
          label="图片跳转地址"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          prop="describe"
          label="描述"
          align="center"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="currentTime"
          label="更新时间"
          align="center"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="80">
          <template slot-scope="scope">
            <!-- <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button> -->
              <dia-log title="修改" size='mini' mold='1' mr="last"></dia-log>
            <!-- <el-button
              size="mini"
              @click="handleDetail(scope.$index, scope.row)">详情</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="2">
    </el-pagination>
  </div>
</template>
<script>
import DiaLog from './DiaLog'
export default {
  name: 'CarouselMg',
  data () {
    return {
      tableData: [{
        type: '商户App',
        imgName: '图片1',
        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543136214224&di=8461231c4bd4f6af0e4c75d353fe619d&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171207%2F60918cbd27fe4642b2b68668f450abed.jpeg',
        imgJump: 'http://www.haidu.com',
        state: '停用',
        describe: 'app广告轮播图',
        currentTime: '2018-08-26 11:16:34'
      }, {
        type: '商户App',
        imgName: '图片2',
        imgUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1578230423,987471254&fm=200&gp=0.jpg',
        imgJump: 'http://www.htf.com',
        state: '启用',
        describe: '哈士奇轮播图',
        currentTime: '2018-08-26 11:16:34'
      }],
      currentPage: 2,
      multipleSelection: [],
      delflag: true
    }
  },
  components: {
    DiaLog
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.delflag = false
      this.multipleSelection.some((item) => {
        if (item.state === '启用') {
          this.delflag = true
          return false
        }
      })
    },
    // 停用
    stop () {
      this.$confirm('您确定要<span class="red">停用</span>被选中的图片吗？', {type: 'warning', dangerouslyUseHTMLString: true})
        .then(_ => {
          this.$message({
            type: 'success',
            message: '停用图片成功!'
          })
        })
        .catch(_ => {})
    },
    // 启用
    startUp () {
      this.$confirm('您确定要<span class="red">启用</span>被选中的图片吗？', {type: 'warning', dangerouslyUseHTMLString: true})
        .then(_ => {
          this.$message({
            type: 'success',
            message: '启用图片成功!'
          })
        })
        .catch(_ => {})
    },
    // 分页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style lang='stylus' ref='stylesheet/stylus' scoped>
.imgUrlText
  width 400px
  word-break break-all
  white-space pre-wrap
  overflow hidden
.carouselMg
  .tableBtn
    margin 0px 0px 18px 0
  .tableContainer
    .el-table-column--selection
      .cell
        padding-right 10px!important
  .el-pagination
    padding 0px!important
    text-align right
    margin-top 18px
  .imgUrlmodel
    display inline-block
    width 100%
    height 20px
    cursor pointer
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    &::after
      position absolute
      left 0
      top 96%
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
</style>
