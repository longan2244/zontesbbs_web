import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'mdui/dist/css/mdui.min.css'
import 'mdui/dist/js/mdui.js'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  Vant,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
