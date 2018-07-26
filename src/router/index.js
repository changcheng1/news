import Vue from 'vue'
import Router from 'vue-router'
import newList from '@/components/newList/newList'
import newDetail from '@/components/newDetail/newDetail'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'newList',
    component: newList
  }, {
    path: '/newDetail/:id',
    name: 'newDetail',
    component: newDetail
  }]
})
