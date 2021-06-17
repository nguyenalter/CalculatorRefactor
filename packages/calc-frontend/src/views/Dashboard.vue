<template>
  <div class="grid justify-items-center">
    <p class="text-md font-bold">You are signed in as: {{ username }}</p>
    <p class="text-red-600 text-md font-bold">
      Sign out will delete local history data!
    </p>
    <button
      type="button"
      @click="signOutAttempt"
      class="
        group
        relative
        w-full
        max-w-xs
        flex
        justify-center
        py-2
        px-4
        border border-transparent
        text-sm
        font-medium
        rounded-md
        text-white
        bg-indigo-600
        hover:bg-indigo-700
        focus:outline-none
        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
      "
    >
      Sign out
    </button>
  </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  name: 'Dashboard',
  methods: {
    signOutAttempt() {
      Cookies.remove('token', { path: '' });
      this.$router.push('/account/signin');
      this.$store.commit('removeHistory');
      this.$store.commit('userSignedOut');
    },
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
  },
  mounted() {
    if (!this.username) this.$router.push('account/signup');
  },
};
</script>
