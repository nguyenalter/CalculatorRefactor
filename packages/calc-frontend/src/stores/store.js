import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = process.env.VUE_APP_SERVER_API;

function appendToHistory(payload) {
  // TODO - append to local storage.
  // get current history
  let oldHistory = JSON.parse(localStorage.getItem("history")) || [];
  // append new record
  oldHistory.push(payload);
  // update local storage
  localStorage.setItem("history", JSON.stringify(oldHistory));
}
function getCurrentHistory() {
  // TODO - append to local storage.
  // get current history
  return JSON.parse(localStorage.getItem("history")) || [];
}

async function updateNewHistoryToDatabase(data) {
  const res = await axios.put(
    "/user/auth",
    { data },
    {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    }
  );
  if (res.data.data.success) {
    console.log("append to db successfully");
    return true;
  }
  console.log("append to db failed");
  return false;
}

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    result: "",
    // default 0 - sign up page, 1 - sign in, 2 - dashboard
    navigateTo: 0,
  },
  mutations: {
    loadNewResult(state, payload) {
      state.result = payload.result;
    },
    userSignedIn(state, payload) {
      // 2 - dashboard
      console.log("payload data:");
      console.log(payload);
      localStorage.removeItem("history");
      localStorage.setItem("history", JSON.stringify(payload.historyData));
      state.navigateTo = 2;
    },
    userSignOut(state) {
      state.navigateTo = 0;
    },
  },
  actions: {
    async fetchResult({ commit }, data) {
      console.log("fetching");
      //console.log(data);
      const res = await axios.post("/calc", data);
      let responseBody = res.data;
      if (responseBody.success) {
        commit("loadNewResult", {
          result: responseBody.data.result,
        });
        let newData = {
          timestamp: +new Date(),
          firstVal: data.firstVal,
          option: data.option,
          secondVal: data.secondVal,
          result: responseBody.data.result,
        };
        appendToHistory(newData);
        // update new data to db if user signed in
        await updateNewHistoryToDatabase(newData);
        return responseBody.data.result;
      } else console.log("Can not fetch the result");
    },
    async proceedSignIn({ commit }, data) {
      console.log("fetching user data");
      //console.log(data);
      const historyData = getCurrentHistory();
      const res = await axios.post("/user/signin", {
        ...data,
        historyData,
      });
      let responseBody = res.data;
      //console.log(responseBody);
      if (responseBody.code == 200) {
        // Update current state in store !
        commit("userSignedIn", responseBody.data);
        // TODO - fetch old history from users if any
        Cookies.set("token", responseBody.data.token, {
          expires: 1,
          path: "",
        });
      }
      return responseBody;
    },

    async proceedSignUp({ commit }, data) {
      console.log("fetching new user data");
      //console.log(data);
      const historyData = getCurrentHistory();
      const res = await axios.post("/user/signup", {
        ...data,
        historyData,
      });
      let responseBody = res.data;
      //console.log(responseBody);
      if (responseBody.code == 200) {
        // Update current state in store !
        commit("userSignedIn", responseBody.data);
        // TODO
        Cookies.set("token", responseBody.data.token, {
          expires: 1,
          path: "",
        });
      }
      return responseBody;
    },
  },
});
