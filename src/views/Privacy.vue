<template>
  <div class="content word-wrap">
    <b-button
      data-testid="returnButton"
      tag="router-link"
      to="/"
      type="is-primary"
    >
      Return to main page
    </b-button>
    <h1>ELIXIR Beacon Network</h1>
    <h2>Privacy Policy</h2>
    <p>
      This document covers the privacy policies of ELIXIR Beacon Network (from
      now on referred to as <i>service</i>).
    </p>

    <h3>Service</h3>
    <p>
      The service is provided by ELIXIR Finland (CSC - IT Center for Science
      Ltd.). As a service provider ELIXIR Finland is responsible for hosting the
      service website and any underlying APIs. The service is operated by ELIXIR
      Europe (ELIXIR Hub). As a service operator ELIXIR Europe is responsible
      for managing the service contact address.
    </p>
    <h3>Personal Information</h3>
    <p>
      Users that authenticate with the ELIXIR AAI Login button will have their
      ELIXIR ID logged by the OIDC Client service. These logs reside inside the
      EU, and they are not permanently saved. See <i>Cookies</i> below for more
      stored information. The service does not collect or store any other
      identifiable data of its users.
    </p>
    <h3>Cookies</h3>
    <p>
      The service utilises cookies for servicing broader access to authenticated
      and authorised users, and for anonymous page view tracking. If a user
      authenticates themselves at ELIXIR AAI, their ELIXIR AAI Access Token
      (JWT) will be saved to cookies for a duration of up to one hour. This
      cookie contains data such as what is the user's ELIXIR ID. This cookie is
      only available from the domain of the service, and can only travel in
      encrypted HTTPS traffic. Other cookies are also utilised, but they hold no
      personal data. Users are advised to delete their browser session cookies
      if they are using the service on a public computer.
    </p>
    <p>
      Cookies used by this service:
      <br /><b>Cookies for all users:</b> <br /><i>elixir-cookies</i>: disables
      the Privacy Policy and Terms of Service notification, if user closes the
      notification. <br />
      <i>mtm_consent</i>: enables anonymous page view tracking with Matomo
      software hosted by CSC at ELIXIR Finland.<br />
      <i>elixir-consent-given</i>: for managing Matomo consent on UI side.<br />
      <b>Cookies for authenticated users:</b> <br /><i>oidc_state</i>: A session
      key used in the authentication process at ELIXIR AAI. Contains no personal
      or identifiable data. <br /><i>logged_in</i>: Indicates that the user has
      authenticated. Contains no personal or identifiable data. <br /><i
        >bona_fide</i
      >: Indicates the user's Bona Fide status. Contains no personal or
      identifiable data. <br /><i>access_token</i>: ELIXIR AAI JWT access token,
      is used to gain access to permitted datasets at Beacons. Contains user's
      ELIXIR ID.
    </p>
    <h3>Tracking</h3>
    <p>
      The service utilises anonymous page view tracking for evaluating traffic
      to the website, and its level of use. Tracking is conducted with
      <a href="https://matomo.org/">Matomo web analytics software</a> hosted by
      CSC (ELIXIR Finland). The server and data are hosted and kept in Finland
      (EU), and the raw data is not shared outside of the organisation. IP
      addresses are anonymised by setting the last two digits to 0, e.g. the IP
      address <i>193.167.189.101</i> is logged as <i>193.167.0.0</i>. General
      quarterly and yearly report data on page views may be shared with ELIXIR
      partners.
    </p>
    <p>
      CSC (ELIXIR Finland) acts as the data owner and data handler for ELIXIR
      Beacon Network traffic data.<br />
      <a href="https://www.csc.fi/en/privacy">CSC Privacy Policy</a>
    </p>
    <p>
      Tracking can be disabled by clicking the button below. Alternatively, you
      can set your browser to send a <i>Do Not Track</i> message, and Matomo
      software will take this into account.
    </p>
    <div v-if="getCookie('elixir-tracking-consent') == 'true'">
      <b-button v-on:click="disableTracking()" type="is-warning"
        >Disable Tracking</b-button
      >
    </div>
    <div v-else>
      <b-button v-on:click="enableTracking()" type="is-warning"
        >Enable Tracking</b-button
      >
    </div>
    <h3>Security</h3>
    <p>
      The service and all of its components will always be served over encrypted
      HTTPS traffic.
    </p>
    <h3>Third Party Beacons</h3>
    <p>
      The service is not responsible for the content that connected Beacons may
      hold. Users are advised, that if they have authenticated themselves at
      ELIXIR AAI, their ELIXIR AAI JWT Access Tokens are sent to the connected
      Beacons for processing to check for possible dataset permissions. The
      service has set strict requirements for connected Beacons regarding
      security. If you suspect malpractice at the end of a connected Beacon,
      please contact us, and the issue will be investigated. Malpractice at a
      Beacon may be for example; collection and storing of user access tokens
      with malicious intent or servicing their API via an unsecure, unencrypted
      HTTP traffic.
    </p>
    <h3>Changes to Privacy Policy</h3>
    <p>
      This document may be updated at any time without given notice.
      <br /><i>Last updated: 26 May 2020.</i>
    </p>
    <h3>Contact Us</h3>
    <p>
      Should any questions or suggestions emerge, we urge you to contact us at
      <br /><a href="mailto:bn-contact@elixir-europe.org"
        >bn-contact@elixir-europe.org</a
      ><br />
    </p>
    <router-link to="/tos">Terms of Service</router-link><br />
  </div>
</template>

<script>
import VueCookies from "vue-cookies";
export default {
  methods: {
    enableTracking: function () {
      this.$matomo.setConsentGiven();
      VueCookies.set("elixir-tracking-consent", "true", Infinity);
    },
    disableTracking: function () {
      this.$matomo.forgetConsentGiven();
      VueCookies.set("elixir-tracking-consent", "false", Infinity);
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
  },
};
</script>

<style lang="scss" scoped>
.word-wrap {
  margin: 0 auto;
  max-width: 80ch;
  padding-bottom: 25px;
  text-align: left;
}
</style>
