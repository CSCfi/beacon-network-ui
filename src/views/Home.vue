<template>
  <div class="home">
    <div class="loggedStatus">
      <b-taglist>
        <b-tag v-if="getCookie('logged_in')" type="is-info">Logged In</b-tag>
        <b-tag v-if="getCookie('bona_fide')" type="is-info">Bona Fide</b-tag>
      </b-taglist>
    </div>
    <BasicSearch />
    <router-view />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import BasicSearch from "@/components/BasicSearch.vue";
import Footer from "@/components/Footer.vue";
import VueCookies from 'vue-cookies'

export default {
  name: "home",
  components: {
    BasicSearch,
    Footer
  },
  data() {
    return {
      queryParams: {},
      results: false
    }
  },
  methods: {
    devToast: function() {
      this.$snackbar.open({
        duration: 20000,
        queue: false,
        message: 'This web page is under development and may exhibit funky behaviour.',
        actionText: 'Cool',
        onAction: () => {
          this.$toast.open({
            queue: false,
            message: 'Thanks for understanding!',
            position: 'is-bottom-right'
          })
        }
      })
    },
    cookieToast: function() {
      // Check if cookies have been accepted, if not, show toast regarding cookies
      if (!VueCookies.get('elixir-cookies')) {
        this.$snackbar.open({
          duration: 20000,
          queue: false,
          message: 'Beacon Network utilises cookies. By using Beacon Network you agree to the usage of these cookies.',
          actionText: 'OK',
          onAction: () => {
            // Set a cookie to prevent toast on subsequent visits
            VueCookies.set('elixir-cookies', 'accepted', Infinity)
            this.$toast.open({
              queue: false,
              message: 'Cookies are in use!',
              position: 'is-bottom-right'
            })
          }
        })
      }
    },
    getCookie: function(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
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
    this.cookieToast()
    this.devToast()
  }
};
</script>

<style scoped>

.visible {
  display: block;
}

.hidden {
  display: none;
}

.loggedStatus {
  position: absolute;
  top: 20px;
  right: 150px;
}
</style>
