// #ifndef VUE3
import Vue from 'vue'
import App from './App'

import store from '@/store'
import {
  $http
} from '@escook/request-miniprogram'

uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://api-ugo-web.itheima.net'
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}
$http.afterRequest = function() {
  uni.hideLoading()
}

uni.$showFailedToast = function() {
  return uni.showToast({
    title: '数据请求失败！',
    duration: 1500,
    icon: 'none',
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store,
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
