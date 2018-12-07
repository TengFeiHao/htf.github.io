<template>
  <div class="memberLevelMg">
    <el-form :inline="true" :model="searchData" ref="searchData" class="demo-form-inline" size='small'>
      <el-form-item label="会员等级" prop="MGrade">
        <el-select v-model="searchData.MGrade" placeholder="请选择会员等级" clearable>
          <el-option label="全部" value="0"></el-option>
          <el-option label="普卡" value="1"></el-option>
          <el-option label="金卡" value="2"></el-option>
          <el-option label="白金卡" value="3"></el-option>
          <el-option label="钻石卡" value="4"></el-option>
          <el-option label="黑卡" value="5"></el-option>
          <el-option label="Plus会员" value="6"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button @click="resetForm('searchData')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="divisionLine"></div>
    <!-- 表格按钮 -->
    <div class="tableBtn">
      <dia-log title="新增"></dia-log>
    </div>
    <!-- 表格 -->
    <div class="tableContainer">
      <el-table
        size="medium"
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark">
        <el-table-column
          type="index"
          align="center">
        </el-table-column>
        <el-table-column
          prop="level"
          label="会员等级"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="consumption"
          label="近12月累计消费金额（元）"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="purchase"
          label="购卡金额"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="160">
          <template slot-scope="scope">
            <!-- <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button> -->
              <dia-log title="修改" size="mini"></dia-log>
              <el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
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
  name: 'MemberLevelMg',
  data () {
    return {
      searchData: {
        MGrade: ''
      },
      tableData: [{
        level: '普卡',
        consumption: '0.00~1,499.99',
        purchase: '298.00'
      }, {
        level: '金卡',
        consumption: '1,500.00~4,499.99',
        purchase: '2928.00'
      }, {
        level: '白金卡',
        consumption: '4,500.00~9,499.99',
        purchase: '2982.00'
      }, {
        level: '钻石卡',
        consumption: '9,500.00+',
        purchase: '29228.00'
      }, {
        level: '黑卡',
        consumption: '-',
        purchase: '298.00'
      }, {
        level: 'Plus会员',
        consumption: '-',
        purchase: '298.00'
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
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 删除
    del (arg) {
      this.$confirm('您确定要<span class="red">删除</span>会员等级<span class="red">[' + arg.level + ']</span>吗？', {type: 'warning', dangerouslyUseHTMLString: true})
        .then(_ => {
          this.$message({
            type: 'success',
            message: '删除会员等级 [' + arg.level + '] 成功!'
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
<style lang='stylus' ref='stylesheet/stylus'>
.memberLevelMg
  .tableBtn
    margin 18px 0
  .tableContainer
    .el-table-column--selection
      .cell
        padding-right 10px!important
  .el-pagination
    padding 0px!important
    text-align right
    margin-top 18px
</style>
