<template>
  <section class="container columns results-table">
    <div class="column is-one-fifth">
      <h6 class="subtitle">Filter results</h6>
      <b-field grouped group-multiline class="filtered">
        <div class="field">
          <b-switch v-model="hits">Hits Only</b-switch>
        </div>
        <div class="field">
          <b-switch v-model="pub" disabled>Public</b-switch>
        </div>
        <div class="field">
          <b-switch v-model="registered" disabled>Registered</b-switch>
        </div>
        <div class="field">
          <b-switch v-model="controlled" disabled>Controlled</b-switch>
        </div>
      </b-field>
    </div>

    <b-table
      focusable
      hoverable
      :selected.sync="selected"
      :data="response"
      :hits="hits"
      :loading="isLoading"
      :striped="isStriped"
      default-sort="beaconId"
      :default-sort-direction="defaultSortDirection"
      class="column"
    >
      <template slot-scope="props" v-if="props.row.exists || !hits">
        <b-table-column
          class="beacon-name"
          field="beaconId"
          label="Beacon Organisation"
          sortable
        >
          <BeaconResultsRow
            :key="props.row.beaconId"
            v-bind:beaconId="props.row.beaconId"
          >
          </BeaconResultsRow>
        </b-table-column>

        <b-table-column field="access" label="Dataset Access">
          <CheckboxBlankCircleIcon
            v-if="props.row.datasetAlleleResponses.some(checkForPublicDatasets)"
            title="Public"
            class="has-text-success"
          ></CheckboxBlankCircleIcon>
          <CheckboxBlankCircleIcon
            v-if="
              props.row.datasetAlleleResponses.some(checkForRegisteredDatasets)
            "
            title="Registered"
            class="has-text-warning"
          ></CheckboxBlankCircleIcon>
          <CheckboxBlankCircleIcon
            v-if="
              props.row.datasetAlleleResponses.some(checkForControlledDatasets)
            "
            title="Controlled"
            class="has-text-danger"
          ></CheckboxBlankCircleIcon>
        </b-table-column>

        <b-table-column field="length" label="Variants Found" sortable numeric>
          {{ props.row.datasetAlleleResponses.length }}
        </b-table-column>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="emoticon-sad" size="is-large"> </b-icon>
            </p>
            <p>No results found.</p>
          </div>
        </section>
      </template>
    </b-table>
  </section>
</template>

<script>
import BeaconResultsRow from "@/components/BeaconResultsRow.vue";
import CheckboxBlankCircleIcon from "vue-material-design-icons/CheckboxBlankCircle.vue";

export default {
  components: {
    BeaconResultsRow,
    CheckboxBlankCircleIcon
  },
  data() {
    return {
      queryParams: undefined,
      hits: true,
      pub: true,
      registered: true,
      controlled: true,
      isLoading: false,
      isStriped: true,
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
      aggregator: process.env.VUE_APP_AGGREGATOR_URL,
      defaultSortDirection: "asc",
      selected: undefined
    };
  },
  watch: {
    "$route.query.query": function() {
      // Watch query string for changes in case the user makes a new
      // search while displaying results.
      this.parseQuery();
      this.queryAPI();
    }
  },
  methods: {
    queryAPI: function() {
      var vm = this;
      var queryString = vm.constructQueryString();
      // console.log(queryString)
      vm.response = []; // Clear table
      var wss = vm.aggregator.replace("https", "wss"); // change aggregator https url to wss
      var websocket = new WebSocket(`${wss}query?${queryString}`);

      websocket.onopen = function() {
        // The connection was opened
        vm.isLoading = true;
        // console.log('websocket opened');
      };
      websocket.onclose = function() {
        // The connection was closed
        vm.isLoading = false;
        // console.log('websocket closed');
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
      };
    },
    constructQueryString: function() {
      var vm = this;
      var baseString = `assemblyId=${
        vm.queryParams["assemblyId"]
      }&referenceName=${vm.queryParams["referenceName"]}\
&referenceBases=${vm.queryParams["referenceBases"]}&startMin=${
        vm.queryParams["startMin"]
      }\
&startMax=${vm.queryParams["startMax"]}&includeDatasetResponses=HIT`;
      if ("alternateBases" in vm.queryParams) {
        baseString =
          baseString + `&alternateBases=${vm.queryParams["alternateBases"]}`;
      } else if ("variantType" in vm.queryParams) {
        baseString =
          baseString + `&variantType=${vm.queryParams["variantType"]}`;
      } else {
        console.log("Malformed query string.");
      }
      return baseString;
    },
    parseQuery: function() {
      var vm = this;
      var q = vm.$route.query.query.split(" ");
      var queryParams = {
        assemblyId: vm.$route.query.assembly,
        referenceName: q[0],
        startMin: q[2] > 0 ? q[2] - 1 : 0,
        startMax: q[2],
        referenceBases: q[3]
      };

      if (vm.variantTypes.includes(q[5])) {
        // q[5] is a variantType
        queryParams["variantType"] = q[5];
      } else {
        // q[5] is an alternateBases
        queryParams["alternateBases"] = q[5];
      }

      vm.queryParams = queryParams;
    },
    checkForPublicDatasets: function(result) {
      if (result.info.accessType == "PUBLIC") return true;
    },
    checkForRegisteredDatasets: function(result) {
      if (result.info.accessType == "REGISTERED") return true;
    },
    checkForControlledDatasets: function(result) {
      if (result.info.accessType == "CONTROLLED") return true;
    }
  },
  beforeMount() {
    this.parseQuery();
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
  padding-top: 28px;
}
.column.is-one-fifth > .subtitle {
  padding: 0 0 5px 5px;
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
.beacon-name {
  width: 70%;
}
</style>
