<template>
  <div class="home">
    <BasicSearch />
    <BeaconResults class="visible" />
    <HomeTabs class="visible" />
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
  methods: {
    logoButton: function () {
      
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
