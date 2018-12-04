import Vue from 'vue'
import VueRouter from 'vue-router'
import {routers} from './router'
import NProgress from 'nprogress'
import Cookies from 'js-cookie'
import 'nprogress/nprogress.css'
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })
Vue.use(VueRouter)
// 路由配置
const RouterConfig = {
  routes: routers
}
export const router = new VueRouter(RouterConfig)
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (Cookies.get('locking') === '1' && to.name !== 'locking') {
    // 判断当前是否是锁定状态
    next({
      replace: true,
      name: 'locking'
    })
  } else if (Cookies.get('locking') === '0' && to.name === 'locking') {
    next(false)
  } else {
    if (!Cookies.get('userInfo') && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
      next({
        name: 'login'
      })
    } else if (Cookies.get('userInfo') && to.name === 'login') {
      // 判断是否已经登录且前往的是登录页
      next({
        name: 'home'
      })
    } else {
      next()
    }
  }
})
router.afterEach(transition => {
  NProgress.done()
})
