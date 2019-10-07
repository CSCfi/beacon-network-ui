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
      <a
        v-if="!getCookie('logged_in')"
        class="login"
        href="https://auth-beacon.rahtiapp.fi/login"
        ><img src="./assets/elixir-login.png"
      /></a>
      <b-button
        v-if="getCookie('logged_in')"
        class="login"
        v-on:click="logOut"
        type="is-primary"
        size="is-medium"
        >Log Out</b-button
      >
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
  },
  methods: {
    logOut: function() {
      // Function from https://www.w3schools.com/js/js_cookies.asp
      // This function replaces the existing cookie with an instantly expiring one
      document.cookie =
        "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },
    getCookie: function(cname) {
      // Function from https://www.w3schools.com/js/js_cookies.asp
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
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
$primary: #047eaa;
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
