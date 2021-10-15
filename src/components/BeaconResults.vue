<template>
  <section class="container columns results-table">
    <div class="column is-one-fifth">
      <p class="subtitle">Filter results</p>

      <b-field grouped group-multiline class="filtered">
        <div class="field">
          <b-switch
            data-testid="hitsButton"
            v-model="hits"
            :disabled="response.length < 1"
            title="Option to show only results and hide other responses"
            >Hits Only</b-switch
          >
        </div>

        <div class="field">
          <b-switch
            data-testid="unknownButton"
            v-model="errors"
            :disabled="response.length < 1"
            title="Option to show only results and hide other responses"
            >Show Unknown</b-switch
          >
        </div>
      </b-field>
    </div>

    <div class="column">
      <div v-if="isLoading" class="loading-indicator spinner">
        <Loading></Loading>
      </div>

      <div v-for="(resp, index) in response" :key="index">
        <!-- beaconV1 tile -->
        <section v-if="!checkIfV2(resp) && resp.exists">
          <BeaconResultTile
            :title="'Response from Beacon ' + resp.beaconId"
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
              :beaconId="resp.beaconId"
              :beaconVersion="1"
            ></BeaconResultTileDetails>
          </div>
        </section>
        <section v-if="!checkIfV2(resp) && resp.exists == false && !hits">
          <BeaconResultTile
            :key="resp.beaconId"
            :exists="resp.exists"
            v-bind:beaconId="resp.beaconId"
          ></BeaconResultTile>
        </section>
        <section v-if="!checkIfV2(resp) && resp.exists == null && errors">
          <BeaconResultTile
            :key="resp.beaconId"
            :exists="resp.exists"
            v-bind:beaconId="resp.beaconId"
          ></BeaconResultTile>
        </section>
        <!-- beaconV2 tile -->
        <section v-if="checkIfV2(resp) && resp.response.exists">
          <BeaconResultTile
            :title="'Response from Beacon ' + resp.meta.beaconId"
            :key="resp.meta.beaconId"
            :exists="resp.response.exists"
            v-bind:beaconId="resp.meta.beaconId"
          ></BeaconResultTile>
          <div
            v-if="resp.response.results && resp.response.numTotalResults > 0"
          >
            <BeaconResultTileDetailsV2
              :key="resp.meta.beaconId"
              v-bind:results="resp.response.results"
              :beaconId="resp.meta.beaconId"
              :beaconVersion="2"
            ></BeaconResultTileDetailsV2>
          </div>
        </section>
        <section
          v-if="checkIfV2(resp) && resp.response.exists == false && !hits"
        >
          <BeaconResultTile
            :key="resp.meta.beaconId"
            :exists="resp.response.exists"
            v-bind:beaconId="resp.meta.beaconId"
          ></BeaconResultTile>
        </section>
        <section
          v-if="checkIfV2(resp) && resp.response.exists == null && errors"
        >
          <BeaconResultTile
            :key="resp.meta.beaconId"
            :exists="resp.response.exists"
            v-bind:beaconId="resp.meta.beaconId"
          ></BeaconResultTile>
        </section>
      </div>

      <div
        v-if="notFound && !isLoading"
        class="content has-text-grey has-text-centered"
      >
        <p>
          <b-icon icon="emoticon-sad" size="is-large" title="No results found">
          </b-icon>
        </p>
        <p>No results found.</p>
      </div>
    </div>
  </section>
</template>

<script>
import BeaconResultTile from "@/components/BeaconResultTile.vue";
import BeaconResultTileDetails from "@/components/BeaconResultTileDetails.vue";
import BeaconResultTileDetailsV2 from "@/components/BeaconResultTileDetailsV2.vue";
import Loading from "vue-material-design-icons/Loading.vue";

export default {
  components: {
    BeaconResultTile,
    BeaconResultTileDetails,
    BeaconResultTileDetailsV2,
    Loading,
  },
  data() {
    return {
      beaconV2: false,
      notFound: false,
      queryParams: undefined,
      hits: true,
      errors: false,
      isLoading: false,
      response: [],
      services: {},
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
        "MNP",
      ],
      aggregator: process.env.VUE_APP_AGGREGATOR_URL,
      registry: process.env.VUE_APP_REGISTRY_URL,
    };
  },
  watch: {
    "$route.query": function () {
      // Watch query string for changes in case the user makes a new
      // search while displaying results.
      this.queryAPI();
    },
  },
  methods: {
    checkIfV2: function (beacon) {
      if (beacon.meta != undefined) {
        return true;
      }
      return false;
    },
    getErrorBeaconId: function (response) {
      // This function generates beaconId for errored beacon queries since these queries don't currently return the beaconId
      if (
        response.beaconId == undefined &&
        response.meta == undefined &&
        response.response == undefined
      ) {
        // Creates the beacon id from the url
        var splitUrl = response.service.split("/");
        var beaconId = splitUrl[2].split(".").reverse().join(".");
        response.beaconId = beaconId;
      }
      return response;
    },
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
    async externalRequest(url) {
      let res = await fetch(url);
      return await res.json();
    },
    async queryAPI() {
      var vm = this;
      vm.isLoading = true;
      vm.response = []; // Clear table
      // Get services from registry
      let services = await vm.externalRequest(vm.registry+"services");
      // Get datasets from services
      for (let i = 0; i < services.length; i++) {
        try {
          let serviceInfo = await this.externalRequest(services[i].url)
          for (let j = 0; j < serviceInfo.datasets.length; j++) {
            if (serviceInfo.datasets[j].id === this.$route.query.query) {
              // Send results
              let results = {
                exists: true,
                beaconId: serviceInfo.id,
                datasetAlleleResponses: [
                  {
                    datasetId: serviceInfo.datasets[j].id,
                    images: serviceInfo.datasets[j].variantCount,
                    info: {
                      accessType: "PUBLIC",
                    },
                  }
                ]
              }
              vm.response.push(results);
            }
          }
        } catch (error) {
          // console.log(error);
        }
      }
      vm.isLoading = false;
      // if (process.env.VUE_APP_DEVELOPMENT) {
      //   var wss = vm.aggregator.replace("http", "ws"); // change aggregator http url to ws
      // } else {
      //   var wss = vm.aggregator.replace("https", "wss"); // change aggregator https url to wss
      // }

      // // Query params parsing from string https://stackoverflow.com/a/6566471/8166034
      // // Copy the query object and remove the unwanted keys, so that we can use
      // // the pristine query object in BasicSearch and AdvancedSearch
      // var queryParamsObj = Object.assign({}, this.$route.query);
      // // Remove the `searchType` and `coordType` keys, which are not sent to Beacons
      // delete queryParamsObj.searchType;
      // delete queryParamsObj.coordType;
      // var queryParamsString = "";
      // for (var key in queryParamsObj) {
      //   if (queryParamsString != "") {
      //     queryParamsString += "&";
      //   }
      //   queryParamsString +=
      //     key + "=" + encodeURIComponent(queryParamsObj[key]);
      // }

      // // Create websocket
      // var websocket = new WebSocket(`${wss}query?${queryParamsString}`);
      // websocket.onopen = function () {
      //   // The connection was opened
      //   vm.isLoading = true;
      // };
      // websocket.onclose = function () {
      //   // The connection was closed
      //   vm.isLoading = false;
      //   vm.checkResponse();
      // };
      // websocket.onmessage = function (event) {
      //   // New message arrived
      //   // check if a beacon with the same id exists already
      //   // prevent results appearing 2 times.
      //   // this can occur when aggregators query the same beacons

      //   if (JSON.parse(event.data) != null) {
      //     const found = vm.response.some(
      //       (resp) => resp.beaconId == JSON.parse(event.data).beaconId
      //     );

      //     var nobeaconid = vm.getErrorBeaconId(JSON.parse(event.data));

      //     const found_nobeaconid = vm.response.some((resp) => {
      //       resp.beaconId === nobeaconid.beaconId;
      //     });
      //     if (!found && !found_nobeaconid) vm.response.push(nobeaconid);
      //   }
      // };
      // websocket.onerror = function () {
      //   // There was an error with your WebSocket
      //   vm.isLoading = false;
      //   vm.checkResponse();
      // };
    },
    checkResponse: function () {
      // Checks if the response from aggregator contains any exists=true
      // If it doesn't, it clears the entire response array
      // This solution stems from buefy's requirements for displaying
      // an empty table template (display only if there is no data)
      if (this.response.find((resp) => resp.exists === true)) {
        this.notFound = false;
        return true;
      } else if (
        this.response.find(
          (resp) => resp.response !== undefined && resp.response.exists === true
        )
      ) {
        this.notFound = false;
        return true;
      } else {
        this.response = [];
        this.notFound = true;
      }
    },
    setSearchToLocaStorage: function () {
      if (localStorage.getItem("searches") == null) {
        var searches = [];
        var currentdate = new Date();
        var hours = currentdate.getHours();
        var minutes = currentdate.getMinutes();
        var seconds = currentdate.getSeconds();

        if (hours < 10) {
          hours = "0" + hours;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        var date =
          currentdate.getFullYear() +
          "-" +
          (currentdate.getMonth() + 1) +
          "-" +
          currentdate.getDate() +
          " " +
          hours +
          ":" +
          minutes +
          ":" +
          seconds;
        var search = {
          url: window.location.href,
          date: date,
        };
        searches.push(search);
        localStorage.setItem("searches", JSON.stringify(searches));
      } else {
        var currentdate = new Date();

        var hours = currentdate.getHours();
        var minutes = currentdate.getMinutes();
        var seconds = currentdate.getSeconds();

        if (hours < 10) {
          hours = "0" + hours;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        var date =
          currentdate.getFullYear() +
          "-" +
          (currentdate.getMonth() + 1) +
          "-" +
          currentdate.getDate() +
          " " +
          hours +
          ":" +
          minutes +
          ":" +
          seconds;

        var searches = JSON.parse(localStorage.getItem("searches"));
        var search = {
          url: window.location.href,
          date: date,
        };
        searches.push(search);
        localStorage.setItem("searches", JSON.stringify(searches));
      }
    },
  },
  beforeMount() {
    this.queryAPI();
    this.setSearchToLocaStorage();
  },
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
