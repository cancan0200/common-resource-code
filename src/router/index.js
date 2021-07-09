import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
   
    {
      path: '/circle',
      name: 'circle',
      component: resolve => void(require(['../pages/circleDemo.vue'], resolve))
    },
    {
      path: '/promise',
      name: 'promise',
      component: resolve => void(require(['../pages/promiseDemo.vue'], resolve))
    }
  ]
})
