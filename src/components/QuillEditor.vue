<template>
<div id="quilEditor" :style="{'width':editorWidth}">
  <!-- 图片上传组件辅助-->
  <el-upload
    class="avatar-uploader"
    :action="serverUrl"
    name="img"
    :headers="header"
    :show-file-list="false"
    :on-success="uploadSuccess"
    :on-error="uploadError"
    :disabled="disabled"
    :before-upload="beforeUpload">
  </el-upload>
  <quill-editor
    v-model="content"
    ref="myQuillEditor"
    :options="editorOption"
    @change="onEditorChange($event)"
    :disabled="disabled"
  >
  </quill-editor>
</div>
</template>
<script>
const toolbarOptions = [
  {'size': ['small', false, 'large']},
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  { 'script': 'sub' }, { 'script': 'super' },
  {'color': []}, {'background': []}, 'image',
  {'list': 'ordered'}, {'list': 'bullet'},
  {'indent': '-1'}, {'indent': '+1'},
  {'align': []}
]
export default {
  props: {
    editorWidth: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      content: null,
      editorOption: {
        placeholder: '请输入品牌故事',
        theme: 'snow', // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              'image': function (value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector('.avatar-uploader input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      },
      serverUrl: '/manager/common/imgUpload', // 这里写你要上传的图片服务器地址
      header: {
        // token: sessionStorage.token
      } // 有的图片服务器要求请求头需要有token
    }
  },
  methods: {
    onEditorChange ({editor, html, text}) { // 内容改变事件
      this.content = html
      this.$emit('brandStore', html)
    },
    // 富文本图片上传前
    beforeUpload () {
      // 显示loading动画
      this.quillUpdateImg = true
    },

    uploadSuccess (res, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill
      // 如果上传成功
      if (res.code === 200) {
        // 获取光标所在位置
        let length = quill.getSelection().index
        // 插入图片  res.url为服务器返回的图片地址
        quill.insertEmbed(length, 'image', res.url)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$message.error('图片插入失败')
      }
      // loading动画消失
      this.quillUpdateImg = false
    },
    // 富文本图片上传失败
    uploadError () {
      // loading动画消失
      this.quillUpdateImg = false
      this.$message.error('图片插入失败')
    }
  }
}
</script>
<style lang='stylus' ref='stylesheet/stylus'>
#quilEditor
  .avatar-uploader
    position absolute
  .ql-formats
    margin-right 0px!important
    line-height: 24px!important
</style>
