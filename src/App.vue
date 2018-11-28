<template>
  <div id="app">
    <transition name="move" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
    }
  }
}
</script>
<style lang='stylus' ref='stylesheet/stylus' scoped>
#app
  width 100%
  height 100%
</style>
