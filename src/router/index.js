import Vue from 'vue'
import Router from 'vue-router'
import {_loadComponent} from '@/common/js/util'
const newList = function(resolve, reject) {
    window.__tryCount = 0;
   _loadComponent(resolve, reject, "newList/newList");
}
const newDetail = function(resolve, reject) {
  window.__tryCount = 0;
  _loadComponent(resolve, reject, "newDetail/newDetail");
}
const wxShare = function(resolve, reject) {
  window.__tryCount = 0;
  _loadComponent(resolve, reject, "wxShare/wxShare");
}
const NotFoundComponent = function(resolve, reject) {
  window.__tryCount = 0;
  _loadComponent(resolve, reject, "NotFoundComponent/NotFoundComponent");
}
Vue.use(Router)
export default new Router({
  //mode: 'history',
  routes: [{
    path: '/newList',
    name: 'newList',
    component: newList,
    meta: {
      keepAlive: false // 不需要缓存
    }
  }, {
    path: '/newDetail',
    name: 'newDetail',
    component: newDetail,
    meta: {
      keepAlive: false // 不需要缓存
    }
  }, {
    path: '/wxShare',
    name: 'wxShare',
    component: wxShare,
    meta: {
      keepAlive: true // 不需要缓存
    }
  }, {
    path: '*',
    component: NotFoundComponent
  }, ]
})
