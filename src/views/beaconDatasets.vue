<template>
  <!-- inspired by https://bulma.io/documentation/components/panel/ -->
  <section v-on:load="queryAPI" title="List of beacons and their datasets">
    <nav class="panel">
      <p class="panel-heading">Datasets</p>
      <b class="panel-block">Search by dataset name or id</b>
      <div class="panel-block">
        <b-input
          data-testid="searchBar"
          @keydown.native.enter="searchDatasets()"
          id="searchBarDataset"
          v-model="searchValue"
          class="searchbar"
          type="search"
          placeholder="Search"
        />
      </div>
      <div class="panel-block">
        <div class="panel-block">
          <button
            data-testid="searchButton"
            type="is-primary"
            class="button is-link is-outlined is-fullwidth"
            v-on:click="searchDatasets()"
          >
            Search
          </button>
        </div>
        <div class="panel-block">
          <b-button
            class="button is-link is-outlined is-fullwidth"
            v-on:click="closeDatasets()"
            data-testid="closeButton"
          >
            Close all search results
          </b-button>
        </div>
      </div>
      <ul
        v-on:click="setDisplay(beacon)"
        v-for="beacon in beaconsAndDataSets"
        :key="beacon.id"
      >
        <a testclass="panel-block is-active" data-testid="beaconButton">
          <span v-if="!beacon.active" class="panel-icon">
            <i>+</i>
          </span>
          <span v-if="beacon.active" class="panel-icon">
            <i>-</i>
          </span>
          {{ beacon.beaconName }}
        </a>
        <ul v-if="beacon.active">
          <DatasetTile v-bind:dataset="beacon.datasets"> </DatasetTile>
        </ul>
      </ul>
    </nav>
  </section>
</template>

<script>
import axios from "axios";
import DatasetTile from "@/components/DatasetTile.vue";

export default {
  components: { DatasetTile },
  data() {
    return {
      searchValue: "",
      beacons: [],
      beaconsAndDataSets: [],
      error: "",
      registry: process.env.VUE_APP_REGISTRY_URL,
      active: false,
      columns: [
        { field: "beaconName", label: "Beacon name", searchable: true },
        { field: "name", label: "Dataset name", searchable: true },
      ],
    };
  },
  methods: {
    closeDatasets: function () {
      var vm = this;
      for (const beacon of vm.beaconsAndDataSets) {
        beacon.active = false;
      }
    },
    searchDatasets: function () {
      var vm = this;
      vm.closeDatasets();
      for (const beacon of vm.beaconsAndDataSets) {
        beacon.datasets.forEach((dataset) => {
          if (dataset.name != undefined) {
            if (
              dataset.name.toLowerCase().includes(vm.searchValue.toLowerCase())
            ) {
              beacon.active = true;
            }
          }
          if (dataset.id != undefined) {
            if (
              dataset.id.toLowerCase().includes(vm.searchValue.toLowerCase())
            ) {
              beacon.active = true;
            }
          }
        });
      }
    },
    queryBeaconAPI: async function () {
      var vm = this;

      for (const beacon of vm.beacons) {
        const beaconData = {
          beaconName: beacon.name,
          datasets: [],
          active: false,
        };
        axios
          .get(beacon.url)
          .then((response) => {
            const datasets = [];
            for (const data of response.data.datasets) {
              datasets.push(data);
            }
            if (datasets.length == 0) {
              datasets.push("No datasets");
            }
            beaconData.datasets = datasets;
          })
          .catch((error) => {
            beaconData.datasets = ["Unable to connect"];
          });
        vm.beaconsAndDataSets.push(beaconData);
      }
    },
    queryAPI: function () {
      var vm = this;
      vm.beacons = [];
      var url = `${vm.registry}services?type=beacon`;
      axios
        .get(url)
        .then((response) => {
          for (const data of response.data) {
            vm.beacons.push(data);
          }
          vm.queryBeaconAPI();
        })
        .catch((error) => {});
    },
    setDisplay(beacon) {
      beacon.active = !beacon.active;
    },
  },
  beforeMount() {
    this.queryAPI();
  },
};
</script>
<style>
.indented {
  font-size: 14px;
  margin-left: 40px;
  list-style-type: circle;
}
.panel-icon {
  margin-top: 5px;
  margin-left: 10px;
}
</style>
