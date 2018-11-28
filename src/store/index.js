import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
Vue.use(Vuex)
/* eslint-disable no-new */
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
