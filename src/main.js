import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import router from './router'
import echarts from 'echarts'
import { MyPlugin } from './plugins/common'
import everPagination from './plugins/pagination'
import everBreadCrumb from './plugins/everbreadcrumb'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
import assetsSelect from './components/assetsselect'
import fileshow from './components/fileshow'
import * as custom from './plugins/filters'
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})
require('./plugins/funcform')
Vue.use(MyPlugin)
Vue.use(Element)
Vue.use(echarts)
Vue.component('everPagination', everPagination)
Vue.component('everBreadCrumb', everBreadCrumb)
Vue.component('assetsSelect', assetsSelect)
Vue.component('fileshow', fileshow)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
