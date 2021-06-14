import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie";
import {
  getGuestHistory,
  updateNewHistoryToDatabase,
  validateToken,
  axios,
  appendToGuestHistory,
  removeOneRecord,
  removeAllRecord,
} from "./utils";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    // default 0 - sign up page, 1 - sign in, 2 - dashboard
    firstLoad: true,
    navigateTo: 0,
    historyData: [],
    username: "",
  },
  mutations: {
    loaded(state) {
      state.firstLoad = false;
    },
    userSignedIn(state, payload) {
      // 2 - dashboard
      localStorage.removeItem("history");
      //localStorage.setItem("history", JSON.stringify(payload.historyData));
      state.historyData = payload.historyData;
      state.navigateTo = 2;
      state.username = payload.username;
    },
    userSignOut(state) {
      state.navigateTo = 0;
      state.historyData = [];
      state.username = "";
    },
    appendHistory(state, payload) {
      console.log("add data to store's history");
      state.historyData.push(payload.newData);
    },
    removeHistory(state) {
      console.log("remove history data from store");
      state.historyData = [];
    },
    removeRecord(state, timestamp) {
      state.historyData = state.historyData.filter(
        (ele) => ele.timestamp != timestamp
      );
    },
    navigate(state, payload) {
      state.navigateTo = payload;
    },
  },
  actions: {
    async fetchResult({ commit }, data) {
      console.log("calculating");
      // fetch result from server
      const res = await axios.post("/calc", data);
      let responseBody = res.data;
      if (responseBody.success) {
        let newData = {
          firstVal: data.firstVal,
          option: data.option,
          secondVal: data.secondVal,
          result: responseBody.data.result,
          timestamp: +new Date(),
        };
        // check current token
        const resAuth = await validateToken();
        if (resAuth.data.code == 200) {
          console.log("signed in user");
          // token valid, signed in already !
          // update new data to db if user signed in
          const updateSuccess = await updateNewHistoryToDatabase(newData);
          if (!updateSuccess) {
            throw new Error("Can not append new data");
          }
          commit({
            type: "appendHistory",
            newData,
          });
        } else {
          // guest user, add to local storage instead
          console.log("guest user");
          commit("userSignOut");
          appendToGuestHistory(newData);
        }

        return responseBody.data.result;
      } else console.log("Can not fetch the result");
    },
    async proceedSignIn({ commit }, data) {
      console.log("fetching user data");
      const historyData = getGuestHistory();
      const res = await axios.post("/user/signin", {
        ...data,
        historyData,
      });
      // response body will hold new history (including old and new one) and token
      let responseBody = res.data;
      if (responseBody.code == 200) {
        // Update current state in store !
        commit("userSignedIn", {
          historyData: responseBody.data.historyData,
          username: data.username,
        });
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
      const historyData = getGuestHistory();
      const res = await axios.post("/user/signup", {
        ...data,
        historyData,
      });
      // response body will hold token
      let responseBody = res.data;
      if (responseBody.code == 200) {
        // Update current state in store !
        commit("userSignedIn", {
          historyData,
          username: data.username,
        });
        // TODO
        Cookies.set("token", responseBody.data.token, {
          expires: 1,
          path: "",
        });
      }
      return responseBody;
    },
    async validateOnMounted({ commit }) {
      const resAuth = await validateToken();
      if (resAuth.data.code == 200) {
        console.log("signed in user");
        // token valid, signed in already !
        const payload = resAuth.data.data;
        commit("userSignedIn", payload);
        commit("loaded");
      }
    },
    async deleteAll({ commit }) {
      const res = await removeAllRecord();
      if (res.data.code == 200) {
        commit("removeHistory");
      } else console.log("delete all failed");
    },
    async deleteOne({ commit }, data) {
      const res = await removeOneRecord(data);
      if (res.data.code == 200) {
        commit("removeRecord", data.timestamp);
      } else console.log("delete one failed");
    },
  },
});
