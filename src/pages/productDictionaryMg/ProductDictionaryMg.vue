<template>
  <div class="productDictionaryMg">
    <el-form :inline="true" :model="searchData" ref="searchData" class="demo-form-inline" size='small'>
      <el-form-item label="字段" prop="field">
        <el-input v-model.trim="searchData.field" placeholder="请输入字段" clearable></el-input>
      </el-form-item>
      <el-form-item label="字段名" prop="fieldName">
        <el-input v-model.trim="searchData.fieldName" placeholder="请输入字段名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button @click="resetForm('searchData')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="divisionLine"></div>
    <!-- 表格按钮 -->
    <div class="tableBtn">
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
          prop="field"
          label="字段"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="fieldName"
          label="字段名"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="fieldType"
          label="字段类型"
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
              <dia-log title="修改" size='mini' :typeFlag="scope.row.typeFlag"></dia-log>
              <dia-log title="详情" size='mini' type="" mr='last' :typeFlag="scope.row.typeFlag" :detailBtn="true"></dia-log>
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
  name: 'ProductDictionaryMg',
  data () {
    return {
      searchData: {
        field: '',
        fieldName: ''
      },
      tableData: [{
        field: 'product_sort',
        fieldName: '产品分类',
        fieldType: '下拉列表',
        typeFlag: 1
      }, {
        field: 'product_brand',
        fieldName: '产品品牌',
        fieldType: '下拉列表',
        typeFlag: 2
      }, {
        field: 'Selected_sort',
        fieldName: '精选分类',
        fieldType: '下拉列表',
        typeFlag: 3
      }],
      currentPage: 2
    }
  },
  components: {
    DiaLog
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
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
.productDictionaryMg
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
