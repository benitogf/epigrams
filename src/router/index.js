import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import login from '@/components/login'
import home from '@/components/home'
import tag from '@/components/tag'
import nah from '@/components/404'

Vue.use(Router)

const authCheck = (to, from, next) => {
  if (store.getters.currentUser === null) {
    next('/login')
  } else {
    next()
  }
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      beforeEnter: authCheck
    },
    {
      path: '/tag/:id',
      name: 'tag',
      component: tag,
      props: true,
      beforeEnter: authCheck
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      beforeEnter: (to, from, next) => {
        if (store.getters.currentUser !== null) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '*',
      component: nah
    }
  ]
})
