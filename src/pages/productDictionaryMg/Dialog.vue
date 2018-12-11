<template>
  <div class="dialogProDic" :style="{'margin-right': mr==='last'?'0px':'10px'}">
    <el-button :type="type" @click="init" :size="size">{{title}}</el-button>
    <el-dialog :close-on-click-modal='false' :close-on-press-escape='false' :title="title" :visible.sync="dialogFormVisible" @close="closeForm"  width="700px" top="0">
      <el-form :inline="true" :model="form" ref="form" size="small" class="formTop">
        <el-form-item label="字段" prop="field">
          <el-input class="width250" :disabled="true" v-model.trim="form.field"></el-input>
        </el-form-item>
        <el-form-item label="字段名" prop="fieldName">
          <el-input class="width250" :disabled="true" v-model.trim="form.fieldName"></el-input>
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
            label="枚举值编号"
            align="center"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input v-model.trim="scope.row.number"  v-if="false" size="mini"></el-input>
              <div v-else>{{scope.row.number}}</div>
            </template>
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
            :width="detailBtn?'80':'160'">
            <template slot-scope="scope">
              <!-- <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">修改</el-button> -->
                <cdia-log :title="detailBtn?'详情':'编辑'" :type="detailBtn?'':'primary'" size='mini' :typeFlag="typeFlag" :detailBtn='detailBtn' :mr="detailBtn?'last':''"></cdia-log>
                <el-button v-if="!detailBtn" size="mini" type="danger" @click="delTable(scope.$index)">删除</el-button>
              <!-- <el-button
                size="mini"
                @click="handleDetail(scope.$index, scope.row)">详情</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加按钮 -->
      <cdia-log v-if="!detailBtn" class="addBtn" type="" title="添 加" :typeFlag="typeFlag" size='mini' :btnWidth="true" @dialogSuccess="successCallback"></cdia-log>
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
    mr: {
      type: String
    },
    typeFlag: {
      type: Number
    },
    detailBtn: {
      type: Boolean,
      default: false
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
    init () {
      this.dialogFormVisible = true
      this.tableData = [{
        number: '00',
        value: '鲜花'
      }, {
        number: '01',
        value: '永生花礼盒'
      }]
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
    // 点击删除
    delTable (flag) {
      this.$confirm('您确定要<span class="red">删除</span>这个枚举吗？', {type: 'warning', dangerouslyUseHTMLString: true})
        .then(_ => {
          this.tableData.splice(flag, 1)
          this.$message({
            type: 'success',
            message: '删除枚举成功!'
          })
        })
        .catch(_ => {})
    },
    // 子组件成功回调
    successCallback (params) {
      this.tableData.push({
        number: params.number,
        value: params.value
      })
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
.dialogProDic
  display inline-block
  .formTop
    display flex
    justify-content space-between
    &>div
      margin-right 0px
    .width250
      width 250px
  .addBtn
    width 100%
    height 50px
    margin-top 18px
</style>
