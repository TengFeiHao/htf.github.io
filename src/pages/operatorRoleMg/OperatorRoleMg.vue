<template>
  <div class="operatorRoleMg">
    <el-form :inline="true" :model="searchData" ref="searchData" class="demo-form-inline" size='small'>
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="searchData.roleName" placeholder="请输入角色名称" clearable></el-input>
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
          prop="role"
          label="角色名称"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="roleType"
          label="角色状态"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="upData"
          label="更新时间"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="operator"
          label="操作员"
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
  name: 'OperatorRoleMg',
  data () {
    return {
      searchData: {
        roleName: ''
      },
      tableData: [{
        role: '超级管理员',
        roleType: '启用',
        upData: '2018-08-26 11:16:34',
        operator: 'T000002'
      }, {
        role: '超级管理员',
        roleType: '停用',
        upData: '2018-08-26 11:16:34',
        operator: 'T000002'
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
        if (item.roleType === '启用') {
          this.delflag = true
          return false
        }
      })
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
.operatorRoleMg
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
