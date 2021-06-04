<template>
  <div class="home">
    <p id="logo" v-if="$route.meta.hideSmallLogo">
      <router-link to="/">
        <img
          class="bigLogo"
          alt="ELIXIR Beacon Network logo"
          src="@/assets/beacon-network-logo.png"
        />
      </router-link>
    </p>
    <component
      v-bind:is="componentName"
      @changeSearchForm="toggleForm"
    ></component>
    <div v-if="$route.path === '/results'">
      <hr id="divider" />
      <p class="results-disclaimer">
        Note that Beacon Network is using 1-based coordinates, while Beacons are
        using 0-based coordinates. An automatic coordinate substraction is made
        upon a query.<br />
        <router-link to="/guide"
          >More information on how to make queries is available in the Beacon
          Network guide</router-link
        >.
      </p>
    </div>
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import BasicSearch from "@/components/BasicSearch.vue";
import AdvancedSearch from "@/components/AdvancedSearch.vue";
import VueCookies from "vue-cookies";
import { ToastProgrammatic as Toast } from 'buefy'

export default {
  name: "home",
  components: {
    BasicSearch,
    AdvancedSearch
  },
  data() {
    return {
      queryParams: {},
      results: false,
      componentName: BasicSearch
    };
  },
  methods: {
    toggleForm: function() {
      if (this.componentName === BasicSearch) {
        this.componentName = AdvancedSearch;
      } else {
        this.componentName = BasicSearch;
      }
    },
    cookieToast: function() {
      // Check if cookies have been accepted, if not, show toast regarding cookies
      if (!VueCookies.get("elixir-cookies")) {
        this.$snackbar.open({
          indefinite: true,
          queue: false,
          message:
            "Beacon Network utilises cookies and anonymous page view tracking. By using Beacon Network you accept the use of these cookies," +
            ' more information regarding cookies and optable tracking can be read from the <a href="/privacy" style="color:#000DFF">Privacy Policy</a>.' +
            ' Users are also subject to the <a href="/tos" style="color:#000DFF">Terms of Service</a>.',
          actionText: "OK",
          type: "is-dark",
          onAction: () => {
            // Set a cookie to prevent toast on subsequent visits
            this.$matomo.rememberConsentGiven();
            VueCookies.set("elixir-tracking-consent", true, Infinity);
            VueCookies.set("elixir-cookies", "accepted", Infinity);
            this.$buefy.toast.open({
              queue: false,
              message: "Cookies are in use!",
              position: "is-bottom-right"
            });
          }
        });
      }
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
  },
  beforeMount() {
    this.cookieToast();
  }
};
</script>

<style scoped>
.home {
  flex: 1 0 auto;
}
.visible {
  display: block;
}

.hidden {
  display: none;
}

#divider {
  background-color: #e7e7e7;
  height: 1px;
}

#logo {
  margin-bottom: 25px;
  text-align: center;
}

.loggedStatus {
  position: absolute;
  top: 20px;
  right: 150px;
}

.bigLogo {
  height: 150px;
}

.results-disclaimer {
  text-align: center;
}
</style>
