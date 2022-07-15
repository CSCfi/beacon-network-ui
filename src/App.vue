<template>
  <div id="app">
    <h1 style="display: none">ELIXIR Beacon Network</h1>
    <b-navbar
      id="nav"
      :class="[
        $route.path !== '/' && $route.path !== '/results' ? 'borderNav' : null,
      ]"
      :spaced="true"
      transparent
      ><template #brand> Logo here </template>
      <template #start> Other spot for logo </template>
      <template #end>
        <b-navbar-item
          class="navbarButton"
          href="/datasets"
          v-if="$route.path != '/datasets' && $route.path != '/history'"
          data-testid="datasetsButton"
        >
          Datasets
        </b-navbar-item>

        <b-navbar-item
          class="navbarButton"
          v-else
          href="/"
          data-testid="returnToHomeTab"
        >
          Return to front page
        </b-navbar-item>

        <b-navbar-item
          class="navbarButton"
          v-if="$route.path != '/history'"
          href="/history"
          data-testid="historyButton"
        >
          Search history
        </b-navbar-item>

        <b-navbar-item
          class="navbarButton"
          v-else
          href="/datasets"
          data-testid="datasetsButtonFromHistory"
        >
          Datasets
        </b-navbar-item>
        <b-navbar-item
          v-if="!getCookie('logged_in')"
          title="Authenticate at ELIXIR AAI"
          transparent
        >
          <b-button class="loginButton" :href="login_url">Login</b-button>
        </b-navbar-item>

        <b-navbar-item
          v-else
          class="login"
          title="Log out from ELIXIR Beacon Network"
        >
          <b-button class="loginButton" :href="logout_url">Log Out</b-button>
        </b-navbar-item>
      </template>
    </b-navbar>
    <router-view />
    <BottomFooter />
  </div>
</template>

<script>
import BottomFooter from "@/components/Footer.vue";
export default {
  data() {
    return {
      login_url: process.env.VUE_APP_LOGIN_URL,
      logout_url: process.env.VUE_APP_LOGOUT_URL,
    };
  },
  components: {
    BottomFooter,
  },
  methods: {
    getCookie: function (cname) {
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
    },
  },
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
  flex-wrap: wrap;
  min-height: auto;
}

.borderNav {
  border-bottom: solid 1px #ccc;
  margin-bottom: 10px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#nav ~ .home {
}

.login {
  margin-left: auto;
  margin-top: 23px;
  height: 50px;
}

.login {
  width: 200px;
  height: 50px;
}

.logo {
  height: 80px;
}

.loginButton {
  background-color: #f2f0f7 !important;
  border-color: #1c007b !important;
  border-width: 1.5px !important;
}
.loginButton:hover {
  color: white !important;
  background-color: #1c007b !important;
  border-color: #1c007b !important;
  border-width: 1.5px !important;
}
.navbarButton {
  color: #1c007b !important;
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
    $primary-invert,
  ),
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
