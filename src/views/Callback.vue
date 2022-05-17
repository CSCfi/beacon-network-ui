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
    return { aggregator: process.env.VUE_APP_AGGREGATOR_URL };
  },
  components: {
    Loading,
  },
  methods: {
    response: async function () {
      let sub;
      let access_token;

      const authorizationServer = JSON.parse(sessionStorage.getItem("as"));
      const client = JSON.parse(sessionStorage.getItem("client"));
      const redirect_uri = JSON.parse(sessionStorage.getItem("uri"));
      const code_verifier = JSON.parse(sessionStorage.getItem("code_verifier"));
      const currentUrl = new URL(window.location.href);

      const params = oauth.validateAuthResponse(
        authorizationServer,
        client,
        currentUrl,
        oauth.expectNoState
      );
      if (oauth.isOAuth2Error(params)) {
        console.log("error", params);
        throw new Error(); // Handle OAuth 2.0 redirect error
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
        throw new Error(); // Handle www-authenticate challenges as needed
      }
      const result = await oauth.processAuthorizationCodeOpenIDResponse(
        authorizationServer,
        client,
        response
      );
      if (oauth.isOAuth2Error(result)) {
        console.log("error", result);
        throw new Error(); // Handle OAuth 2.0 response body error
      }
      ({ access_token } = result);

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

      // remove items from session storage
      sessionStorage.removeItem("as");
      sessionStorage.removeItem("client");
      sessionStorage.removeItem("uri");
      sessionStorage.removeItem("code_verifier");
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