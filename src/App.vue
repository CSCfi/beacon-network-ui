<template>
  <div id="app">
    <div id="nav">
      <div id="logo" v-if="!$route.meta.hideSmallLogo">
        <router-link to="/"
          ><img
            class="logo"
            alt="ELIXIR Beacon Network logo"
            src="./assets/beacon-network-logo.png"
        /></router-link>
      </div>
      <a class="login" href="https://auth-beacon.rahtiapp.fi/login"
        ><img src="./assets/elixir-login.png"
      /></a>
    </div>
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Footer
  }
};
</script>
<style>
#app {
  font-family: "Lato", Helvetica, Arial, sans-serif;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100%;
}
#nav {
  display: flex;
  flex-wrap: wrap;
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

#nav ~ .home {
  margin-top: 20px;
}

.login {
  margin-left: auto;
  margin-top: 15px;
}

.login img {
  width: 100px;
}

.logo {
  height: 80px;
}
</style>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";
html,
body {
  height: 100%;
}
// Set your colors
$primary: #023452;
$primary-invert: findColorInvert($primary);
$colors: (
  "primary": (
    $primary,
    $primary-invert
  )
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
