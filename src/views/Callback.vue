<template>
  <div>
    <div class="loading-text">Loading</div>
    <div v-if="true" class="loading-indicator spinner">
      <Loading></Loading>
    </div>
  </div>
</template>

<script>
import Loading from "vue-material-design-icons/Loading.vue";
import * as oauth from "@panva/oauth4webapi";
export default {
  data() {
    return {
      callback_url: process.env.VUE_APP_CALLBACK,
      issuer_url: process.env.VUE_APP_ISSUER,
      client_id: process.env.VUE_APP_CLIENT_ID,
      client_secret: process.env.VUE_APP_CLIENT_SECRET,
      expectedState: process.env.VUE_APP_STATE,
    };
  },
  components: {
    Loading,
  },
  methods: {
    response: async function () {
      let sub;
      let access_token;

      const redirect_uri = this.callback_url;
      const code_verifier = JSON.parse(sessionStorage.getItem("code_verifier"));
      sessionStorage.removeItem("code_verifier");
      const currentUrl = new URL(window.location.href);

      const issuer = new URL(this.issuer_url);
      const authorizationServer = await oauth
        .discoveryRequest(issuer)
        .then((response) => oauth.processDiscoveryResponse(issuer, response));

      const client = {
        client_id: this.client_id,
        client_secret: this.client_secret,
        token_endpoint_auth_method: "client_secret_basic",
      };
      const params = oauth.validateAuthResponse(
        authorizationServer,
        client,
        currentUrl,
        this.expectedState
      );

      if (oauth.isOAuth2Error(params)) {
        console.log("error", params);
        throw new Error();
      }
      const response = await oauth.authorizationCodeGrantRequest(
        authorizationServer,
        client,
        params,
        redirect_uri,
        code_verifier
      );

      let challenges;
      if ((challenges = oauth.parseWwwAuthenticateChallenges(response))) {
        for (const challenge of challenges) {
          console.log("challenge", challenge);
        }
        throw new Error();
      }
      const result = await oauth.processAuthorizationCodeOpenIDResponse(
        authorizationServer,
        client,
        response
      );

      if (oauth.isOAuth2Error(result)) {
        console.log("error", result);
        throw new Error();
      }
      ({ access_token } = result);
      const claims = oauth.getValidatedIdTokenClaims(result);
      ({ sub } = claims);
      var domain = window.location.hostname;
      // id token
      document.cookie =
        "id_token=" +
        result.id_token +
        ";secure" +
        ";domain=" +
        domain +
        ";path=/" +
        ";SameSite=None" +
        ";max-age=" +
        "3600";

      // access token cookie
      document.cookie =
        "access_token=" +
        access_token +
        ";secure" +
        ";domain=" +
        domain +
        ";path=/" +
        ";SameSite=None" +
        ";max-age=" +
        "3600";

      //login cookie
      document.cookie = "logged_in=" + true + ";secure" + ";max-age=" + "3600";

      const response1 = await oauth.userInfoRequest(
        authorizationServer,
        client,
        access_token
      );

      let challenges1;
      if ((challenges1 = oauth.parseWwwAuthenticateChallenges(response1))) {
        for (const challenge of challenges1) {
          console.log("challenge", challenge);
        }
        throw new Error();
      }

      const result1 = await oauth.processUserInfoResponse(
        authorizationServer,
        client,
        sub,
        response1
      );

      document.cookie =
        "profile=" + JSON.stringify(result1) + ";secure" + ";max-age=" + "3600";
      window.location.href = "/";
    },
  },
  beforeMount() {
    this.response();
  },
};
</script>

<style>
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
