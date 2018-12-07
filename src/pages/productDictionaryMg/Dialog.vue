<template>
  <div class="dialogProDic" :style="{'margin-right': mr==='last'?'0px':'10px'}">
    <el-button :type="type" @click="dialogFormVisible = true" :size="size">{{title}}</el-button>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="closeForm"  width="700px" top="0">
      <el-form :inline="true" :model="form" ref="form" size="small" class="formTop">
        <el-form-item label="字段" prop="field">
          <el-input class="width250" :disabled="true" v-model="form.field"></el-input>
        </el-form-item>
        <el-form-item label="字段名" prop="fieldName">
          <el-input class="width250" :disabled="true" v-model="form.fieldName"></el-input>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <div class="tableContainer">
        <el-table
          size="medium"
          border
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark">
          <el-table-column
            prop="number"
            label="枚举值编号"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="value"
            label="枚举值"
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
                <cdia-log title="编辑" size='mini' mold='1'></cdia-log>
                <el-button size="mini" type="danger">删除</el-button>
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
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeForm">取 消</el-button>
        <el-button size="small" type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import CdiaLog from './CdiaLog'
export default {
  name: 'DialogProDic',
  props: {
    title: {
      type: String
    },
    size: {
      type: String,
      default: 'small'
    },
    type: {
      type: String,
      default: 'primary'
    },
    mold: {
      type: String
    },
    mr: {
      type: String
    }
  },
  components: {
    CdiaLog
  },
  data () {
    return {
      currentPage: 2,
      dialogFormVisible: false,
      form: {
        field: '',
        fieldName: ''
      },
      tableData: [{
        number: '00',
        value: '鲜花'
      }, {
        number: '01',
        value: '永生花礼盒'
      }]
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 关闭dialog
    closeForm () {
      this.$refs['form'].resetFields()
      this.dialogFormVisible = false
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
.dialogProDic
  display inline-block
  .formTop
    display flex
    justify-content space-between
    &>div
      margin-right 0px
    .width250
      width 250px
</style>
