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
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
        <a
          href="javascript:"
          @click="navigateToSignUp"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Don't have an account?
        </a>
      </div>
      <div>
        <button
          type="button"
          @click="signInAttempt"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    signInAttempt() {
      if (this.password == "" || this.username == "") {
        this.error = "Username and password can not be empty!";
        return;
      }
      this.$store
        .dispatch("proceedSignIn", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          if (res.code == 200) {
            this.$store.commit("navigate", 2);
            this.error = "";
          } else {
            this.error = res.errorMessage;
          }
        })
        .catch((err) => {
          this.error = err;
          console.log(err);
        });
    },
    navigateToSignUp() {
      this.$store.commit("navigate", 0);
    },
  },
};
</script>
