<template>
  <div class="dialogLevel" style="margin-right:10px">
    <el-button type="primary" @click="dialogFormVisible = true" :size="size">{{title}}</el-button>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="closeForm"  width="500px" top="0">
      <el-form :model="form" :rules="rules" ref="form" size="small" :label-width="formLabelWidth">
        <el-form-item label="会员等级" prop="level">
          <el-input :clearable="true" v-model="form.level" placeholder="请输入会员等级"></el-input>
        </el-form-item>
        <el-form-item label="规则类型" prop="mRule">
          <el-select 
            :clearable="true" 
            v-model="form.mRule"
            @change="select"
            placeholder="请选择规则类型">
            <el-option label="购买" value="1"></el-option>
            <el-option label="成长" value="2"></el-option>
            <el-option label="无" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="buyFlag" label="购买金额" prop="money">
          <el-input :clearable="true" v-model="form.money" placeholder="请输入购买金额" style="width:199px"></el-input> 元
        </el-form-item>
        <el-form-item v-if="growUp" label="成长值范围" prop="start">
          <el-input :clearable="true" v-model="form.start" style="width:134px"></el-input>
          <span>=< 成长值<=</span>
        </el-form-item>
        <el-form-item v-if="growUp" label="" prop="end" style="position:absolute;right:20px;bottom:92px">
          <el-input :clearable="true" v-model="form.end" style="width:134px;"></el-input>
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
  name: 'Dialog',
  props: {
    title: {
      type: String
    },
    size: {
      type: String,
      default: "small"
    }
  },
  data () {
    return {
      buyFlag: false,
      growUp: false,
      dialogFormVisible: false,
      form: {
        level: '',
        mRule: '',
        money: '',
        start: '',
        end: '',
      },
      formLabelWidth: '96px',
      rules: {
        level: [
          { required: true, message: '请输入会员等级', trigger: 'blur' }
        ],
        mRule: [
          { required: true, message: '请选择规则类型', trigger: 'change' }
        ],
        money: [
          { required: true, message: '请输入购买金额', trigger: 'blur' }
        ],
        start: [
          { required: true, message: '请输入成长值', trigger: 'blur' }
        ],
        end: [
          { required: true, message: '请输入成长值', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 下拉框
    select (val) {
      if(val == 1) {
        // 购买
        this.buyFlag = true
        this.growUp = false
        this.$refs.form.clearValidate()
      }else if(val == 2) {
        // 成长
        this.growUp = true
        this.buyFlag = false
        this.$refs.form.clearValidate()
      }else if(val == 3) {
        // 无
        this.buyFlag = false
        this.growUp = false
        this.$refs.form.clearValidate()
      }
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
    }
  }
}
</script>
<style lang='stylus' ref='stylesheet/stylus'>
.dialogLevel
  display inline-block
</style>
