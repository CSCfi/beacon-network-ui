<template>
  <p class="org-row">
    <img class="logo" :src="data.organization.logoUrl" :alt="data.name" />
    <span class="name">{{ data.name }} at {{ data.organization.name }}</span>
  </p>
</template>

<script>
import axios from "axios";

export default {
  props: ["beaconId"],
  data() {
    return {
      registry: process.env.VUE_APP_REGISTRY_URL,
      data: { name: "", organization: { name: "", logoUrl: "" } }
    };
  },
  watch: {
    "$route.query.query": function() {
      // Watch query string for changes in case the user makes a new
      // search while displaying results.
      this.getInfo();
    }
  },
  methods: {
    getInfo: function() {
      axios
        .get(`${this.registry}services/${this.$props.beaconId}`)
        .then(response => {
          this.data = response.data;
        })
        .catch(error => {
          console.log(this.$props.beaconId, error);
        });
    }
  },
  beforeMount() {
    this.getInfo();
  }
};
</script>

<style scoped>
.org-row {
  position: relative;
}
.logo {
  height: 15px;
}
.name {
  padding: 0 0 0 10px;
  margin: 0;
  position: absolute;
  /* top: 20%; */
}
</style>
