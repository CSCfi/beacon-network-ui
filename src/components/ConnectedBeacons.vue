<template>
    <section v-on:load="queryAPI">

      <div v-if="beacons">
        <div v-for="beacon in beacons">
          <ConnectedBeaconTile v-bind:key="beacon.url" v-bind:beacon="beacon"
          ></ConnectedBeaconTile>
        </div>
      </div>

      <div v-if="error">
        {{ error }}
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
          error: ""
      }
  },
  methods: {
      queryAPI : function () {
        var vm = this;
        vm.beacons = [] // Clear view

        var url = "https://dev-registry-beacon.rahtiapp.fi/services?type=urn:ga4gh:beacon";

        axios
          .get(url)
          .then(response => {
            this.beacons = response.data
          })
          .catch(error => {
            this.error = "Could not find any Beacons to display."
            console.log(error)
          })
      },
  },
  beforeMount() {
    this.queryAPI()
  }
}
</script>

<style scoped>

</style>
