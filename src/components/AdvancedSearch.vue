<template>
  <div class="container content">
    <form @submit.prevent="advancedSearch" title="Advanced Search Options">
      <h2>Variant Location</h2>
      <div class="columns">
        <div class="column">
          <label class="form-label" for="assembly">Assembly</label>
          <b-select
            id="assembly"
            title="Assembly ID"
            v-model="assembly"
            expanded
          >
            <option
              v-for="asm in assemblies"
              :value="asm"
              :key="asm"
              :title="'Assembly ID ' + asm"
            >
              {{ asm }}
            </option>
          </b-select>
        </div>
        <div class="column">
          <label class="form-label" for="chromosome">Chromosome</label>
          <b-select
            title="Chromosome"
            id="chromosome"
            v-model="referenceName"
            expanded
          >
            <option
              v-for="ref in referenceNames"
              :value="ref"
              :key="ref"
              :title="'Chromosome ' + ref"
            >
              {{ ref }}
            </option>
          </b-select>
        </div>
        <div class="column">
          <fieldset>
            <legend><b>Coordinates</b></legend>
            <b-radio
              style="margin-top:15px"
              v-model="coordType"
              name="coordType"
              native-value="exact"
              >Exact</b-radio
            >
            <b-radio v-model="coordType" name="coordType" native-value="range"
              >Range</b-radio
            >
          </fieldset>
        </div>
        <div class="column">
          <label class="form-label" for="start" v-if="coordType === 'exact'"
            >Start</label
          >
          <b-input
            id="start"
            v-if="coordType === 'exact'"
            type="number"
            v-model="start"
            controls-position="compact"
            min="0"
            title="Exact start coordinate"
          ></b-input>
          <label class="form-label" for="minStart" v-if="coordType === 'range'"
            >Minimum Start</label
          >
          <b-input
            id="minStart"
            v-if="coordType === 'range'"
            type="number"
            v-model="startMin"
            controls-position="compact"
            min="0"
            title="Minimum start coordinate of range"
          ></b-input>
          <label class="form-label" for="maxStart" v-if="coordType === 'range'"
            >Maximum Start</label
          >
          <b-input
            id="maxStart"
            v-if="coordType === 'range'"
            type="number"
            v-model="startMax"
            controls-position="compact"
            min="0"
            title="Maximum start coordinate of range"
          ></b-input>
        </div>
        <div class="column">
          <label class="form-label" for="end" v-if="coordType === 'exact'"
            >End</label
          >
          <b-input
            id="end"
            v-if="coordType === 'exact'"
            type="number"
            v-model="end"
            min="0"
            title="Exact end coordinate"
          ></b-input>
          <label class="form-label" for="minEnd" v-if="coordType === 'range'"
            >Minimum End</label
          >
          <b-input
            id="minEnd"
            v-if="coordType === 'range'"
            type="number"
            v-model="endMin"
            controls-position="compact"
            min="0"
            title="Minimum end coordinate of range"
          ></b-input>
          <label class="form-label" for="maxEnd" v-if="coordType === 'range'"
            >Maximum End</label
          >
          <b-input
            id="maxEnd"
            v-if="coordType === 'range'"
            type="number"
            v-model="endMax"
            controls-position="compact"
            min="0"
            title="Maximum end coordinate of range"
          ></b-input>
        </div>
      </div>

      <h2>Variant Transformation</h2>
      <hr />
      <div class="columns">
        <div class="column">
          <label class="form-label" for="referenceBases"
            >Reference Base(s)</label
          >
          <b-input
            id="referenceBases"
            v-model="refBases"
            pattern="[ATCGN]+"
            placeholder="ATCGN"
            expanded
            title="Sequence of reference bases"
          ></b-input>
        </div>
        <div class="column">
          <label class="form-label" for="alternateBases"
            >Alternate Base(s)</label
          >
          <b-input
            id="alternateBases"
            v-model="altBases"
            v-on:input="resetVariantType"
            pattern="[ATCGN]+"
            placeholder="ATCGN"
            expanded
            title="Sequence of alternate bases"
          ></b-input>
        </div>
        <div class="column">
          <label class="form-label" for="variantType">Variant Type</label>
          <b-select
            id="variantType"
            v-model="variantType"
            v-on:input="resetAltBases"
            expanded
            title="Variant type"
          >
            <option
              v-for="vt in variantTypes"
              :value="vt"
              :key="vt"
              :title="'Variant type ' + vt"
            >
              {{ vt }}
            </option>
          </b-select>
        </div>
      </div>

      <b-message
        v-if="errorTooltip"
        type="is-danger"
        aria-close-label="Close notification"
        role="alert"
      >
        Form errors:
        <ol>
          <li v-for="err in errorMessages" :value="err" :key="err">
            {{ err }}
          </li>
        </ol>
      </b-message>

      <div class="search-footer">
        <b-button
          @click="resetForm"
          type="is-secondary"
          class="reset-button"
          title="Empty all form fields and reset the view to its initial state"
          >Reset Form</b-button
        >
        <b-button
          @click="advancedSearch"
          type="is-primary"
          class="search-button"
          id="searchButton"
          >Search</b-button
        >
      </div>
    </form>
    <div class="search-footer">
      <span id="example" v-if="$route.path === '/'">
        <b-button
          @click="exampleSearch"
          title="Insert example search parameters to the form"
          >Example range query</b-button
        ></span
      >
      <span id="basicSearch"
        ><b-button
          @click="changeSearchForm"
          title="Switch back to the basic search bar"
          >Basic Search</b-button
        ></span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "AdvancedSearch",
  data() {
    return {
      errorMessage: "",
      errorMessages: [],
      errorTooltip: false,
      coordType: "exact",
      start: 0,
      startMin: 0,
      startMax: 0,
      end: 0,
      endMin: 0,
      endMax: 0,
      assembly: "GRCh38",
      assemblies: ["GRCh38", "GRCh37", "hg19"],
      refBases: "",
      altBases: "",
      variantType: "Unspecified",
      variantTypes: [
        "Unspecified",
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
      referenceName: "1",
      referenceNames: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "X",
        "Y",
        "MT"
      ]
    };
  },
  methods: {
    changeSearchForm: function() {
      this.$emit("changeSearchForm");
    },
    validateInput: function() {
      this.errorMessage = "";
      this.errorMessages = [];
      this.errorTooltip = false;
      // Validate referenceBases field
      if (!this.refBases) {
        this.validated = false;
        this.errorMessage =
          "Reference Base(s) must be given, possible values are: A, T, C, G, N.";
        this.errorMessages.push(
          "Reference Base(s) must be given, possible values are: A, T, C, G, N."
        );
        this.errorTooltip = true;
      }
      // Validate alternateBases field if variantType is unspecified
      if (this.altBases === "" && this.variantType == "Unspecified") {
        this.errorMessage =
          "Alternate Base(s) must be given if Variant Type is unspecified, possible values are: A, T, C, G, N.";
        this.errorMessages.push(
          "Alternate Base(s) must be given if Variant Type is unspecified, possible values are: A, T, C, G, N."
        );
        this.errorTooltip = true;
      }
      // Validate exact coords
      if (this.coordType === "exact") {
        if (this.start >= this.end && this.end != 0) {
          this.errorMessage =
            "End coordinate must be greater than Start coordinate.";
          this.errorMessages.push(
            "If End coordinate is set, it must be greater than Start coordinate."
          );
          this.errorTooltip = true;
        }
      }
      // Validate range coords
      if (this.coordType === "range") {
        if (this.startMin >= this.endMin) {
          this.errorMessages.push(
            "Minimum End coordinate must be greater than Minimum Start coordinate."
          );
          this.errorTooltip = true;
        }
        if (this.startMax >= this.endMax) {
          this.errorMessages.push(
            "Maximum End coordinate must be greater than Maximum Start coordinate."
          );
          this.errorTooltip = true;
        }
      }
    },
    advancedSearch: function() {
      this.validateInput();
      if (this.errorMessages.length === 0) {
        // Base query string
        var queryObj = {
          searchType: "advanced",
          coordType: this.coordType,
          includeDatasetResponses: "HIT",
          assemblyId: this.assembly,
          referenceName: this.referenceName,
          referenceBases: this.refBases
        };
        // Handle the other params
        if (this.coordType === "exact") {
          queryObj.start = this.start > 0 ? this.start - 1 : 0;
          if (this.end != 0 && this.end > this.start)
            queryObj.end = this.end > 0 ? this.end - 1 : 0;
        }
        if (this.coordType === "range") {
          queryObj.startMin = this.startMin > 0 ? this.startMin - 1 : 0;
          queryObj.startMax = this.startMax > 0 ? this.startMax - 1 : 0;
          queryObj.endMin = this.endMin > 0 ? this.endMin - 1 : 0;
          queryObj.endMax = this.endMax > 0 ? this.endMax - 1 : 0;
        }
        if (this.altBases) {
          queryObj.alternateBases = this.altBases;
          this.variantType = "Unspecified";
        } else {
          queryObj.variantType = this.variantType;
          this.altBases = "";
        }
        // Change view to results and send GET query string
        this.$router.push(
          {
            path: "results",
            query: queryObj
          },
          undefined,
          () => {}
        );
      }
    },
    exampleSearch: function() {
      this.assemblyId = "GRCh38";
      this.referenceName = "MT";
      this.coordType = "range";
      this.startMin = 190;
      this.startMax = 200;
      this.endMin = 200;
      this.endMax = 210;
      this.refBases = "TTACTAAAGT";
      this.variantType = "MNP";
      document.getElementById("searchButton").focus();
    },
    resetAltBases: function() {
      this.altBases = "";
    },
    resetVariantType: function() {
      this.variantType = "Unspecified";
    },
    resetForm: function() {
      this.assembly = "GRCh38";
      this.referenceName = "1";
      this.coordType = "exact";
      this.start = 0;
      this.end = 0;
      this.startMin = 0;
      this.startMax = 0;
      this.endMin = 0;
      this.endMax = 0;
      this.refBases = "";
      this.altBases = "";
      this.variantType = "Unspecified";
    }
  },
  beforeMount() {
    // If user reloads page, this places the current query params from the address bar into the search form
    // Check searchType
    if (this.$route.query.searchType == "advanced") {
      // Continue to parse the object into form inputs
      this.assembly = this.$route.query.assemblyId;
      this.referenceName = this.$route.query.referenceName;
      this.coordType = this.$route.query.coordType;
      this.start = parseInt(this.$route.query.start) + 1;
      this.end = parseInt(this.$route.query.end) + 1;
      this.startMin = parseInt(this.$route.query.startMin) + 1;
      this.startMax = parseInt(this.$route.query.startMax) + 1;
      this.endMin = parseInt(this.$route.query.endMin) + 1;
      this.endMax = parseInt(this.$route.query.endMax) + 1;
      this.refBases = this.$route.query.referenceBases;
      this.altBases = this.$route.query.alternateBases;
      this.variantType = this.$route.query.variantType;
    }
    // We don't need an `else`-statement to display the BasicSearch.vue, because BasicSearch.vue
    // is always the first component to show on page refresh, which then redirects to AdvancedSearch.vue
    // else {
    //   // Default to basic search
    //   this.changeSearchForm();
    // }
  }
};
</script>

<style scoped>
span#basicSearch {
  margin-left: auto;
}
.stretch {
  width: 100%;
}
.search-footer {
  margin-top: 12px;
  font-size: 0.9em;
  display: flex;
}
.search-footer span#advancedSearch {
  margin-left: auto;
}
.search-button {
  margin-left: 10px;
}
.reset-button {
  margin-left: auto;
}
.column-top-margin {
  margin-top: 20px;
}
/* fix safari bug https://github.com/jgthms/bulma/issues/2626 */
.select select {
  text-rendering: auto !important;
}
.form-label {
  color: #363636;
  display: block;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5em;
}
</style>
