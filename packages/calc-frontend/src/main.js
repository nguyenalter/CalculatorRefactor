import Vue from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import router from "./router";
import Vuex from "vuex";
import { store } from "./stores/store";

Vue.config.productionTip = false;
Vue.use(Vuex);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
