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
    <div class="container">
      <component
        data-testid="component"
        v-bind:is="componentName"
        @changeFormToA="setFormToA()"
        @changeFormToB="setFormToB()"
        @changeFormToListing="setFormToListing()"
      ></component>
      <b-switch v-model="toggleV2" id="v2Switch">
        {{
          toggleV2 ? "Beacon v2 search enabled" : "Beacon v2 search disabled"
        }}
      </b-switch>
    </div>

    <div v-if="$route.path === '/results'">
      <hr id="divider" />
      <p class="results-disclaimer">
        Note that Beacon Network is using 1-based coordinates, while Beacons are
        using 0-based coordinates.<br />
        An automatic coordinate substraction is made upon a query.<br />
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
import BasicSearchV2 from "@/components/BasicSearchV2.vue";
import AdvancedSearchV2 from "@/components/AdvancedSearchV2.vue";
import ListingV2 from "@/components/ListingV2.vue";
import VueCookies from "vue-cookies";

export default {
  name: "homePage",
  components: {
    BasicSearch,
    AdvancedSearch,
    BasicSearchV2,
    AdvancedSearchV2,
    ListingV2,
  },
  data() {
    return {
      queryParams: {},
      results: false,
      toggleV2: false,
      componentName: BasicSearch,
    };
  },

  watch: {
    toggleV2() {
      //called whenever toggleV2 changes
      this.toggleForm();
    },
  },
  methods: {
    toggleForm: function () {
      if (this.componentName == BasicSearch) {
        this.componentName = BasicSearchV2;
      } else if (this.componentName == BasicSearchV2) {
        this.componentName = BasicSearch;
      } else if (this.componentName == AdvancedSearchV2) {
        this.componentName = AdvancedSearch;
      } else if (this.componentName == AdvancedSearch) {
        this.componentName = AdvancedSearchV2;
      } else if (this.componentName == ListingV2 && !this.toggleV2) {
        this.componentName = BasicSearch;
      }
    },
    setFormToA: function () {
      if (this.toggleV2) {
        this.componentName = AdvancedSearchV2;
      } else {
        this.componentName = AdvancedSearch;
      }
    },
    setFormToB: function () {
      if (this.toggleV2) {
        this.componentName = BasicSearchV2;
      } else {
        this.componentName = BasicSearch;
      }
    },
    setFormToListing: function () {
      if (this.toggleV2) {
        this.componentName = ListingV2;
      }
    },
    cookieToast: function () {
      // Check if cookies have been accepted, if not, show toast regarding cookies
      if (
        !VueCookies.get("elixir-cookies") &&
        !VueCookies.get("elixir-cookies-toast-shown")
      ) {
        // Make a record of this toast being shown, so that it is not duplicated when view is changed
        VueCookies.set("elixir-cookies-toast-shown", true, Infinity);
        this.$buefy.snackbar.open({
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
              position: "is-bottom-right",
            });
          },
        });
      }
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
  beforeMount() {
    this.cookieToast();
    if (this.$route.query.searchInInput != undefined) {
      this.toggleV2 = true;
    } else {
      this.toggleV2 = false;
    }
    if (this.$route.query.searchType == "advanced") {
      if (!this.toggleV2) {
        this.componentName = AdvancedSearchV2;
      } else {
        this.componentName = AdvancedSearch;
      }
    }
    if (this.$route.query.searchType == "listing") {
      if (this.toggleV2) {
        this.componentName = ListingV2;
      }
    }
  },
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
