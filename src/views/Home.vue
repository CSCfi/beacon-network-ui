<template>
  <div class="home">
    <div class="loggedStatus">
      <b-taglist>
        <b-tag v-if="getCookie('logged_in')" type="is-info">Logged In</b-tag>
        <b-tag v-if="getCookie('bona_fide')" type="is-info">Bona Fide</b-tag>
      </b-taglist>
    </div>
    <BasicSearch v-on:basicSearch="searchView" />
    <BeaconResults ref="resultView" :queryParams="queryParams" v-bind:class="{ 'hidden' : !results }" />
    <HomeTabs v-bind:class="{ 'hidden' : results }" />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import BasicSearch from "@/components/BasicSearch.vue";
import BeaconResults from "@/components/BeaconResults.vue";
import HomeTabs from "@/components/HomeTabs.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "home",
  components: {
    BasicSearch,
    BeaconResults,
    HomeTabs,
    Footer
  },
  data() {
    return {
      queryParams: {},
      results: false
    }
  },
  methods: {
    searchView: function(value) {
      // Show component BeaconResults
      // Hide component HomeTabs
      var vm = this
      vm.queryParams = value
      vm.results = true
      vm.$refs.resultView.queryAPI(vm.queryParams)
    },
    devToast: function() {
      this.$snackbar.open({
        duration: 10000,
        message: 'This web page is under development and may exhibit funky behaviour.',
        actionText: 'Cool',
        onAction: () => {
          this.$toast.open({
            message: 'Thanks for understanding!',
            position: 'is-bottom-right'
          })
        }
      })
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
