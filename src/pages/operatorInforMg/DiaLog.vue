<template>
  <div class="dialogOper" :style="{'margin-right': mr==='last'?'0px':'10px'}">
    <el-button :type="type" @click="dialogFormVisible = true" :size="size">{{title}}</el-button>
    <el-dialog :close-on-click-modal='false' :close-on-press-escape='false' :title="title" :visible.sync="dialogFormVisible" @close="closeForm"  width="500px" top="0">
      <el-form :model="form" :rules="rules" ref="form" size="small" :label-width="formLabelWidth">
        <el-form-item label="操作员账号" prop="admin">
          <el-input :disabled="mold==='1' || mold==='2'" :clearable="true" v-model="form.admin" placeholder="请输入操作员账号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input :disabled="mold==='2'"  :clearable="true" v-model.trim="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input :disabled="mold==='2'" :clearable="true" v-model.trim="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="imageUrl" ref="upload" class="imageUrl">
          <el-upload
            :disabled="mold==='2'"
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">请上传png、jpg及jpeg格式图片(大小2M以下)</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="所属角色" prop="role">
          <el-select :disabled="mold==='2'" :clearable="true" v-model.trim="form.role" placeholder="请选择所属角色">
            <el-option label="角色一" value="shanghai"></el-option>
            <el-option label="角色二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="启用" prop="startUp">
          <el-switch  :disabled="mold =='2'" v-model.trim="form.startUp"></el-switch>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            :disabled="mold==='2'"
            :clearable="true"
            v-model.trim="form.remarks"
            resize="none"
            type="textarea"
            :rows="3"
            placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item v-if="mold!=='0' && mold!=='1'" label="创建时间" prop="startTime">
          <el-input :disabled="true" v-model.trim="form.startTime"></el-input>
        </el-form-item>
        <el-form-item v-if="mold!=='0' && mold!=='1'" label="最近登录时间" prop="endTime">
          <el-input :disabled="true" v-model.trim="form.endTime"></el-input>
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
  name: 'DialogOper',
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
        admin: '',
        name: '',
        phone: '',
        role: '',
        remarks: '',
        imageUrl: '',
        startUp: false,
        startTime: '',
        endTime: ''
      },
      formLabelWidth: '96px',
      rules: {
        admin: [
          { required: true, message: '请输入操作员账号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        imageUrl: [
          { required: true, message: '请选择头像', trigger: 'change' }
        ],
        role: [
          { required: true, message: '请选择所属角色', trigger: 'change' }
        ]
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
    // 头像上传
    handleAvatarSuccess (res, file) {
      this.form.imageUrl = URL.createObjectURL(file.raw)
      this.$refs.upload.clearValidate()
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 jpg/jpeg/png 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style lang='stylus' ref='stylesheet/stylus'>
.dialogOper
  display inline-block
  .imageUrl
    .el-form-item__content
      line-height 0px
    .el-upload__tip
      line-height 12px!important
      margin-top 16px
      color #8c939d
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
