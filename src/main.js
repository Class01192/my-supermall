import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './store/index'
Vue.prototype.$bus = new Vue() //在Vue原型中添加$bus实例



Vue.config.productionTip = false


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})