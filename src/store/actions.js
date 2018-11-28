import {
  SLIDE_CLICK,
  SET_ROUTE_META
} from './mutation-types'
export default {
  slideBtn ({commit}) {
    commit(SLIDE_CLICK)
  },
  setRouteMeta ({commit}, params) {
    commit(SET_ROUTE_META, params)
  }
}
