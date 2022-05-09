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
      <p class="subtitle" v-if="beaconV2">Filter by</p>
      <b-field v-if="beaconV2">
        <div
          class="block"
          v-for="(filter, index) in filteringTerms"
          :key="index"
        >
          <b-table
            id="filterTable"
            :data="filter"
            :columns="columns"
            detailed
            hoverable
            detail-key="label"
            data-testid="filtersTest"
            @details-open="
              (row, index) => $buefy.toast.open(`Expanded ${row.label}`)
            "
            :show-detail-icon="showDetailIcon"
          >
            <template slot="detail" slot-scope="props">
              <div v-for="(value, ind) in props.row" :key="ind">
                <b-checkbox
                  v-model="filterValue"
                  :native-value="value"
                  v-if="ind == 'id'"
                >
                  {{ "id: " + value }}
                </b-checkbox>
              </div>
            </template>
          </b-table>
          <b-button
            v-on:click="filterResults(filterValue)"
            type="is-primary"
            size="is-medium"
            data-testid="filterButton"
            >Apply Filter</b-button
          >
          <p class="content"></p>
          <b-button
            v-on:click="filterValue = []"
            type="is-primary"
            size="is-medium"
            data-testid="filterResetButton"
            @details-close="
              (row, index) => $buefy.toast.close(`Expanded ${row.label}`)
            "
            >Reset filters</b-button
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
      filteringTerms: [],
      filterValue: [],
      columns: [{ field: "label" }],
      showDetailIcon: true,
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
    filterResults: function (filters) {
      var queryParamsObj = Object.assign({}, this.$route.query);
      var filterStrign = "";
      if (filters.length != 0) {
        for (var filter in filters) {
          if (filter == 0) {
            filterStrign += filters[filter];
          } else {
            filterStrign += "," + filters[filter];
          }
        }
      }
      queryParamsObj.filters = filterStrign;
      this.$router.push(
        {
          path: "results",
          query: queryParamsObj,
        },
        undefined,
        () => {}
      );
    },
    checkIfV2: function (beacon) {
      if (beacon.meta != undefined) {
        return true;
      }

      return false;
    },
    checkIfV2Inresponse: function () {
      this.response.forEach((response) => {
        if (response.meta != undefined) {
          console.log("here");
          return true;
        }
      });
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
    queryAPI: function () {
      var vm = this;
      vm.response = []; // Clear table
      vm.filterValue = [];
      vm.filteringTerms = [];
      if (process.env.VUE_APP_DEVELOPMENT) {
        var wss = vm.aggregator.replace("http", "ws"); // change aggregator http url to ws
      } else {
        var wss = vm.aggregator.replace("https", "wss"); // change aggregator https url to wss
      }

      // Query params parsing from string https://stackoverflow.com/a/6566471/8166034
      // Copy the query object and remove the unwanted keys, so that we can use
      // the pristine query object in BasicSearch and AdvancedSearch
      var queryParamsObj = Object.assign({}, this.$route.query);
      // Remove the `searchType` and `coordType` keys, which are not sent to Beacons
      delete queryParamsObj.searchType;
      delete queryParamsObj.coordType;
      var queryParamsString = "";
      for (var key in queryParamsObj) {
        if (queryParamsString != "") {
          queryParamsString += "&";
        }
        queryParamsString +=
          key + "=" + encodeURIComponent(queryParamsObj[key]);
      }
      queryParamsString += "&filters=filter";
      // Create websocket
      var websocket = new WebSocket(`${wss}query?${queryParamsString}`);
      websocket.onopen = function () {
        // The connection was opened
        vm.isLoading = true;
      };
      websocket.onclose = function () {
        // The connection was closed
        vm.isLoading = false;
        vm.checkResponse();
      };
      websocket.onmessage = function (event) {
        // New message arrived
        // check if a beacon with the same id exists already
        // prevent results appearing 2 times.
        // this can occur when aggregators query the same beacons
        if (JSON.parse(event.data) != null) {
          //checks if response is filteringTerms or not
          if (JSON.parse(event.data).filteringTerms != undefined) {
            if (vm.filteringTerms.length == 0) {
              vm.filteringTerms.push(JSON.parse(event.data).filteringTerms);
            } else {
              // check if filtering term exists and add ids to it
              JSON.parse(event.data).filteringTerms.forEach((newObject) => {
                var exists = false;
                vm.filteringTerms.forEach((object) => {
                  if (object.label == newObject.label) {
                    object.id.push(newObject.id);
                    exists = true;
                  }
                });
                if (!exists) {
                  vm.filteringTerms.push(newObject);
                }
              });
            }
          } else {
            if (JSON.parse(event.data).meta != undefined) {
              vm.beaconV2 = true;
            }
            const found = vm.response.some((resp) => {
              if (JSON.parse(event.data).meta == undefined) {
                resp.beaconId == JSON.parse(event.data).beaconId;
              } else {
                resp.beaconId == JSON.parse(event.data).meta.beaconId;
              }
            });
            // checks if filter result and adds to filteringTerms

            var nobeaconid = vm.getErrorBeaconId(JSON.parse(event.data));

            const found_nobeaconid = vm.response.some((resp) => {
              if (nobeaconid.meta == undefined) {
                resp.beaconId === nobeaconid.beaconId;
              } else {
                resp.beaconId === nobeaconid.meta.beaconId;
              }
            });
            if (!found && !found_nobeaconid) vm.response.push(nobeaconid);
          }
        }
      };
      websocket.onerror = function () {
        // There was an error with your WebSocket
        vm.isLoading = false;
        vm.checkResponse();
      };
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
  /* commented to avoid switches going over filters
  might be useful in the future with more search results
  position: sticky; */
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
