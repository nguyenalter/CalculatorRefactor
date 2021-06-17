/* eslint-disable no-unused-vars */
import Vue from 'vue';
import Vuex from 'vuex';
import * as utils from '../services/utils';
import * as historyService from '../services/history';
import * as userService from '../services/user';

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    // default 0 - sign up page, 1 - sign in, 2 - dashboard
    historyData: utils.getGuestHistory() || [],
    username: '',
  },
  mutations: {
    userSignedIn(state, payload) {
      // 2 - dashboard
      localStorage.removeItem('history');
      // localStorage.setItem("history", JSON.stringify(payload.historyData));
      state.historyData = payload.historyData;
      state.username = payload.username;
    },
    userSignedOut(state) {
      state.historyData = [];
      state.username = '';
    },
    appendToStoredHistory(state, payload) {
      console.log("add data to store's history");
      state.historyData.push(payload.newData);
    },
    removeHistoryTable(state) {
      console.log('history table got removed');
      state.historyData = [];
    },
    removeItemInHistoryTable(state, createdAt) {
      console.log(`removed ${createdAt} from history table`);
      state.historyData = state.historyData.filter((ele) => ele.createdAt != createdAt);
    },
  },
  getters: {
    getUsername: (state) => state.username,
    getHistory: (state) => state.historyData,
  },
  actions: {
    async fetchResult({ commit, getters }, data) {
      console.log('calculating');
      // fetch result from server
      let res;
      try {
        res = await userService.calculateResult(data);
        if (res.status == 200) {
          const newData = {
            firstVal: data.firstVal,
            option: data.option,
            secondVal: data.secondVal,
            result: res.data.result,
            createdAt: utils.getCurrentFormattedTime(),
          };
          utils.appendToGuestHistory(newData);

          await historyService.addOneDataToUserHistory(newData);
          const res2 = await historyService.getUserHistory();
          const { historyData, username } = res2.data;
          commit('userSignedIn', {
            historyData,
            username,
          });
        }
      } catch (err) {
        if (getters.getUsername != '') {
          commit('userSignedOut');
        }
        console.log('invalid token -> guest user');
        console.log(err);
      }
      return res.data.result;
    },
    async proceedSignIn({ commit }, data) {
      console.log('fetching user data');
      try {
        const res = await userService.signInAttempt(data);
        const { token } = res.data;
        userService.createUserToken(token);
        const localHistoryData = utils.getGuestHistory();
        if (localHistoryData != []) await historyService.addUserHistory(localHistoryData);
        const res2 = await historyService.getUserHistory();
        // Update current state in store !
        const { historyData, username } = res2.data;
        commit('userSignedIn', {
          historyData,
          username,
        });
        return res;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    async proceedSignUp({ commit }, data) {
      console.log('fetching new user data');
      try {
        const res = await userService.signUpNewUser(data);
        const { token } = res.data;
        userService.createUserToken(token);
        const localHistoryData = utils.getGuestHistory();
        if (localHistoryData != []) await historyService.addUserHistory(localHistoryData);
        commit('userSignedIn', {
          historyData: localHistoryData,
          username: data.username,
        });
        return res;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async validateToken({ commit }) {
      const res = await historyService.getUserHistory();
      if (res.status == 200) {
        console.log('valid token!');
        // token valid, user already signed in  !
        commit('userSignedIn', res.data);
      }
    },
    async deleteAllHistoryData({ commit }) {
      const res = await historyService.removeAllDataFromUserHistory();
      if (res.status == 200) {
        commit('removeHistoryTable');
      }
      return res.data;
    },
    async deleteOneHistoryData({ commit }, data) {
      const res = await historyService.removeOneDataFromUserHistory(data.createdAt);
      if (res.status == 200) {
        commit('removeItemInHistoryTable', data.createdAt);
      }
      return res.data;
    },
  },
});
