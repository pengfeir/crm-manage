import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import router from './router'
import { MyPlugin } from './plugins/common'
import everPagination from './plugins/pagination'
import 'element-ui/lib/theme-chalk/index.css'
import * as custom from './plugins/filters'

Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})
require('./plugins/funcform')
Vue.use(MyPlugin)
Vue.use(Element)
Vue.component('everPagination', everPagination)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
