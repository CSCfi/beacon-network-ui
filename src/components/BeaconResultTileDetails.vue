<template>
  <section>
    <div class="results-section">
      <b-button
        :data-testid="beaconId"
        @click="displayResults"
        class="show-more"
        type="is-primary"
        :title="!display ? 'Show detailed response' : 'Hide detailed response'"
      >
        {{
          !display
            ? "Display " + results.length + " result(s)"
            : "Hide result(s)"
        }}
      </b-button>
      <div v-if="display" class="details-rows">
        <b-table :data="results" :striped="true" class="column details-table">
          <b-table-column label="Access">
            <template v-slot:default="results">
              <b-tag
                class="accessibility-green-tag"
                v-if="checkForPublicDatasets(results.row)"
                title="Dataset is in public access"
                ><b>Public</b></b-tag
              >
              <b-tag
                class="accessibility-yellow-tag"
                v-else-if="checkForRegisteredDatasets(results.row)"
                title="Dataset requires ELIXIR Bona Fide status to access"
                ><b>Registered</b></b-tag
              >
              <b-tag
                class="accessibility-red-tag"
                v-else-if="checkForControlledDatasets(results.row)"
                title="Dataset requires permissions from data owner to access"
                ><b>Controlled</b></b-tag
              >
              <b-tag class="access-tag" type="is-light" v-else>Unknown</b-tag>
            </template>
          </b-table-column>
          <b-table-column label="Dataset" title="Unique identifier of dataset">
            <template v-slot:default="results">
              {{ results.row.datasetId }}
              <span v-if="results.row.externalUrl"
                ><a
                  v-bind:href="results.row.externalUrl"
                  title="Link to this dataset's location"
                >
                  dataset location</a
                ></span
              >
            </template>
          </b-table-column>
          <b-table-column
            label="Variant"
            title="Reference and alternate bases of this variant"
          >
            <template v-slot:default="results">
              <span class="word-wrap">
                {{ results.row.referenceBases }} >
                {{ results.row.alternateBases }}
              </span>
            </template>
          </b-table-column>
          <b-table-column label="VT" title="Variant Type">
            <template v-slot:default="results">
              {{ results.row.variantType }}
            </template>
          </b-table-column>
          <b-table-column
            label="Region"
            title="Start and end coordinates of this variant"
          >
            <template v-slot:default="results">
              <div
                v-if="
                  results.row.referenceName &&
                  results.row.start &&
                  results.row.end
                "
              >
                {{ results.row.referenceName }}:{{ results.row.start + 1 }}-{{
                  results.row.end + 1
                }}
              </div>
              <div v-else title="Some information is missing">?</div>
            </template>
          </b-table-column>
          <b-table-column label="AC" title="Allele Count">
            <template v-slot:default="results">
              {{ results.row.variantCount ? results.row.variantCount : "" }}
            </template>
          </b-table-column>
          <b-table-column label="AF" title="Allele Frequency">
            <template v-slot:default="results">
              {{ results.row.frequency ? results.row.frequency : "" }}
            </template>
          </b-table-column>
        </b-table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["results", "beaconId"],
  data() {
    return {
      display: false,
    };
  },
  watch: {},
  methods: {
    displayResults: function () {
      if (this.display) this.display = false;
      else this.display = true;
    },
    checkForPublicDatasets: function (result) {
      if (
        result.info &&
        result.info.accessType &&
        result.info.accessType == "PUBLIC"
      )
        return true;
    },
    checkForRegisteredDatasets: function (result) {
      if (
        result.info &&
        result.info.accessType &&
        result.info.accessType == "REGISTERED"
      )
        return true;
    },
    checkForControlledDatasets: function (result) {
      if (
        result.info &&
        result.info.accessType &&
        result.info.accessType == "CONTROLLED"
      )
        return true;
    },
  },
  beforeMount() {},
};
</script>

<style scoped>
.word-wrap {
  word-break: break-all;
}
.show-more {
  display: block;
  margin: 0 auto;
  margin-right: 30px;
  margin-top: -60px;
  margin-bottom: 25px;
  /* width: 95%; */
  /* border-top: none; */
  /* border-top-left-radius: 0; */
  /* border-top-right-radius: 0; */
  /* background: rgb(224,224,224);
  background: linear-gradient(0deg, rgba(224,224,224,1) 0%, rgba(255,255,255,1) 10%);  */
  /* border-bottom: 5px solid #047eaa; */
}
/* .show-more:hover {
  background-color: #e0e0e0;
} */
.narrow-column {
  width: 15%;
}
.detail-row-vertical {
  padding-top: 5px;
  padding-bottom: 0;
}
.details-rows {
  margin: 10px 20px;
}
.details-table {
  background: rgb(247, 247, 247);
  background: linear-gradient(
    180deg,
    rgba(247, 247, 247, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  margin-top: -10px;
}
.accessibility-green-tag {
  background-color: #29852a;
  color: #fff;
}
.accessibility-yellow-tag {
  background-color: #ffcc00;
  color: #000;
}
.accessibility-red-tag {
  background-color: #e90000;
  color: #fff;
}
</style>
