// @flow
import Vue from 'vue'
import VueResource from 'vue-resource'
import * as types from '../mutation-types'
import { C137 } from '@/lib/C137/C137'
const wh = new C137()

Vue.use(VueResource)

// initial state
const state = {
  pages: {}
}

// getters
const getters = {}

// actions
const actions = {
  async setPage ({ commit }, { tag, page }) {
    await wh.set('page:' + tag, page)
    commit(types.SET_PAGES, { tag, page })
  },
  async getPage ({ commit }, tag) {
    let page = await wh.get('page:' + tag)
    commit(types.SET_PAGES, { tag, page })
    return page
  }
}

// mutations
const mutations = {
  [types.SET_PAGES] (state, { tag, page }) {
    state.pages[tag] = page
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
