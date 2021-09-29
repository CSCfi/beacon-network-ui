<template>
  <section v-on:load="queryAPI" title="List of connected Beacons">
    <div
      class="tile is-ancestor container"
      style="margin: auto"
      v-for="beacon_pair in beacons"
      v-bind:key="beacons.indexOf(beacon_pair)"
    >
      <ConnectedBeaconTile
        :title="beacon.name"
        v-for="beacon in beacon_pair"
        v-bind:key="beacon.url"
        v-bind:beacon="beacon"
      ></ConnectedBeaconTile>
    </div>
    <div class="tile is-ancestor" style="text-align: center" v-if="error">
      <p style="margin: auto">
        {{ error }}
      </p>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import ConnectedBeaconTile from "@/components/ConnectedBeaconTile.vue";

export default {
  components: {
    ConnectedBeaconTile,
  },
  data() {
    return {
      beacons: [],
      error: "",
      registry: process.env.VUE_APP_REGISTRY_URL,
    };
  },
  methods: {
    queryAPI: function () {
      var vm = this;
      vm.beacons = []; // Clear view

      var url = `${vm.registry}services?type=beacon`;

      axios
        .get(url)
        .then((response) => {
          let beacon_list = [];
          // Re-order as pairs, to make two column tiling with Vue possible
          for (let i = 0; i < response.data.length; i += 2) {
            beacon_list.push(response.data.slice(i, i + 2));
          }
          this.beacons = beacon_list;
        })
        .catch((error) => {
          this.error = "Could not find any Beacons to display.";
          console.log(error);
        });
    },
  },
  beforeMount() {
    this.queryAPI();
  },
};
</script>

<style scoped></style>
