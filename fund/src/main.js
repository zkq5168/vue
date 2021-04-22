import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/normalize.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAxiosPlugin from 'vue-axios-plugin'
import '@/assets/icomoon/style.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.use(VueQuillEditor);
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
