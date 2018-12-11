<template>
  <transition name="show-unlock">
    <div class="unlock-body-con" v-if="showUnlock" @keydown.enter="handleUnlock">
        <div @click="handleClickAvator" class="unlock-avator-con" :style="{marginLeft: avatorLeft}">
            <img class="unlock-avator-img" :src="avatarPath">
            <div class="unlock-avator-cover">
                <span><i class="iconfont htf-bofangqi-suoping" style="font-size:30px"></i></span>
                <p>解锁</p>
            </div>
        </div>
        <div class="unlock-avator-under-back" :style="{marginLeft: avatorLeft}"></div>
        <div class="unlock-input-con">
            <div class="unlock-input-overflow-con">
                <div class="unlock-overflow-body" :style="{right: inputLeft}">
                    <input ref="inputEle" v-model.trim="password" class="unlock-input" type="password" placeholder="密码同登录密码" />
                    <button ref="unlockBtn" @mousedown="unlockMousedown" @mouseup="unlockMouseup" @click="handleUnlock" class="unlock-btn">
                      <i class="iconfont htf-quanxianyuechi-xianxing" style="color:#fff;font-size:28px"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="unlock-locking-tip-con">已锁定</div>
    </div>
  </transition>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  name: 'Unlock',
  data () {
    return {
      avatorLeft: '0px',
      inputLeft: '400px',
      password: '',
      check: null
    }
  },
  props: {
    showUnlock: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    avatarPath () {
      return 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543136214224&di=8461231c4bd4f6af0e4c75d353fe619d&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171207%2F60918cbd27fe4642b2b68668f450abed.jpeg'
    }
  },
  methods: {
    unlock () {
      this.avatorLeft = '0px'
      this.inputLeft = '400px'
      this.password = ''
      Cookies.set('locking', '0')
      this.$emit('on-unlock')
    },
    handleClickAvator () {
      this.avatorLeft = '-180px'
      this.inputLeft = '0px'
      this.$refs.inputEle.focus()
    },
    handleUnlock () {
      if (this.password === '') {
        this.$message({
          message: '请输入密码',
          type: 'error'
        })
        return
      }
      // 将用户输入的密码this.password与数据库用户密码对比
      if (this.password === '123') {
        this.unlock()
      } else {
        this.$message({
          message: '密码不正确',
          type: 'error'
        })
      }
    },
    unlockMousedown () {
      this.$refs.unlockBtn.className = 'unlock-btn click-unlock-btn'
    },
    unlockMouseup () {
      this.$refs.unlockBtn.className = 'unlock-btn'
    }
  }
}
</script>
<style lang='stylus' ref='stylesheet/stylus' scoped>
.unlock-body-con
  position: absolute;
  width: 400px;
  height: 100px;
  left: 50%;
  top: 50%;
  margin-left: -200px;
  margin-top: -200px;
  transform-origin: center center;
  z-index: 10;
  .unlock-avator-con
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid white;
    cursor: pointer;
    transition: all .5s;
    z-index: 12;
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, .3);
    .unlock-avator-img
      width: 100%;
      height: 100%;
      display: block;
      z-index: 7;
    .unlock-avator-cover
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .6);
      z-index: 11600;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity .2s;
      color: white;
      span
        display: block;
        margin: 20px auto 5px;
        text-align: center;
      p
        text-align: center;
        font-size: 16px;
        font-weight: 500;
    &:hover .unlock-avator-cover
      opacity: 1;
      transition: opacity .2s;
  .unlock-avator-under-back
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-45px,-50%);
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #667aa6;
    transition: all .5s;
    z-index: 5;
  .unlock-input-con
    position: absolute;
    height: 70px;
    width: 350px;
    top: 15px;
    right: 0px;
    .unlock-input-overflow-con
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      overflow: hidden;
      .unlock-overflow-body
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        transition: all .5s ease .5s;
        .unlock-input
          float: left;
          display: block;
          box-sizing: content-box;
          height: 22px;
          width: 230px;
          font-size: 18px;
          outline: none;
          padding: 11px 10px 11px 30px;
          border: 2px solid #e2ddde;
          margin-top: 10px;
        .unlock-btn
          float: left;
          display: block;
          padding: 6px 22px;
          cursor: pointer;
          border-radius: 0 25px 25px 0;
          border: 2px solid #e2ddde;
          border-left: none;
          background: #409EFF;
          outline: none;
          transition: all .2s;
          margin-top: 10px;
          &:hover
            background: #5cadff;
            box-shadow: 0 0 10px 3px rgba(255, 255, 255, .2);
        .click-unlock-btn
          background: #2b85e4 !important;
  .unlock-locking-tip-con
    width: 100px;
    height: 30px;
    text-align: center;
    position: absolute;
    left: 50%;
    margin-left: -50px;
    bottom: -80px;
    color: white;
    font-size: 18px;
@keyframes unlock-in
  0% {
      transform: scale(0);
  }
  80%{
      transform: scale(0);
  }
  88% {
      transform: scale(1.3);
  }
  100% {
      transform: scale(1);
  }
@keyframes unlock-out
  0% {
      transform: scale(1);
  }
  60%{
      transform: scale(1.2);
  }
  100% {
      transform: scale(0);
  }
.show-unlock-enter-active
  animation: unlock-in 1.4s ease;
.show-unlock-leave-to
  opacity: 0;
.show-unlock-leave-active
  transition: opacity .2s;
.unlock-con
  width: 100%;
  height: 100%;

</style>
