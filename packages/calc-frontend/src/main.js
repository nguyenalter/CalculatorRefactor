import Vue from 'vue';
import VTooltip from 'v-tooltip';
import Vuex from 'vuex';
import App from './App.vue';
import './assets/tailwind.css';
import router from './router';
import { store } from './stores/store';

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VTooltip);

router.beforeEach((to, from, next) => {
  console.log(`To route: ${to.name}, from route: ${from.name}`);
  store.dispatch('validateToken');
  next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
