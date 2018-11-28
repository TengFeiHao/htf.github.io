<template>
  <div class="operatorInforMg">
    <el-form :inline="true" :model="searchData" ref="searchData" class="demo-form-inline" size='small' label-width="82px">
      <el-form-item label="操作员账号" prop="account">
        <el-input v-model="searchData.account" placeholder="请输入操作员账号" clearable></el-input>
      </el-form-item>
      <el-form-item label="操作员姓名" prop="name">
        <el-input v-model="searchData.name" placeholder="请输入操作员姓名" clearable></el-input>
      </el-form-item>
      <el-form-item label="所属角色" prop="role">
        <el-select v-model="searchData.role" placeholder="请选择所属角色" clearable>
          <el-option label="全部" value="0"></el-option>
          <el-option label="超级管理员" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-select v-model="searchData.state" placeholder="请选择状态" clearable>
          <el-option label="全部" value="0"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="停用" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm('searchData')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="divisionLine"></div>
    <!-- 表格按钮 -->
    <div class="tableBtn">
      <el-button type="primary" @click="onSubmit" size="small">新增</el-button>
      <el-button size="small">重置密码</el-button>
      <el-button type="primary" size="small">启用</el-button>
      <el-button size="small">停用</el-button>
      <el-button type="danger" size="small">删除</el-button>
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
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              @click="handleDetail(scope.$index, scope.row)">详情</el-button>
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
        state: '启用',
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
      currentPage: 2
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
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
    margin 18px 0;
  .tableContainer
    .el-table-column--selection
      .cell
        padding-right 10px!important;
  .el-pagination
    padding 0px!important;
    text-align right;
    margin-top 18px
</style>
