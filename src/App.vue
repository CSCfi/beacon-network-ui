<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"><img class="logo" alt="ELIXIR Beacon Network logo" src="./assets/beacon-network-logo.png" /></router-link>
      <a v-bind:href="login"><img class="login" src="./assets/elixir-login.png"></a>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      login: process.env.VUE_APP_LOGIN
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 0 30px 0 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 30px 0 30px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.login {
  width: 100px;
  float: right;
  padding-top: 15px;
}

.logo {
  height: 100px;
  float: left;
}
</style>

<style lang="scss">
// Import Bulma's core
  @import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #F47C20;
$primary-invert: findColorInvert($primary);
$colors: (
    "primary": ($primary, $primary-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
