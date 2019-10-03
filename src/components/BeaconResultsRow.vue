<template>
  <section class="org-row">
    <img
      class="logo"
      :src="data.organization.logoUrl"
      alt="Organization image"
    />
    <span class="name">{{ data.name }} at {{ data.organization.name }}</span>
  </section>
</template>

<script>
import axios from "axios";

export default {
  props: ["beaconId"],
  data: function() {
    return {
      registry: process.env.VUE_APP_REGISTRY_URL,
      data: { organization: {} }
    };
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
