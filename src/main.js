import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2);
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
