<template>
  <!-- TODO -->
  <div class="max-w-sm w-full">
    <div>
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
      <h2 class="mt-6 text-center text-3xl font-bold">
        Sign in to your account
      </h2>
    </div>
    <form class="mt-8 space-y-4">
      <input type="hidden" name="remember" value="true" />
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label :for="username" class="sr-only">Username</label>
          <input
            name="username"
            v-model="username"
            type="text"
            autocomplete="text"
            required="true"
            class="input-field"
            placeholder="Username"
          />
        </div>
        <div>
          <label :for="password" class="sr-only">Password</label>
          <input
            name="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            required="password"
            class="input-field"
            placeholder="Password"
          />
        </div>
      </div>
      <p
        class="font-bold text-md text-left my-3 text-red-600"
        v-if="error != ''"
      >
        Error: {{ error }}
      </p>
      <div class="text-sm text-right">
        <router-link to="/account/signup"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Don't have an account?
        </router-link>
      </div>
      <div>
        <button
          type="button"
          @click="signInAttempt"
          class="signIn-btn"
        >
          Sign in
        </button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'SignIn',
  data() {
    return {
      username: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async signInAttempt() {
      if (this.password == '' || this.username == '') {
        this.error = 'Username and password can not be empty!';
        return;
      }
      try {
        await this.$store
          .dispatch('proceedSignIn', {
            username: this.username,
            password: this.password,
          });
        this.$router.push('/account');
      } catch (err) {
        if (err.response.status == 401) this.error = 'Invalid username or password!';
        else this.error = `Server error with status ${err.response.status}`;
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.signIn-btn {
  @apply group relative w-full flex justify-center
    py-2 px-4 border border-transparent text-sm
    font-medium rounded-md text-white bg-indigo-600
    hover:bg-indigo-700 focus:outline-none focus:ring-2
    focus:ring-offset-2 focus:ring-indigo-500;
}

.input-field {
  @apply appearance-none rounded-none relative
  block w-full px-3 py-2 border border-gray-300
  placeholder-gray-500 text-gray-900 rounded-b-md
  focus:outline-none focus:ring-indigo-500
  focus:border-indigo-500 focus:z-10 sm:text-sm;
}
</style>
