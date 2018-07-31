import Vue from 'vue'
import Router from 'vue-router'
import newList from '@/components/newList/newList'
import newDetail from '@/components/newDetail/newDetail'
import wxShare from '@/components/wxShare/wxShare'
import NotFoundComponent from '@/base/NotFoundComponent/NotFoundComponent'
Vue.use(Router)
export default new Router({
  //mode: 'history',
  routes: [{
    path: '/:date/:name/:index/',
    name: 'newList',
    component: newList
  }, {
    path: '/newDetail/:id',
    name: 'newDetail',
    component: newDetail
  }, {
    path: '/wxShare',
    name: 'wxShare',
    component: wxShare
  }, {
    path: '*',
    component: NotFoundComponent
  }, ]
})
