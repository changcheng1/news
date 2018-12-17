import Vue from 'vue'
import routes from './router'
import axios from './assets/js/http'
import VueRouter from 'vue-router'
import '../src/assets/css/rem'
import WXconfig from './assets/js/wx.jsapi'
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.WXconfig = WXconfig
Vue.use(VueRouter)
var router = new VueRouter({
  routes
})
router.afterEach((to,from,next)=>{
  console.log('to',to)
  console.log('from',from)
  console.log('next',next)
})
// import Vconsole from 'vconsole'
// let vConsole = new Vconsole()
// export default vConsole
/* eslint-disable no-new */
new Vue({
  router,
}).$mount('#app')
