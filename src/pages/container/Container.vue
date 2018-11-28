<template>
  <div class="container">
    <side-bar/>
    <right-comtent/>
  </div>
</template>
<script>
import SideBar from '../../components/SideBar'
import RightComtent from '../../components/RightComtent'
export default {
  name: 'Container',
  data () {
    return {
    }
  },
  components: {
    SideBar,
    RightComtent
  }
}
</script>
<style lang='stylus' ref='stylesheet/stylus' scoped>
.container
  width 100%
  height 100%
  display flex
</style>
