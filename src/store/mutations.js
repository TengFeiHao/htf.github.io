import {
  SLIDE_CLICK,
  SET_ROUTE_META
} from './mutation-types'
export default {
  [SLIDE_CLICK] (state) {
    state.slideBarToggle = !state.slideBarToggle
  },
  [SET_ROUTE_META] (state, params) {
    state.routeMeta = params
  }
}
