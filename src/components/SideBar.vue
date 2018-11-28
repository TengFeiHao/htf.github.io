<template>
  <div class='parent-dom'>
    <router-link to="/" :class="[slideBarToggle?'_logo':'logo']">{{slideBarToggle?'G':'logo'}}</router-link>
    <vue-scroll :ops="ops">
      <div class='child-dom'>
        <el-menu
          :default-active="onRoutes"
          class="el-menu-vertical-demo"
          background-color="#2b333d"
          text-color="#bfcbd9"
          :active-text-color="$route.path === '/home'?'#bfcbd9':'#409eff'"
          router
          :collapse="slideBarToggle">
          <template v-for="item in slideData">
            <template v-if="item.subs">
              <el-submenu :index="item.index" :key="item.index">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span slot="title">{{ item.title }}</span>
                </template>
                <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                  {{ subItem.title }}
                </el-menu-item>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :index="item.index" :key="item.index">
                  <i :class="item.icon"></i>
                  <span slot="title">{{ item.title }}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </div>
    </vue-scroll>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'SideBar',
  data () {
    return {
      ops: {
        scrollPanel: {
          scrollingX: false
        },
        rail: {
          gutterOfEnds: '0px',
          gutterOfSide: '0px'
        },
        bar: {
          onlyShowBarOnScroll: false,
          background: '#fff',
          opacity: 0.3
        }
      }
    }
  },
  computed: {
    ...mapState(['slideBarToggle', 'slideData']),
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  methods: {

  }
}
</script>
<style lang='stylus' ref='stylesheet/stylus' scoped>
.parent-dom
  height 100%
  background-color: #2b333d
  padding-top 60px
  .logo
    position absolute
    top 0
    left 0
    width 220px
    height 60px
    background-color #409EFF
    display flex
    align-items center
    justify-content center
    box-shadow: 0 2px 1px 1px rgba(100, 100, 100, .1)
    font-weight bold
    color #fff
    font-size 24px
    z-index 2
    cursor pointer
  ._logo
    transition all 0.8s
    position absolute
    top 0
    left 0
    width 64px
    height 60px
    background-color #409EFF
    display flex
    align-items center
    justify-content center
    box-shadow: 0 2px 1px 1px rgba(100, 100, 100, .1)
    font-weight bold
    color #fff
    font-size 24px
    z-index 2
    cursor pointer
  .child-dom
    height 100%
    .el-menu-vertical-demo:not(.el-menu--collapse)
      width: 220px;
      height 100%
    .el-menu
      border none
</style>
