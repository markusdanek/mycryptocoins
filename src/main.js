import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import lodash from 'lodash';
import VueResource from 'vue-resource';
import WebFont from 'webfontloader';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VModal from 'vue-js-modal'
import Buefy from 'buefy';
import Autocomplete from 'v-autocomplete';
import 'buefy/lib/buefy.css';
import 'v-autocomplete/dist/v-autocomplete.css';

Vue.use(Autocomplete);
Vue.use(Buefy, {
  defaultIconPack: 'fas'
});
Vue.use(VueAxios, axios);
Vue.use(VModal);

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