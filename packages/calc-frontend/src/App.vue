<template>
  <div id="app" class="font-sans grid">
    <div id="nav" class="text-center bg-purple-300 font-bold p-10">
      <router-link to="/">Home</router-link> |
      <router-link to="/history">History</router-link> |
      <router-link to="/account">Account</router-link>
    </div>
    <router-view class="bg-white" />
  </div>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50; */
}

#nav a.router-link-exact-active {
  color: #42b97d;
}
</style>
