<template>
  <div class="headerBar">
    <i @click="slideBtn" :class="[slideBarToggle?'iconfont htf-spread':'iconfont htf-recovery','toggle']"></i>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="routeMeta.list">{{routeMeta.list && routeMeta.list}}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="routeMeta.title && routeMeta.path !== '/home'">{{routeMeta.title && routeMeta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="user">
    <div class="center">
      <el-tooltip effect="dark" :content="fullscreen?'退出全屏':'全屏'" placement="bottom">
        <i :class="[fullscreen?'iconfont htf-quxiaoquanping':'iconfont htf-quanping _toggle', 'toggle1']" @click="fullscreenFuc"></i>
      </el-tooltip>
      <lock-screen/>
      <el-tooltip effect="dark" content="无未读消息" placement="bottom">
        <el-badge is-dot class="item">
          <i class="iconfont htf-xiaoxi toggle1"></i>
        </el-badge>
      </el-tooltip>
    </div>
      <!-- 标签选项 -->
      <div class="leftBtn">
        <el-dropdown placement="bottom" @command="drowUser">
          <span class="el-dropdown-link">
            user<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="edit">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543136214224&di=8461231c4bd4f6af0e4c75d353fe619d&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171207%2F60918cbd27fe4642b2b68668f450abed.jpeg" alt="">
    </div>
    <!-- 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" @close="closeForm"  width="500px" top="0" :append-to-body='true'>
      <el-form :model="form" :rules="rules" ref="form" size="small" label-width="93px">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input type="password" :clearable="true" v-model="form.oldPassword" placeholder="请输入现在使用的密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" :clearable="true" v-model="form.newPassword" placeholder="请输入新密码，长度为6-20个字符"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input type="password" :clearable="true" v-model="form.confirmPassword" placeholder="请再次输入新密码"></el-input>
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
import Cookies from 'js-cookie'
import { mapState, mapActions } from 'vuex'
import LockScreen from '../pages/lockScreen/LockScreen'
export default {
  name: 'HeaderBar',
  data () {
    let checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请再次输入新密码'))
      } else if (value !== this.form.newPassword) {
        return callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      fullscreen: false,
      dialogFormVisible: false,
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['slideBarToggle', 'routeMeta'])
  },
  components: {
    LockScreen
  },
  methods: {
    ...mapActions(['slideBtn']),
    fullscreenFuc () {
      let element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    },
    drowUser (flag) {
      if (flag === 'edit') {
        // 修改密码
        this.dialogFormVisible = true
      } else if (flag === 'logout') {
        // 退出登录
        Cookies.remove('userInfo')
        Cookies.set('last_page_name', this.$route.name)
        this.$router.push({path: '/login'})
      }
    },
    // 关闭dialog
    closeForm () {
      this.$refs['form'].resetFields()
      this.dialogFormVisible = false
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
    }
  }
}
</script>
<style lang='stylus' ref='stylesheet/stylus' scoped>
.headerBar
  width 100%
  height 60px
  box-shadow: 0 2px 1px 1px rgba(100, 100, 100, .1)
  font-size 10px
  background: #fff
  position relative
  z-index 2
  display flex
  align-items center
  .toggle
    color #2b333d
    font-size 24px
    cursor pointer
    line-height 60px
    margin-left 12px
    margin-right 52px
    &:hover
      transition all 0.5s
      color #409EFF
  .user
    position absolute
    right 15px
    top 50%
    margin-top -16px
    display flex
    .center
      display flex
      align-items center
      margin-right 40px
      .toggle1
        font-size 24px
        color #2b333d
        font-weight bolder
        margin-left 20px
        cursor pointer
        position relative
        &:hover
          transition all 0.5s
          color #409EFF
        &:last-child
          margin-right 0
      ._toggle
        font-size 21px
        line-height 24px
    .leftBtn
      margin-right 15px
      display flex
      align-items center
      .el-dropdown
        color #409EFF
        font-size 14px
        cursor pointer
    img
      width 32px
      height 32px
      display inline-block
      border-radius 16px
</style>
