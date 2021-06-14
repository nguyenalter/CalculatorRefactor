<template>
  <div class="max-w-sm w-full">
    <div>
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
      <h2 class="mt-6 text-center text-3xl font-bold">
        Create your account
      </h2>
    </div>
    <form class="mt-8 space-y-4">
      <input type="hidden" name="remember" value="true" />
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="username" class="sr-only">Username</label>
          <input
            id="username"
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
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            name="password"
            v-model="password"
            type="password"
            autocomplete="off"
            required="password"
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>
        <div>
          <label for="confirm_password" class="sr-only">Password</label>
          <input
            id="confirm_password"
            name="confirm_password"
            v-model="confirm_password"
            type="password"
            required="password"
            autocomplete="off"
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Confirm password"
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
          @click="navigateToSignIn"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Already have an account?
        </a>
      </div>
      <div>
        <button
          type="button"
          @click="signUpAttempt"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign up
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      password: "",
      confirm_password: "",
      error: "",
    };
  },
  methods: {
    signUpAttempt() {
      // TODO
      if (
        this.password == "" ||
        this.username == "" ||
        this.confirm_password == ""
      ) {
        this.error = "Username and password can not be empty!";
        return;
      }
      if (this.password != this.confirm_password) {
        this.error = "Confirm password mismatch!";
        return;
      }
      this.$store
        .dispatch("proceedSignUp", {
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
    navigateToSignIn() {
      this.$store.commit("navigate", 1);
    },
  },
};
</script>
