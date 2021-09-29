<template>
  <p class="org-row">
    <!-- Got data from Registry -->
    <img
      v-if="data.organization.logoUrl"
      class="logo alt-color"
      :src="data.organization.logoUrl"
      :alt="data.name + ' Logo'"
    />
    <span v-if="data.organization.name" class="name"
      >{{ data.name }} at {{ data.organization.name }}</span
    >
    <!-- Couldn't retrieve data from Registry -->
    <Alert
      v-if="!data.organization.logoUrl"
      title="Could not retrieve Beacon data from Registry"
      class="has-text-warning"
    ></Alert>
    <span v-if="!data.organization.name" class="name">{{
      $props.beaconId
    }}</span>
  </p>
</template>

<script>
import axios from "axios";
import Alert from "vue-material-design-icons/Alert.vue";

export default {
  props: ["beaconId"],
  components: {
    Alert,
  },
  data() {
    return {
      registry: process.env.VUE_APP_REGISTRY_URL,
      data: { name: "", organization: { name: "", logoUrl: "" } },
    };
  },
  watch: {
    "$route.query.query": function () {
      // Watch query string for changes in case the user makes a new
      // search while displaying results.
      this.getInfo();
    },
  },
  methods: {
    getInfo: function () {
      axios
        .get(`${this.registry}services/${this.$props.beaconId}`)
        .then((response) => {
          this.data = response.data;
        })
        .catch((error) => {
          console.log(this.$props.beaconId, error);
        });
    },
  },
  beforeMount() {
    this.getInfo();
  },
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
}
.alt-color {
  color: gray;
}
</style>
