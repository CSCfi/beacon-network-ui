<template>
  <div class="home">
    <p id="logo" v-if="$route.meta.hideSmallLogo">
      <router-link to="/">
        <img
          class="bigLogo"
          :alt="$t('message.bnLogo')"
          src="@/assets/beacon-network-logo.png"
        />
      </router-link>
    </p>
    <BasicSearch />
    <hr id="divider" v-if="$route.path === '/results'" />
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import BasicSearch from "@/components/BasicSearch.vue";
import VueCookies from "vue-cookies";

export default {
  name: "home",
  components: {
    BasicSearch
  },
  data() {
    return {
      queryParams: {},
      results: false
    };
  },
  methods: {
    devToast: function() {
      this.$snackbar.open({
        duration: 20000,
        queue: false,
        message: this.$t("message.toast.devMessage"),
        actionText: "Cool",
        onAction: () => {
          this.$toast.open({
            queue: false,
            message: this.$t("message.toast.devMessageOk"),
            position: "is-bottom-right"
          });
        }
      });
    },
    cookieToast: function() {
      // Check if cookies have been accepted, if not, show toast regarding cookies
      if (!VueCookies.get("elixir-cookies")) {
        this.$snackbar.open({
          duration: 20000,
          queue: false,
          message: this.$t("message.toast.cookies"),
          actionText: "OK",
          onAction: () => {
            // Set a cookie to prevent toast on subsequent visits
            VueCookies.set("elixir-cookies", "accepted", Infinity);
            this.$toast.open({
              queue: false,
              message: this.$t("message.toast.cookiesOk"),
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
    this.devToast();
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
</style>
