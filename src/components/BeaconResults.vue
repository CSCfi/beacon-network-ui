<template>
  <section class="container columns results-table">
    <div class="column is-one-fifth">
      <h6 class="subtitle">Filter results</h6>
      <b-field grouped group-multiline class="filtered">
        <div class="field">
          <b-switch v-model="hits">Hits Only</b-switch>
        </div>
      </b-field>
    </div>

    <b-table
      focusable
      hoverable
      detailed
      :has-detailed-visible="hasDetailedVisible"
      :row-class="rowClassVisibleOrHidden"
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
          class="beacon-name hide-long-name"
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

        <b-table-column
          field="access"
          label="Dataset Access"
          class="narrow-column"
        >
          <CheckboxBlankCircleIcon
            v-if="
              props.row.datasetAlleleResponses &&
                props.row.datasetAlleleResponses.some(checkForPublicDatasets)
            "
            title="Public"
            class="has-text-success"
          ></CheckboxBlankCircleIcon>
          <CheckboxBlankCircleIcon
            v-if="
              props.row.datasetAlleleResponses &&
                props.row.datasetAlleleResponses.some(
                  checkForRegisteredDatasets
                )
            "
            title="Registered"
            class="has-text-warning"
          ></CheckboxBlankCircleIcon>
          <CheckboxBlankCircleIcon
            v-if="
              props.row.datasetAlleleResponses &&
                props.row.datasetAlleleResponses.some(
                  checkForControlledDatasets
                )
            "
            title="Controlled"
            class="has-text-danger"
          ></CheckboxBlankCircleIcon>
        </b-table-column>

        <b-table-column
          field="length"
          label="Variants Found"
          class="narrow-column"
          :custom-sort="sortNumbers"
          sortable
          numeric
        >
          {{
            props.row.datasetAlleleResponses
              ? props.row.datasetAlleleResponses.length
              : 0
          }}
        </b-table-column>
      </template>

      <template slot="detail" slot-scope="props" v-if="props.row.exists">
        <div class="columns" id="detail-row-head">
          <div class="column narrow-column">
            <b>Access</b>
          </div>
          <div class="column is-half">
            <b>Dataset ID</b>
          </div>
          <div class="column is-one-quarter">
            <b>Allele Count</b>
          </div>
          <div class="column is-one-quarter">
            <b>Frequency</b>
          </div>
        </div>
        <div
          v-for="resp in props.row.datasetAlleleResponses"
          :key="resp.datasetId"
          class="detail-row columns"
        >
          <div class="column detail-row-vertical">
            <b-tag
              class="access-tag"
              type="is-success"
              v-if="checkForPublicDatasets(resp)"
              >Public</b-tag
            >
            <b-tag
              class="access-tag"
              type="is-warning"
              v-else-if="checkForRegisteredDatasets(resp)"
              >Registered</b-tag
            >
            <b-tag
              class="access-tag"
              type="is-danger"
              v-else-if="checkForControlledDatasets(resp)"
              >Controlled</b-tag
            >
            <b-tag class="access-tag" type="is-light" v-else>Unknown</b-tag>
          </div>
          <div class="column is-half detail-row-vertical hide-long-name">
            {{ resp.datasetId }}
            <span v-if="resp.externalUrl"
              ><a v-bind:href="resp.externalUrl"> url</a></span
            >
          </div>
          <div class="column is-one-quarter detail-row-vertical">
            {{ resp.variantCount ? resp.variantCount : "n/a" }}
          </div>
          <div class="column is-one-quarter detail-row-vertical">
            {{ resp.frequency ? resp.frequency : "n/a" }}
          </div>
        </div>
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
    sortNumbers(a, b, isAsc) {
      console.log(a, b);
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
&referenceBases=${vm.queryParams["referenceBases"]}&start=${
        vm.queryParams["start"]
      }\
&includeDatasetResponses=HIT`;
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
        start: q[2],
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
      if (
        result.info &&
        result.info.accessType &&
        result.info.accessType == "PUBLIC"
      )
        return true;
    },
    checkForRegisteredDatasets: function(result) {
      if (
        result.info &&
        result.info.accessType &&
        result.info.accessType == "REGISTERED"
      )
        return true;
    },
    checkForControlledDatasets: function(result) {
      if (
        result.info &&
        result.info.accessType &&
        result.info.accessType == "CONTROLLED"
      )
        return true;
    },
    hasDetailedVisible: function(data) {
      if (data.exists) return true;
      else return false;
    },
    rowClassVisibleOrHidden: function(row) {
      if (row.exists) return "is-visible";
      else return "is-hidden";
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
.narrow-column {
  width: 15%;
}
.detail-row-vertical {
  padding-top: 5px;
  padding-bottom: 0;
}

.hide-long-name {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
