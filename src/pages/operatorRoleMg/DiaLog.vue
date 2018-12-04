<template>
  <div class="dialog" :style="{'margin-right': mr==='last'?'0px':'10px'}">
    <el-button :type="type" @click="dialogFormVisible = true" :size="size">{{title}}</el-button>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="closeForm"  width="500px" top="0">
      <el-form :model="form" :rules="rules" ref="form" size="small" :label-width="formLabelWidth">
        <el-form-item label="角色名称" prop="name">
          <el-input :disabled="mold==='2'"  :clearable="true" v-model="form.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="权限配置" prop="quanxian" ref="upload">
          <el-tree
            :data="form.quanxian"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[1]"
            :default-checked-keys="[]">
          </el-tree>
        </el-form-item>
        <el-form-item v-if="mold!=='0'" label="启用" prop="startUp">
          <el-switch  :disabled="mold!=='1'" v-model="form.startUp"></el-switch>
        </el-form-item>
        <el-form-item v-if="mold!=='0' && mold!=='1'" label="更新时间" prop="endTime">
          <el-input :disabled="true" v-model="form.endTime"></el-input>
        </el-form-item>
        <el-form-item v-if="mold!=='0' && mold!=='1'" label="操作员" prop="user">
          <el-input :disabled="true" v-model="form.user"></el-input>
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
        name: '',
        endTime: '',
        quanxian: [{
          id: 1,
          label: '权限管理',
          children: [{
            id: 3,
            label: '操作员基本管理'
          }, {
            id: 2,
            label: '操作员角色管理',
            disabled: false
          }]
        }],
        user: ''
      },
      formLabelWidth: '80px',
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
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
.dialog
  display inline-block
  .el-dialog
    text-align left
    position absolute
    top 50%
    left 50%
    margin 0 !important
    transform translate(-50%, -50%)
    max-height calc(100% - 30px)
    max-width calc(100% - 30px)
    display flex
    flex-direction column
    &>.el-dialog__body
      overflow auto
  .avatar-uploader
    display inline-block
    .el-upload
      border 1px dashed #d9d9d9
      border-radius 50%
      cursor pointer
      position relative
      overflow hidden
      &:hover
        border-color #409EFF
  .avatar-uploader-icon
    font-size 14px
    color #8c939d
    width 60px
    height 60px
    line-height 60px
    text-align center
  .avatar
    width 60px
    height 60px
    display block
</style>
