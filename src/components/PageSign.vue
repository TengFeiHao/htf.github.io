<template>
  <div class="pageSignContainer">
    <div class="pageSign" ref="scrollCon" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
      <!-- 标签选项 -->
      <div class="leftBtn">
        <el-dropdown @command="drowSign">
          <el-button split-button type="primary" size="mini" class="signDropdown">
            标签选项<i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='all' >关闭全部</el-dropdown-item>
            <el-dropdown-item command='other'>关闭其他</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="content" ref="scrollBody" :style="{left:tagBodyLeft + 'px',transition:'all 0.3s ease-in-out'}">
        <template v-for="(item, i) in tags">
          <router-link :to="item.path" :key="i">
            <span class="signItem" ref="signs" >
              <span :class="{'sign':true, 'active': $route.path === item.path}"></span>
              <span class="tags-title">{{item.title}}</span>
              <i v-if="item.path !== '/home'" class="el-icon-close close" @click.stop.prevent="closeSign(i)"></i>
            </span>
          </router-link>
        </template>
      </div>
    </div>
    <div class="slotContent parent-dom" :style="slideBarToggle?'left:64px;transition: all .3s ease-in':'left:220px;transition: all .3s ease-out'">
      <vue-scroll :ops="ops">
        <div class='child-dom'>
          <div class="ctx">
            <transition name="move" mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
        </div>
      </vue-scroll>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'PageSign',
  data () {
    return {
      tagBodyLeft: '',
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
          background: '#000',
          opacity: 0.3
        }
      },
      tags: []
    }
  },
  watch: {
    $route (newValue, oldValue) {
      this.setRouteMeta(this.$route.meta)
      this.setTags(newValue)
      this.$nextTick(() => {
        this.tags.forEach((item, index) => {
          if (newValue.path === item.path) {
            let distance = this.$refs.signs[index]
            this.moveToView(distance)
          }
        })
      })
    }
  },
  computed: {
    ...mapState(['slideBarToggle'])
  },
  created () {
    this.setRouteMeta(this.$route.meta)
    let tagsData = JSON.parse(sessionStorage.getItem('tags'))
    if (tagsData) {
      this.tags = tagsData
    } else {
      this.tags.push({path: '/home', title: '首页'})
      this.setTags(this.$route)
    }
  },
  mounted () {
    setTimeout(() => {
      this.tags.forEach((item, index) => {
        if (this.$route.path === item.path) {
          let distance = this.$refs.signs[index]
          this.moveToView(distance)
        }
      })
    }, 100)
  },
  methods: {
    ...mapActions(['setRouteMeta']),
    // 监听页签得滚动事件
    handlescroll (e) {
      var type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40
      }
      let left = 0
      if (delta > 0) {
        left = Math.min(0, this.tagBodyLeft + delta)
      } else {
        if (this.$refs.scrollCon.offsetWidth - 100 < this.$refs.scrollBody.offsetWidth) {
          if (this.tagBodyLeft < -(this.$refs.scrollBody.offsetWidth - this.$refs.scrollCon.offsetWidth + 100)) {
            left = this.tagBodyLeft
          } else {
            left = Math.max(this.tagBodyLeft + delta, this.$refs.scrollCon.offsetWidth - this.$refs.scrollBody.offsetWidth - 100)
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
      this.tagBodyLeft = left
    },
    // 设置页签得数组
    setTags (route) {
      const isExist = this.tags.some(item => {
        return item.path === route.path
      })
      !isExist && this.tags.push({
        title: route.meta.title,
        path: route.path
      })
      sessionStorage.setItem('tags', JSON.stringify(this.tags))
    },
    // 删除页签
    closeSign (i) {
      if (this.$route.path !== this.tags[i].path) {
        if (this.tagBodyLeft < 0) {
          let letfs = this.tagBodyLeft + this.$refs.signs[i].offsetWidth
          if (letfs >= 0) {
            this.tagBodyLeft = 0
          } else {
            this.tagBodyLeft = letfs
          }
        }
      }
      const delItem = this.tags.splice(i, 1)[0]
      sessionStorage.setItem('tags', JSON.stringify(this.tags))
      const item = this.tags[i] ? this.tags[i] : this.tags[i - 1]
      if (item) {
        delItem.path === this.$route.path && this.$router.push(item.path)
      } else {
        this.$router.push('/')
      }
    },
    // 下拉标签选项
    drowSign (flag) {
      if (flag === 'all') {
        this.tags.splice(1)
        this.$router.push('/')
      } else {
        this.tags = this.tags.filter((item, i) => {
          return i === 0 || this.$route.path === item.path
        })
      }
      sessionStorage.setItem('tags', JSON.stringify(this.tags))
    },
    moveToView (distance) {
      let gap = this.$refs.scrollCon.offsetWidth - 105 - distance.offsetWidth
      let sLeft = distance.offsetLeft
      if (sLeft > gap) {
        let left = sLeft - gap
        if (left >= 0) {
          this.tagBodyLeft = -left
        } else {
          this.tagBodyLeft = -left
        }
      } else {
        this.tagBodyLeft = 0
      }
    }
  }
}
</script>
<style lang='stylus' ref='stylesheet/stylus' scoped>
.pageSignContainer
  display flex
  flex-direction column
  .pageSign
    height 40px
    box-shadow: 0 2px 1px 1px rgba(100, 100, 100, .1)
    display flex
    align-items center
    background-color rgb(240,240,240)
    white-space nowrap
    position relative
    overflow hidden
    .leftBtn
      position absolute
      top -1px
      right 0
      z-index 10
      width 114px
      height 40px
      background-color #fff
      box-shadow: -3px 0 15px 3px rgba(0,0,0,.1)
      display flex
      align-items center
      justify-content center
      .signDropdown
        // width 80px
        // height 24px
        // text-align center
        // padding: 0px!important
        // font-size 14px
    .content
      padding-left 10px
      position absolute
      height 100%
      display flex
      align-items center
    .signItem
      height 32px
      line-height 32px
      display inline-block
      align-items center
      cursor pointer
      background-color #fff
      border: 1px solid #e8eaec
      color: #515a6e
      padding: 0 12px
      border-radius: 3px
      font-size: 14px
      opacity: 1
      overflow: hidden
      vertical-align: middle
      margin: 2px 4px 2px 0
      .tags-title
        color #515a6e
        &:hover
          transition all 0.5s ease-in-out
          opacity 0.8
      .sign
        background: #e8eaec
        border-radius: 50%
        display: inline-block
        height: 14px
        margin-right: 8px
        position: relative
        top: 1px
        width: 14px
        transition: all .3s ease-in;
        &:hover
          transition all 0.5s ease-in-out
          opacity 0.85
      .active
        background-color #409EFF
      .close
        color: #666
        cursor: pointer
        display: inline-block
        font-size: 14px
        opacity: .66
        margin-left: 12px
        &:hover
          transition all 0.5s ease-in-out
          opacity 1
  .slotContent
    flex 1
    position absolute
    top 100px
    right 0
    bottom 0
    .child-dom
      padding 1px
      .ctx
        padding 18px
        background-color #fff
        margin 10px
        border: 1px solid #e8eaec
        border-radius: 4px
        font-size: 14px
        position: relative
        transition: all .2s ease-in-out
        &:hover
          border-color: #eee
          box-shadow: 0 1px 6px rgba(0,0,0,.2)
</style>
