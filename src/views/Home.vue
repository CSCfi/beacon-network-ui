<template>
  <div class="home">
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
      vm.$refs.resultView.queryAPI()
      // !
      // 2 clicks on "search" are required for a search to occur
      // because the results component doesn't receive
      // the queryParams on the first event
      // fix this
      // !
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

</style>
