<template>
  <div class="login">
    <div class="bgc">
      <div class="bgcF"></div>
    </div>
    <div class="from">
      <div class="container">
        <h1>欢 迎 登 录</h1>
        <el-form :model="loginForm" ref="loginForm" class="demo-ruleForm" size='small'>
          <el-form-item
            prop="account"
            :rules="[
              { required: true, message: '账号不能为空'},
            ]"
          >
            <el-input :clearable="true" v-model.trim="loginForm.account" autocomplete="off" placeholder="请输入用户账号"></el-input>
          </el-form-item>
          <el-form-item
            prop="password"
            :rules="[
              { required: true, message: '密码不能为空'},
            ]"
          >
            <el-input :clearable="true" type="password" v-model.trim="loginForm.password" autocomplete="off" placeholder="请输入用户密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Cookies.set('userInfo', 'htf', { expires: 1 })
          this.$router.push({
            name: 'home' // 解锁之后跳转到锁屏之前的页面
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang='stylus' ref='stylesheet/stylu' >
.login
    width 100%
    height 100%
    display flex
  .bgc
    width 60%
    height 100%
    background url('../../../static/img/login.png') no-repeat center
    background-size 100% 100%
    display flex
    justify-content center
    .bgcF
      width 30%
      height 100%
      background url('../../../static/img/loginFont.png') no-repeat 100% 40%
      background-size 100% auto
  .from
    width 40%
    display flex
    align-items center
    justify-content center
    .container
      width 100%
      padding 0 20%
      h1
        font-size 20px
        font-family PingFang-SC-Medium
        font-weight 500
        color rgba(130,137,121,1)
        text-align center
        margin-bottom 20px
      .loginForm
        input
          width 100%
    .el-button--small, .el-button--small.is-round
      width 100%!important
      border-radius 16px
      background-color rgba(130,137,121,1)
      border none
      margin-top 20px
    .el-input--small .el-input__inner
      border-radius 0px
      border-top none!important
      border-left none!important
      border-right none!important
</style>
