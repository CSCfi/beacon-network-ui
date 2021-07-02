<template>
  <section v-on:load="queryAPI" title="List of beacons and their datasets">
    <h1>Datasets</h1>

    <li
      v-on:click="setDisplay(beacon)"
      v-for="beacon in beaconsAndDataSets"
      :key="beacon.id"
    >
      <a> data-testid="beaconButton" {{ beacon.beaconName }}</a>
      <ul v-if="beacon.active">
        <li class="indented" v-for="dataset in beacon.datasets" :key="dataset">
          {{ dataset }}
        </li>
      </ul>
    </li>

    <div class="tile is-ancestor" style="text-align:center" v-if="error">
      <p style="margin:auto">
        {{ error }}
      </p>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      beacons: [],
      beaconsAndDataSets: [],
      error: "",
      registry: process.env.VUE_APP_REGISTRY_URL,
      active: false
    };
  },
  methods: {
    queryBeaconAPI: async function() {
      var vm = this;

      for (const beacon of vm.beacons) {
        const beaconData = {
          beaconName: beacon.name,
          datasets: [],
          active: false
        };
        axios
          .get(beacon.url)
          .then(response => {
            const datasets = [];
            for (const data of response.data.datasets) {
              datasets.push(data.id);
            }
            beaconData.datasets = datasets;
          })
          .catch(error => {
            beaconData.datasets = ["Unable to connect"];
          });
        vm.beaconsAndDataSets.push(beaconData);
      }
    },
    queryAPI: function() {
      var vm = this;
      vm.beacons = []; // Clear view
      var url = `${vm.registry}services?type=beacon`;
      console.log(url);
      axios
        .get(url)
        .then(response => {
          console.log(response);
          for (const data of response.data) {
            vm.beacons.push(data);
          }
          vm.queryBeaconAPI();
        })
        .catch(error => {});
    },
    setDisplay(beacon) {
      beacon.active = !beacon.active;
    }
  },
  beforeMount() {
    this.queryAPI();
  }
};
</script>
<style>
.indented {
  font-size: 14px;
  margin-left: 40px;
  list-style-type: circle;
}
h1 {
  font-size: 150%;
}
</style>
