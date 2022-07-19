<template>
  <div id="app">
    <h1 style="display: none">ELIXIR Beacon Network</h1>
    <b-navbar
      id="nav"
      :class="[
        $route.path !== '/' && $route.path !== '/results' ? 'borderNav' : null,
      ]"
      :spaced="true"
      ><template #brand>
        <div id="logo" v-if="!$route.meta.hideSmallLogo">
          <router-link to="/"
            ><img
              class="logo"
              alt="ELIXIR Beacon Network logo"
              src="./assets/beacon-network-logo.png"
          /></router-link>
        </div>
      </template>
      <template #start>
        <!-- If v-if is used v-else has to be used otherwise none of the components will render-->
        <b-navbar-item
          href="/datasets"
          v-if="$route.path != '/datasets' && $route.path != '/history'"
          data-testid="datasetsButton"
        >
          Datasets
        </b-navbar-item>

        <b-navbar-item v-else href="/" data-testid="returnToHomeTab">
          Return to front page
        </b-navbar-item>

        <b-navbar-item
          v-if="$route.path != '/history'"
          href="/history"
          data-testid="historyButton"
        >
          Search history
        </b-navbar-item>

        <b-navbar-item
          v-else
          href="/datasets"
          data-testid="datasetsButtonFromHistory"
        >
          Datasets
        </b-navbar-item>
      </template>
      <template #end>
        <a
          :href="login_url"
          v-if="!getCookie('logged_in')"
          class="login"
          title="Authenticate at ELIXIR AAI"
          ><img src="./assets/login-ls.png" alt="ELIXIR AAI Login button"
        /></a>

        <b-navbar-item
          v-else
          class="login"
          :href="logout_url"
          title="Log out from ELIXIR Beacon Network"
        >
          Log Out
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
  margin-top: 20px;
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
