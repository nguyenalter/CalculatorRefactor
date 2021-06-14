<template>
  <div class="flex justify-center mt-5">
    <sign-up v-if="switchScreen == 0"></sign-up>
    <sign-in v-else-if="switchScreen == 1"> </sign-in>
    <dashboard v-else-if="switchScreen == 2" :username="username"></dashboard>
    <p v-else></p>
  </div>
</template>

<script>
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";
import Dashboard from "../components/Dashboard.vue";
export default {
  components: {
    SignIn,
    SignUp,
    Dashboard,
  },
  computed: {
    switchScreen() {
      return this.$store.state.navigateTo;
    },
    username() {
      return this.$store.state.username;
    },
  },
};
</script>
