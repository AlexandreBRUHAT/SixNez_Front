import Vue from 'vue'
import App from './App.vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

import VueRouter from 'vue-router'

import Routes from './routes'

import EventBus from './EventBus'

Vue.config.productionTip = false

Vue.use(VueMaterial);
Vue.use(VueRouter);
Vue.prototype.$bus = EventBus;

new Vue({
  render: h => h(App),
  router: Routes
}).$mount('#app')
