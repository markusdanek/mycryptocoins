import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import lodash from 'lodash';
import VueResource from 'vue-resource';
import WebFont from 'webfontloader';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';

Vue.use(Buefy);
Vue.use(VueAxios, axios);

WebFont.load({
  google: {
    families: ['Poppins']
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
