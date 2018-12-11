<template>
  <div class="cdiaLog" :style="{'margin-right': mr==='last'?'0px':'10px'}">
    <el-button :style="{'width':btnWidth?'100%':'','height':btnWidth?'100%':''}" :type="type" @click="init" :size="size">{{title}}</el-button>
    <el-dialog :close-on-click-modal='false' :close-on-press-escape='false' :append-to-body="true" :title="title" :visible.sync="dialogFormVisible" @close="closeForm"  width="600px" top="0">
      <el-form :inline="true" :model="form" ref="form" size="small" class="formTopZidian" :rules = "rules" label-width="93px">
        <el-form-item label="字段" prop="field">
          <el-input class="width250" :disabled="true" v-model.trim="form.field"></el-input>
        </el-form-item>
        <el-form-item label="字段名" prop="fieldName">
          <el-input class="width250" :disabled="true" v-model.trim="form.fieldName"></el-input>
        </el-form-item>
        <el-form-item label="枚举值编号" prop="number">
          <el-input class="width250" :disabled="detailBtn" v-model.trim="form.number" clearable placeholder="请输入枚举值编号"></el-input>
        </el-form-item>
        <el-form-item label="枚举值" prop="value">
          <el-input class="width250" :disabled="detailBtn" clearable v-model.trim="form.value" placeholder="请输入枚举值"></el-input>
        </el-form-item>
        <el-form-item
          v-if="typeFlag === 1"
          v-for="(item, index) in form.list"
          :label="`图片${index+1}`"
          :key="item.key"
          :prop="'list.' + index + '.value'"
          :rules="{
            required: true, message: '请输入图片主题', trigger: 'blur'
          }">
          <el-input :disabled="detailBtn" class="width300" v-model.trim="item.value" clearable placeholder="请输入图片主题"></el-input>
          <el-form-item
            ref="imgUpload"
            class="pickerUpLoad"
            :prop="'list.' + index + '.imageUrl'"
            :rules="{
              required: true, message: '请上传图片', trigger: 'change'
            }"
          >
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :disabled="detailBtn"
              :before-upload="beforeAvatarUpload">
              <el-popover
                placement="right"
                width="400"
                v-if="item.imageUrl"
                trigger="hover">
                  <img :src="item.imageUrl" width="100%">
                  <img slot="reference" :src="item.imageUrl" class="avatar1">
              </el-popover>
              <el-button :disabled="detailBtn" v-else class="iconUp" circle icon="el-icon-upload" @click="imgClick(index)"></el-button>
            </el-upload>
            <el-button :disabled="detailBtn" v-if="item == form.list[form.list.length-1]" class="iconAdd" type="primary" circle @click="addPicker"  icon="el-icon-plus"></el-button>
            <el-button :disabled="detailBtn" v-if="index!=0" class="iconDel"  type="danger" circle @click="delPicker(item)" icon="el-icon-minus"></el-button>
          </el-form-item>
        </el-form-item>
        <el-form-item v-if="typeFlag === 3" label="上传图片" prop="imgUpLoad" ref="upload" class="imageUrl1">
          <el-upload
            :disabled="detailBtn"
            class="avatar-uploader1"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatar1Success"
            :before-upload="beforeAvatar1Upload">
            <img v-if="form.imgUpLoad" :src="form.imgUpLoad" class="avatar1">
            <span class="avatar-uploader-icon1">请点击上传图片</span>
            <div slot="tip" class="el-upload__tip1">请上传png、jpg及jpeg格式图片(大小2M以下)</div>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="typeFlag === 3" label="图片标题" prop="pTitle">
          <el-input :disabled="detailBtn" style="width:450px" clearable v-model.trim="form.pTitle" placeholder="请输入图片标题"></el-input>
        </el-form-item>
        <el-form-item v-if="typeFlag === 3" label="图片说明" prop="pExplain">
          <el-input :disabled="detailBtn" style="width:450px" clearable v-model.trim="form.pExplain" placeholder="请输入图片说明"></el-input>
        </el-form-item>
        <el-form-item v-if="typeFlag === 2" label="品牌故事" prop="brandStore" ref="brandStore">
          <quillEditor editorWidth="450px" @brandStore="brandStore" :disabled="detailBtn"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeForm">取 消</el-button>
        <el-button size="small" type="primary" @click="detailBtn?closeForm():submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import quillEditor from '../../components/QuillEditor'
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
    mr: {
      type: String
    },
    btnWidth: {
      type: Boolean,
      default: false
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
    quillEditor
  },
  data () {
    // 枚举值编号唯一校验,这个需要后台校验接口
    var validatePass = (rule, value, callback) => {
      if (value === '00' || value === '01') {
        callback(new Error('枚举值编号不能重复'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      imgClickIndex: 0,
      form: {
        field: '',
        fieldName: '',
        number: '',
        value: '',
        imgUpLoad: '',
        pTitle: '',
        pExplain: '',
        brandStore: '',
        list: [{
          value: '',
          imageUrl: ''
        }]
      },
      rules: {
        number: [
          { required: true, message: '请输入枚举值编号', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        value: [{ required: true, message: '请输入枚举值', trigger: 'blur' }],
        imgUpLoad: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ],
        pTitle: [{ required: true, message: '请输入图片标题', trigger: 'blur' }],
        pExplain: [{ required: true, message: '请输入图片说明', trigger: 'blur' }],
        brandStore: [{ required: true, message: '请输入品牌故事', trigger: 'change' }]
      }
    }
  },
  methods: {
    init () {
      this.dialogFormVisible = true
      this.form = {
        field: '',
        fieldName: '',
        number: '',
        value: '',
        imgUpLoad: '',
        pTitle: '',
        pExplain: '',
        brandStore: '',
        list: [{
          value: '',
          imageUrl: ''
        }]
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          // 传父组件成功回调
          this.$emit('dialogSuccess', {number: this.form.number, value: this.form.value})
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
    // 新增图片
    addPicker () {
      this.form.list.push({
        value: '',
        imageUrl: '',
        key: Date.now()
      })
    },
    // 删除图片
    delPicker (item) {
      var index = this.form.list.indexOf(item)
      if (index !== -1) {
        this.form.list.splice(index, 1)
      }
    },
    imgClick (index) {
      this.imgClickIndex = index
    },
    // 上传图片
    handleAvatarSuccess (res, file, fileList) {
      this.form.list[this.imgClickIndex].imageUrl = URL.createObjectURL(file.raw)
      this.$refs.imgUpload[this.imgClickIndex].clearValidate()
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 图片上传
    handleAvatar1Success (res, file) {
      this.form.imgUpLoad = URL.createObjectURL(file.raw)
      this.$refs.upload.clearValidate()
    },
    beforeAvatar1Upload (file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 jpg/jpeg/png 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    brandStore (arg) {
      console.log(arg)
      this.form.brandStore = arg.trim()
      this.$refs.brandStore.clearValidate()
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
  .el-form-item
    margin-right 0px!important
  .width250
    width 176px!important
  .width300
    width 291px
  .iconUp
    margin-left 10px
  .avatar-uploader
    display inline-block
    margin-right 10px
    .avatar1
      width 32px
      height 32px
      border-radius 50%
      vertical-align middle
      margin-left 10px
  .pickerUpLoad
    margin-bottom: 0px;
    min-width:124px;
    &>.el-form-item__content
      width 100%
  .imageUrl1
    .el-form-item__content
      line-height 0
    .el-upload__tip1
      line-height 12px!important
      margin-top 16px
      color #8c939d
    .avatar-uploader1
      display inline-block
      width 450px
      .el-upload
        width 100%
        height 120px
        border 1px dashed #d9d9d9
        border-radius 4px
        cursor pointer
        position relative
        overflow hidden
        transition all 0.5s
        &:hover
          border-color #409EFF
    .avatar-uploader-icon1
      width 100%
      height 100%
      font-size 14px
      color #8c939d
      display flex
      align-items center
      justify-content center
    .avatar1
      width 100%
      height 100%
      border-radius 4px
      display block
</style>
