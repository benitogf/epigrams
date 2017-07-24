import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as actions from './actions'
import * as getters from './getters'
import user from './modules/user'
import tag from './modules/tag'

Vue.use(Vuex)

/* eslint-disable no-new */
export default new Vuex.Store({
  plugins: [createPersistedState()],
  actions,
  getters,
  modules: {
    user,
    tag
  }
})
