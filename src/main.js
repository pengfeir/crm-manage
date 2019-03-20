import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import { MyPlugin } from './util/common'
Vue.use(MyPlugin)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
