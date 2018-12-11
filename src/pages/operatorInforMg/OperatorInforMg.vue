<template>
  <div class="operatorInforMg">
    <el-form :inline="true" :model="searchData" ref="searchData" class="demo-form-inline" size='small' label-width="82px">
      <el-form-item label="操作员账号" prop="account">
        <el-input v-model.trim="searchData.account" placeholder="请输入操作员账号" clearable></el-input>
      </el-form-item>
      <el-form-item label="操作员姓名" prop="name">
        <el-input v-model.trim="searchData.name" placeholder="请输入操作员姓名" clearable></el-input>
      </el-form-item>
      <el-form-item label="所属角色" prop="role">
        <el-select v-model.trim="searchData.role" placeholder="请选择所属角色" clearable>
          <el-option label="全部" value="0"></el-option>
          <el-option label="超级管理员" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-select v-model.trim="searchData.state" placeholder="请选择状态" clearable>
          <el-option label="全部" value="0"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="停用" value="2"></el-option>
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
      <dia-log title="新增" mold='0'></dia-log>
      <el-button type="danger" size="small" :disabled="multipleSelection.length===0 || delflag" @click="delamin">删除</el-button>
      <el-button type="primary" size="small" :disabled="multipleSelection.length===0" @click="startUp">启用</el-button>
      <el-button size="small" :disabled="multipleSelection.length===0" @click="stop">停用</el-button>
      <el-button size="small" :disabled="multipleSelection.length===0" @click="resetPassword">重置密码</el-button>
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
          prop="account"
          label="操作员账号"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作员姓名"
          align="center"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          align="center"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="role"
          label="所属角色"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="creatTime"
          label="创建时间"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          align="center"
          width="60">
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
          width="160">
          <template slot-scope="scope">
            <!-- <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button> -->
              <dia-log title="修改" size='mini' mold='1'></dia-log>
              <dia-log title="详情" size='mini' type=""  mold='2' mr='last'></dia-log>
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
        account: '',
        name: '',
        role: '',
        state: ''
      },
      tableData: [{
        account: 'T000002',
        name: '王小虎',
        phone: '15010726635',
        role: '医院专家',
        creatTime: '2018-08-26 11:16:34',
        state: '停用',
        currentTime: '2018-08-26 11:16:34'
      }, {
        account: 'T000002',
        name: '王小虎',
        phone: '15010726635',
        role: '医院专家',
        creatTime: '2018-08-26 11:16:34',
        state: '启用',
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
    // 修改
    handleEdit (param1, param2) {
      alert(param1, param2)
    },
    // 详情
    handleDetail (param1, param2) {
      alert(param1, param2)
    },
    // 重置密码
    resetPassword () {
      this.$confirm('您确定要<span class="red">重置</span>被选中用户的密码吗？', {type: 'warning', dangerouslyUseHTMLString: true})
        .then(_ => {
          this.$message({
            type: 'success',
            message: '重置密码成功!'
          })
        })
        .catch(_ => {})
    },
    // 停用
    stop () {
      this.$confirm('您确定要<span class="red">停用</span>被选中的用户吗？', {type: 'warning', dangerouslyUseHTMLString: true})
        .then(_ => {
          this.$message({
            type: 'success',
            message: '停用用户成功!'
          })
        })
        .catch(_ => {})
    },

    // 启用
    startUp () {
      this.$confirm('您确定要<span class="red">启用</span>被选中的用户吗？', {type: 'warning', dangerouslyUseHTMLString: true})
        .then(_ => {
          this.$message({
            type: 'success',
            message: '启用用户成功!'
          })
        })
        .catch(_ => {})
    },
    // 删除
    delamin () {
      this.$confirm('您确定要<span class="red">删除</span>被选中的用户吗？', {type: 'warning', dangerouslyUseHTMLString: true})
        .then(_ => {
          this.$message({
            type: 'success',
            message: '删除用户成功!'
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
.operatorInforMg
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
