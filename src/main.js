import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
// import axios from 'axios';

// axios.defaults.baseURL = '';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
