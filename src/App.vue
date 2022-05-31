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
          v-on:click="oidcAuth()"
          v-if="!getCookie('logged_in')"
          class="login"
          title="Authenticate at ELIXIR AAI"
          ><img src="./assets/login-ls.png" alt="ELIXIR AAI Login button"
        /></a>

        <b-navbar-item
          v-else
          class="login"
          v-on:click="logout()"
          title="Log out from ELIXIR Beacon Network"
        >
          Log Out
        </b-navbar-item>
      </template>
    </b-navbar>
    <div v-if="loading">
      <div class="loading-text">Loading</div>
      <div class="loading-indicator spinner">
        <Loading></Loading>
      </div>
    </div>
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Loading from "vue-material-design-icons/Loading.vue";
import Footer from "@/components/Footer.vue";
import * as oauth from "@panva/oauth4webapi";
export default {
  data() {
    return {
      login_url: process.env.VUE_APP_LOGIN_URL,
      logout_url: process.env.VUE_APP_LOGOUT_URL,
      loading: false,
      issuer_url: process.env.VUE_APP_ISSUER,
      client_id: process.env.VUE_APP_CLIENT_ID,
      client_secret: process.env.VUE_APP_CLIENT_SECRET,
      callback_url: process.env.VUE_APP_CALLBACK,
      state: process.env.VUE_APP_STATE,
      scope: process.env.VUE_APP_SCOPE,
    };
  },
  components: {
    Footer,
    Loading,
  },
  methods: {
    oidcAuth: async function () {
      this.loading = true;
      const issuer = new URL(this.issuer_url);
      const authorizationServer = await oauth
        .discoveryRequest(issuer)
        .then((response) => oauth.processDiscoveryResponse(issuer, response));

      const client = {
        client_id: this.client_id,
        client_secret: this.client_secret,
        token_endpoint_auth_method: "client_secret_basic",
      };

      const redirect_uri = this.callback_url;

      if (
        authorizationServer.code_challenge_methods_supported?.includes(
          "S256"
        ) !== true
      ) {
        // This example assumes S256 PKCE support is signalled
        // If it isn't supported, random `nonce` should be used for CSRF protection.
        throw new Error();
      }

      const code_verifier = oauth.generateRandomCodeVerifier();
      const code_challenge = await oauth.calculatePKCECodeChallenge(
        code_verifier
      );

      sessionStorage.setItem("code_verifier", JSON.stringify(code_verifier));

      const code_challenge_method = "S256";

      const authorizationUrl = new URL(
        authorizationServer.authorization_endpoint
      );
      authorizationUrl.searchParams.set("client_id", client.client_id);
      authorizationUrl.searchParams.set("code_challenge", code_challenge);
      authorizationUrl.searchParams.set(
        "code_challenge_method",
        code_challenge_method
      );
      authorizationUrl.searchParams.set("redirect_uri", redirect_uri);
      authorizationUrl.searchParams.set("response_type", "code");
      authorizationUrl.searchParams.set("scope", this.scope);
      authorizationUrl.searchParams.set("state", this.state);
      location.href = authorizationUrl;
    },
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
    logout: async function () {
      const issuer = new URL(this.issuer_url);
      const authorizationServer = await oauth
        .discoveryRequest(issuer)
        .then((response) => oauth.processDiscoveryResponse(issuer, response));

      const client = {
        client_id: this.client_id,
        client_secret: this.client_secret,
        token_endpoint_auth_method: "client_secret_basic",
      };

      const revokeAccessToken = await oauth.revocationRequest(
        authorizationServer,
        client,
        "access_token"
      );

      const resultAccessTokenRevokation = await oauth.processRevocationResponse(
        revokeAccessToken
      );

      if (oauth.isOAuth2Error(resultAccessTokenRevokation)) {
        console.log("error", resultAccessTokenRevokation);
        throw new Error();
      }

      document.cookie = "access_token=" + " " + ";max-age=" + "0";

      document.cookie = "logged_in=" + false + ";secure" + ";max-age=" + "0";

      document.cookie = "profile=" + " " + ";secure" + ";max-age=" + "0";
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

.login img {
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

// Loading indicator
.loading-text {
  text-align: center;
}
.loading-indicator {
  text-align: center;
}
.spinner {
  animation: rotate 1s linear infinite;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
