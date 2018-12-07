<template>
  <div class="memberInforMg">
    <el-form :inline="true" :model="searchData" ref="searchData" class="demo-form-inline" size='small' label-width="68px">
      <el-form-item label="昵称" prop="name">
        <el-input v-model="searchData.name" placeholder="请输入昵称" clearable></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="searchData.phone" placeholder="请输入手机号" clearable></el-input>
      </el-form-item>
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
      <el-form-item label="升级渠道" prop="channel">
        <el-select v-model="searchData.channel" placeholder="请选择升级渠道" clearable>
          <el-option label="常规" value="0"></el-option>
          <el-option label="购卡" value="1"></el-option>
          <el-option label="特权" value="2"></el-option>
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
      <el-button type="primary" size="small" :disabled="multipleSelection.length===0" @click="brush">刷成长值</el-button>
      <el-button size="small" :disabled="multipleSelection.length===0" @click="setUp">设为黑卡</el-button>
      <el-button size="small" :disabled="multipleSelection.length===0" @click="cancel">取消黑卡</el-button>
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
          prop="name"
          label="昵称"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          align="center"
          width="112"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="growUp"
          label="成长值"
          align="center"
          width="70"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="grow"
          label="等级"
          align="center"
          width="112"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="channels"
          label="升级渠道"
          align="center"
          width="78"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="consumption"
          label="近12月累计消费（元）"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="currentTime"
          label="最近登录时间"
          align="center"
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
              <dia-log title="详情" @brush = "brush"></dia-log>
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
  name: 'OperatorInforMg',
  data () {
    return {
      searchData: {
        phone: '',
        name: '',
        MGrade: '',
        channel: ''
      },
      tableData: [{
        name: 'Daisy',
        phone: '15010726635',
        growUp: '3333',
        grow: '金卡/Plus会员',
        channels: '特权',
        consumption: '188,888.88',
        currentTime: '2018-08-26 11:16:34'
      }, {
        name: 'Tidy',
        phone: '15010726635',
        growUp: '4444',
        grow: '黑卡',
        channels: '常规',
        consumption: '99,999.99',
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
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
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
    // 刷成长值
    brush (arg) {
      this.$prompt('', '刷成长值', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[1-9]\d*$/,
        inputPlaceholder: '请输入成长值',
        inputErrorMessage: '内容必须为数字且不能以0开头'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '刷成长值成功'
        })
      }).catch(() => {})
    },
    // 修改
    handleEdit (param1, param2) {
      alert(param1, param2)
    },
    // 详情
    handleDetail (param1, param2) {
      alert(param1, param2)
    },
    // 取消黑卡
    cancel () {
      this.$confirm('您确定要把被选中的用户<span class="red">取消黑卡</span>吗？', {type: 'warning', dangerouslyUseHTMLString: true})
        .then(_ => {
          this.$message({
            type: 'success',
            message: '取消黑卡成功!'
          })
        })
        .catch(_ => {})
    },

    // 设置为黑卡
    setUp () {
      this.$confirm('您确定要把被选中的用户<span class="red">设置为黑卡</span>吗？', {type: 'warning', dangerouslyUseHTMLString: true})
        .then(_ => {
          this.$message({
            type: 'success',
            message: '设置黑卡成功!'
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
.memberInforMg
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
