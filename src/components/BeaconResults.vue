<template>
  <section class="container columns results-table">
    <div class="column is-one-fifth">
      <h6 class="subtitle">Filter results</h6>
      <b-field grouped group-multiline class="filtered">
        <div class="field">
          <b-switch v-model="hits" :disabled="response.length < 1"
            >Hits Only</b-switch
          >
        </div>
      </b-field>
    </div>

    <div class="column">
      <div v-if="isLoading" class="loading-indicator spinner">
        <Loading></Loading>
      </div>
      <div v-for="resp in response" :key="resp.beaconId">
        <section v-if="resp.exists">
          <BeaconResultTile
            :key="resp.beaconId"
            :exists="resp.exists"
            v-bind:beaconId="resp.beaconId"
          ></BeaconResultTile>
          <div
            v-if="
              resp.datasetAlleleResponses &&
                resp.datasetAlleleResponses.length > 0
            "
          >
            <BeaconResultTileDetails
              :key="resp.beaconId"
              v-bind:results="resp.datasetAlleleResponses"
            ></BeaconResultTileDetails>
          </div>
        </section>
        <section v-if="!resp.exists && !hits">
          <BeaconResultTile
            :key="resp.beaconId"
            :exists="resp.exists"
            v-bind:beaconId="resp.beaconId"
          ></BeaconResultTile>
        </section>
      </div>
      <div
        v-if="notFound && !isLoading"
        class="content has-text-grey has-text-centered"
      >
        <p>
          <b-icon icon="emoticon-sad" size="is-large"> </b-icon>
        </p>
        <p>No results found.</p>
      </div>
    </div>
  </section>
</template>

<script>
import BeaconResultTile from "@/components/BeaconResultTile.vue";
import BeaconResultTileDetails from "@/components/BeaconResultTileDetails.vue";
import Loading from "vue-material-design-icons/Loading.vue";

export default {
  components: {
    BeaconResultTile,
    BeaconResultTileDetails,
    Loading
  },
  data() {
    return {
      notFound: false,
      queryParams: undefined,
      hits: true,
      isLoading: false,
      response: [],
      variantTypes: [
        "DEL:ME",
        "INS:ME",
        "DUP:TANDEM",
        "DUP",
        "DEL",
        "INS",
        "INV",
        "CNV",
        "SNP",
        "MNP"
      ],
      aggregator: process.env.VUE_APP_AGGREGATOR_URL
    };
  },
  watch: {
    "$route.query": function() {
      // Watch query string for changes in case the user makes a new
      // search while displaying results.
      this.queryAPI();
    }
  },
  methods: {
    sortNumbers(a, b, isAsc) {
      // console.log(a, b);
      if (isAsc) {
        return (
          a.datasetAlleleResponses.length > b.datasetAlleleResponses.length
        );
      } else {
        return (
          a.datasetAlleleResponses.length < b.datasetAlleleResponses.length
        );
      }
    },
    queryAPI: function() {
      var vm = this;
      vm.response = []; // Clear table
      var wss = vm.aggregator.replace("https", "wss"); // change aggregator https url to wss

      // Query params parsing from string https://stackoverflow.com/a/6566471/8166034
      var queryParamsObj = this.$route.query;
      var queryParamsString = "";
      for (var key in queryParamsObj) {
        if (queryParamsString != "") {
          queryParamsString += "&";
        }
        queryParamsString +=
          key + "=" + encodeURIComponent(queryParamsObj[key]);
      }

      // Create websocket
      var websocket = new WebSocket(`${wss}query?${queryParamsString}`);

      websocket.onopen = function() {
        // The connection was opened
        vm.isLoading = true;
        // console.log('websocket opened');
      };
      websocket.onclose = function() {
        // The connection was closed
        vm.isLoading = false;
        // console.log('websocket closed');
        vm.checkResponse();
      };
      websocket.onmessage = function(event) {
        // New message arrived
        // console.log('websocket received data');
        // console.log(event.data);
        vm.response.push(JSON.parse(event.data));
      };
      websocket.onerror = function() {
        // There was an error with your WebSocket
        vm.isLoading = false;
        // console.log('websocket errored');
        vm.checkResponse();
      };
    },
    checkResponse: function() {
      // Checks if the response from aggregator contains any exists=true
      // If it doesn't, it clears the entire response array
      // This solution stems from buefy's requirements for displaying
      // an empty table template (display only if there is no data)
      if (this.response.find(resp => resp.exists === true)) {
        this.notFound = false;
        return true;
      } else {
        this.response = [];
        this.notFound = true;
      }
    }
  },
  beforeMount() {
    this.queryAPI();
  }
};
</script>

<style scoped>
.results-table {
  margin: 0 auto;
  margin-top: 50px;
}
.column.is-one-fifth {
  padding-top: 25px;
}
.column.is-one-fifth > .subtitle {
  padding: 0 0 8px 5px;
  color: black;
  border-bottom: solid 2px #7a7a7a;
  font-weight: 700;
  font-size: 16px;
}
.filtered {
  position: sticky;
  top: 20px;
}
.field {
  width: 100%;
}
.loading-indicator {
  text-align: center;
}
.spinner {
  animation: rotate 1s linear infinite;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
