import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import axios from 'axios'
// import AxiosVue from 'axios-vue'
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueAxios, axios);
Vue.use(ElementUI)

Vue.config.productionTip = false

axios.interceptors.request.use(config => {
  config.headers.Token = window.sessionStorage.getItem("token");
  return config;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
