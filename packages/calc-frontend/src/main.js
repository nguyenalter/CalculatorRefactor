console.log("Dot env api_url: " + process.env.VUE_APP_SERVER_API);
import Vue from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import router from "./router";
import VTooltip from "v-tooltip";
import Vuex from "vuex";
import { store } from "./stores/store";

router.beforeEach((to, from, next) => {
  console.log(`To route: ${to.name}, from route: ${from.name}`);
  if (store.state.firstLoad) {
    store.dispatch("validateOnMounted");
  }
  next();
});

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VTooltip);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
