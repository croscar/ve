import Vue from 'vue'
import axios from 'axios'

import iView from 'iview'
import VCharts from 'v-charts'
import 'iview/dist/styles/iview.css'

import App from './App'
import router from './router'
import store from './store'

Vue.use(iView)
Vue.use(VCharts)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
