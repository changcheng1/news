import {_loadComponents} from 'common/js/util'
const newList = function(resolve,reject){
  _loadComponents(resolve,reject,"newList/newList")
}
const newDetail = function(resolve,reject){
  _loadComponents(resolve,reject,"newDetail/newDetail")
}
const wxShare = function(resolve,reject){
  _loadComponents(resolve,reject,"wxShare/wxShare")
}
const NotFoundComponent = function(resolve,reject){
  _loadComponents(resolve,reject,"NotFoundComponent/NotFoundComponent")
}
export default[{
    path: '/newList',
    name: 'newList',
    component: newList,
    meta: {
      keepAlive: true // 不需要缓存
    }
  }, {
    path: '/newDetail',
    name: 'newDetail',
    component: newDetail,
    meta: {
      keepAlive: true // 不需要缓存
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
  }]
