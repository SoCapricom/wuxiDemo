// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import App from './App.vue'
import layout from './components/layout.vue'
import router from './router';
import axios from 'axios'
import babelpolyfill from 'babel-polyfill' //解决iview低版本不兼容问题
Vue.use(iView)
// Vue.use(babelpolyfill)
// 将Promise抛出为全局对象
axios.defaults.withCredentials = true; //让ajax携带cookie

window.Promise = Promise
// 将axios挂在到Vue原型上成为全局属性
Vue.prototype.$Ajax = axios
// Vue.prototype.$Ajax.defaults.baseURL = "http://192.168.2.194:8889/shiro"
// Vue.prototype.$Ajax.defaults.baseURL = "http://192.168.2.194:9666/api-shiro/shiro" //权限
Vue.prototype.$Ajax.defaults.baseURL  = 'http://123.232.102.30:8888/api-shiro/shiro';//权限
// Vue.prototype.$Ajax.defaults.baseURL = "http://123.232.102.29:8899/tjkjj" //演示

new Vue({
  el: '#app',
  router,
  components: {
    App,
    layout
  },

  template: "<App/>"
  
})

