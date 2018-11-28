<template>
  <div class="rightComtent">
    <header-bar/>
    <page-sign/>
  </div>
</template>
<script>
import HeaderBar from './HeaderBar'
import PageSign from './PageSign'
export default {
  name: 'RightComtent',
  data () {
    return {
    }
  },
  components: {
    HeaderBar,
    PageSign
  }
}
</script>
<style lang='stylus' ref='stylesheet/stylus' scoped>
.rightComtent
  flex 1
  background: #f0f0f0
  overflow hidden
</style>
