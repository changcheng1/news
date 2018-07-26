// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './assets/js/http'
import '../src/assets/css/rem'
import WXconfig from './assets/js/wx.jsapi'
Vue.config.productionTip = false
Vue.prototype.$http = axios
// import Vconsole from 'vconsole'
// let vConsole = new Vconsole()
// export default vConsole
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
