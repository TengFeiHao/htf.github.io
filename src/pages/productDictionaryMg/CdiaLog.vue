<template>
  <div class="cdiaLog" :style="{'margin-right': mr==='last'?'0px':'10px'}">
    <el-button :type="type" @click="dialogFormVisible = true" :size="size">{{title}}</el-button>
    <el-dialog :append-to-body="true" :title="title" :visible.sync="dialogFormVisible" @close="closeForm"  width="600px" top="0">
      <el-form :inline="true" :model="form" ref="form" size="small" class="formTopZidian" label-width="82px">
        <el-form-item label="字段" prop="field">
          <el-input class="width250" :disabled="true" v-model="form.field"></el-input>
        </el-form-item>
        <el-form-item label="字段名" prop="fieldName">
          <el-input class="width250" :disabled="true" v-model="form.fieldName"></el-input>
        </el-form-item>
        <el-form-item label="枚举值编号" prop="number">
          <el-input class="width250" v-model="form.fieldName"></el-input>
        </el-form-item>
        <el-form-item label="枚举值" prop="value">
          <el-input class="width250" v-model="form.fieldName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeForm">取 消</el-button>
        <el-button size="small" type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'CdiaLog',
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
  data () {
    return {
      dialogFormVisible: false,
      form: {
        field: '',
        fieldName: ''
      }
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
.cdiaLog
  display inline-block
.formTopZidian
  display flex
  justify-content space-between
  flex-wrap: wrap
  &>div
    margin-right 0px!important
  .width250
    width 188px!important
</style>
