// @flow
import './lib/rsw'
import Vue from 'vue'
import App from './app'
import VueQuill from '@/lib/quill'
import 'quill/dist/quill.snow.css'

Vue.use(VueQuill)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<app/>',
  components: { App }
})
