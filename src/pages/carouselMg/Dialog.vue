<template>
  <div class="dialogCarous" :style="{'margin-right': mr==='last'?'0px':'10px'}">
    <el-button :type="type" @click="dialogFormVisible = true" :size="size">{{title}}</el-button>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="closeForm"  width="500px" top="0">
      <el-form :model="form" :rules="rules" ref="form" size="small" :label-width="formLabelWidth">
        <el-form-item label="类型" prop="type">
          <el-select :clearable="true" v-model="form.type" placeholder="请选择图片类型">
            <el-option label="商户App" value="1"></el-option>
            <el-option label="小程序" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片名称" prop="imgName">
          <el-input :clearable="true" v-model="form.imgName" placeholder="请输入图片名称"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select :clearable="true" v-model="form.state" placeholder="请选择图片状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="停用" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传图片" prop="imgUpLoad" ref="upload" class="imageUrl">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.imgUpLoad" :src="form.imgUpLoad" class="avatar">
            <span class="avatar-uploader-icon">请点击上传图片</span>
            <div slot="tip" class="el-upload__tip">请上传png、jpg及jpeg格式图片(大小2M以下)</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="图片路径" prop="imgUrl">
          <el-input :clearable="true" v-model="form.imgUrl" placeholder="请输入图片路径"></el-input>
        </el-form-item>
        <el-form-item label="跳转地址" prop="jump">
          <el-input :clearable="true" v-model="form.jump" placeholder="请输入图片跳转地址"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remarks">
          <el-input
            :clearable="true"
            v-model="form.remarks"
            resize="none"
            type="textarea"
            :rows="3"
            placeholder="请输入图片描述"></el-input>
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
    mr: {
      type: String
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      form: {
        type: '',
        imgName: '',
        state: '',
        imgUpLoad: '',
        imgUrl: '',
        jump: '',
        remarks: ''
      },
      formLabelWidth: '80px',
      rules: {
        type: [
          { required: true, message: '请选择图片类型', trigger: 'blur' }
        ],
        imgName: [
          { required: true, message: '请输入图片名称', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择图片状态', trigger: 'blur' }
        ],
        imgUpLoad: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ],
        imgUrl: [
          { required: true, message: '请输入图片路径', trigger: 'blur' }
        ],
        jump: [
          { required: true, message: '请输入图片跳转地址', trigger: 'blur' }
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
.dialogCarous
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
    width 100%
    .el-upload
      width 100%
      height 100px
      border 1px dashed #d9d9d9
      border-radius 4px
      cursor pointer
      position relative
      overflow hidden
      &:hover
        border-color #409EFF
  .avatar-uploader-icon
    width 100%
    height 100%
    font-size 14px
    color #8c939d
    display flex
    align-items center
    justify-content center
  .avatar
    width 100%
    height 100%
    border-radius 4px
    display block
</style>
