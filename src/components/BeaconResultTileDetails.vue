<template>
  <section>
    <div class="results-section">
      <b-button @click="displayResults" class="show-more" type="is-primary">
        Display {{ results.length }} result(s)
      </b-button>
      <div v-if="display" class="details-rows">
        <div class="columns">
          <div class="column narrow-column">
            <b>Access</b>
          </div>
          <div class="column is-three-fifths">
            <b>Dataset ID</b>
          </div>
          <div class="column">
            <b>Allele Count</b>
          </div>
          <div class="column">
            <b>Frequency</b>
          </div>
        </div>
        <div v-for="result in results" :key="result.datasetId" class="columns">
          <div class="column detail-row-vertical">
            <b-tag
              class="access-tag"
              type="is-success"
              v-if="checkForPublicDatasets(result)"
              >Public</b-tag
            >
            <b-tag
              class="access-tag"
              type="is-warning"
              v-else-if="checkForRegisteredDatasets(result)"
              >Registered</b-tag
            >
            <b-tag
              class="access-tag"
              type="is-danger"
              v-else-if="checkForControlledDatasets(result)"
              >Controlled</b-tag
            >
            <b-tag class="access-tag" type="is-light" v-else>Unknown</b-tag>
          </div>
          <div
            class="column is-three-fifths detail-row-vertical hide-long-name"
          >
            {{ result.datasetId }}
            <span v-if="result.externalUrl"
              ><a v-bind:href="result.externalUrl"> url</a></span
            >
          </div>
          <div class="column detail-row-vertical">
            {{ result.variantCount ? result.variantCount : "n/a" }}
          </div>
          <div class="column detail-row-vertical">
            {{ result.frequency ? result.frequency : "n/a" }}
          </div>
        </div>
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
