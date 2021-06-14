<template>
  <div class="flex justify-center mt-5">
    <sign-up
      v-if="switchScreen == 0"
      @navigateTo="switchScreen = $event"
    ></sign-up>
    <sign-in v-else-if="switchScreen == 1" @navigateTo="switchScreen = $event">
    </sign-in>
    <dashboard
      v-else-if="switchScreen == 2"
      @signedOut="clearUserData"
      :username="username"
    ></dashboard>
    <p v-else></p>
  </div>
</template>

<script>
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";
import Dashboard from "../components/Dashboard.vue";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.VUE_APP_SERVER_API;
export default {
  components: {
    SignIn,
    SignUp,
    Dashboard,
  },
  data() {
    return {
      // 0 - signUp, 1 - signIn and 2 for signedIn
      switchScreen: null,
      username: null,
    };
  },
  methods: {
    async validateToken() {
      return await axios.get(API_URL + "/user/auth", {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });
    },
    clearUserData() {
      // Remove token
      Cookies.remove("token", { path: "" });
      // Remove local history
      localStorage.removeItem("history");
      // navigate to sign up screen
      this.switchScreen = 0;
    },
  },
  mounted() {
    this.validateToken().then((res) => {
      const { code, data } = res.data;
      if (code == 200) {
        // Set data to local storage
        localStorage.setItem("history", JSON.stringify(data.historyData));
        this.username = data.username;
        // Valid token, signed in
        this.switchScreen = 2;
      } else {
        // Wrong token or no token -> navigate to sign in screen
        this.switchScreen = 0;
      }
    });
  },
};
</script>
