import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

// import dotenv from "dotenv";
// dotenv.config();

//const API_URL = process.env.SERVER_API_PORT;
const API_URL = "http://localhost:3000/calc";
console.log(API_URL);
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    result: "",
  },
  mutations: {
    loadNewResult(state, payload) {
      state.result = payload.result;
    },
  },
  actions: {
    async fetchResult({ commit }, data) {
      console.log("fetching");
      console.log(data);
      // This action will call mutation.
      // Can do async here!
      //setTimeout(() => commit("calculate", data), 1000);
      try {
        const res = await axios.post(API_URL, data);
        let responseBody = res.data;
        if (responseBody.success) {
          commit("loadNewResult", {
            // mutating the result
            result: responseBody.data.result,
          });
          return responseBody.data.result;
        } else console.log("Can not fetch the result");
      } catch (error) {
        console.log(error);
      }
    },
  },
});
