<template>
  <div class="home">
    <BasicSearch v-on:basicSearch="searchView" />
    <BeaconResults v-bind:class="{ 'hidden' : !results }" />
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
      query: "",
      results: false
    }
  },
  methods: {
    searchView: function(value) {
      // Show component BeaconResults
      // Hide component HomeTabs
      var vm = this
      vm.query = value
      vm.results = true
      console.log(vm.query)
    }
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
