import Vue from 'vue'
import axios from 'axios'
import iView from 'iview'

import VCharts from 'v-charts'
import 'iview/dist/styles/iview.css'

import App from './App'

import store from './store'

import VueI18n from 'vue-i18n'
import '@/locale';
//import router from './router'

import {router} from './router/index'
import {appRouter} from './router/router'

// //import App from './app.vue'
// import '@/locale'

Vue.use(VueI18n)
Vue.use(iView)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

var i18n = new VueI18n({
  locale: 'zh',
  messages: {test: 'test'}
})

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
  i18n: i18n,
  data: {
    currentPageName: ''
  },
  mounted () {
    this.currentPageName = this.$route.name
    // 显示打开的页面的列表
    this.$store.commit('setOpenedList')
    this.$store.commit('initCachepage')
    // 权限菜单过滤相关
    this.$store.commit('updateMenulist')
    // iview-admin检查更新
    // util.checkUpdate(this);
  },
  created () {
    let tagsList = []
    appRouter.map((item) => {
      if (item.children.length <= 1) {
        tagsList.push(item.children[0])
      } else {
        tagsList.push(...item.children)
      }
    })
    this.$store.commit('setTagsList', tagsList)
  }
})
