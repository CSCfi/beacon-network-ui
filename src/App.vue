<template>
  <div id="app">
    <h1 style="display:none">ELIXIR Beacon Network</h1>
    <div
      id="nav"
      :class="[
        $route.path !== '/' && $route.path !== '/results' ? 'borderNav' : null
      ]"
    >
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
        :href="login_url"
        title="Authenticate at ELIXIR AAI"
        ><img src="./assets/elixir-login.png" alt="ELIXIR AAI Login button"
      /></a>
      <a
        v-if="getCookie('logged_in')"
        class="login"
        :href="logout_url"
        title="Log out from ELIXIR Beacon Network"
      >
        <b-button class="login" type="is-primary">Log Out</b-button>
      </a>
      <router-link v-if="$route.path != '/datasets'" to="/datasets">
        <b-button
          data-testid="datasetsButton"
          class="datasets"
          type="is-primary"
          >Datasets</b-button
        >
      </router-link>
      <router-link v-if="$route.path == '/datasets'" to="/">
        <b-button
          data-testid="returnToHomeTab"
          class="datasets"
          type="is-primary"
          >Return to front page</b-button
        >
      </router-link>
    </div>
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
export default {
  data() {
    return {
      login_url: process.env.VUE_APP_LOGIN_URL,
      logout_url: process.env.VUE_APP_LOGOUT_URL
    };
  },
  components: {
    Footer
  },
  methods: {
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

.borderNav {
  border-bottom: solid 1px #ccc;
  margin-bottom: 10px;
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
.datasets {
  margin-top: 19px;
  height: 100px;
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
$snackbar-background-color: #ffcc00;
$snackbar-color: #000;
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
