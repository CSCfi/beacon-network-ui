<template>
  <section>
    <div class="results-section">
      <b-button @click="displayResults" class="show-more" type="is-primary">
        Display {{ results.length }} result(s)
      </b-button>
      <div v-if="display" class="details-rows">
        <b-table :data="results" :striped="true" class="column">
          <template slot-scope="results">
            <b-table-column label="Access">
              <b-tag
                class="access-tag"
                type="is-success"
                v-if="checkForPublicDatasets(results.row)"
                >Public</b-tag
              >
              <b-tag
                class="access-tag"
                type="is-warning"
                v-else-if="checkForRegisteredDatasets(results.row)"
                >Registered</b-tag
              >
              <b-tag
                class="access-tag"
                type="is-danger"
                v-else-if="checkForControlledDatasets(results.row)"
                >Controlled</b-tag
              >
              <b-tag class="access-tag" type="is-light" v-else>Unknown</b-tag>
            </b-table-column>
            <b-table-column label="Dataset">
              {{ results.row.datasetId }}
            </b-table-column>
            <b-table-column label="Variant">
              {{ results.row.referenceBases }} >
              {{ results.row.alternateBases }}
            </b-table-column>
            <b-table-column label="VT" title="Variant Type">
              {{ results.row.variantType }}
            </b-table-column>
            <b-table-column label="Region">
              {{ results.row.start }}-{{ results.row.end }}
            </b-table-column>
            <b-table-column label="AC" title="Allele Count">
              {{ results.row.variantCount }}
            </b-table-column>
            <b-table-column label="AF" title="Allele Frequency">
              {{ results.row.frequency }}
            </b-table-column>
          </template>
        </b-table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["results"],
  data() {
    return {
      display: false
    };
  },
  watch: {},
  methods: {
    displayResults: function() {
      if (this.display) this.display = false;
      else this.display = true;
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
    }
  },
  beforeMount() {}
};
</script>

<style scoped>
.results-section {
  /* text-align: center; */
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
.show-more:hover {
  background-color: #e0e0e0;
}
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
.hide-long-name {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
