<template>
  <div class="container content">
    <form @submit.prevent="advancedSearch" title="Advanced Search Options">
      <div>
        <component :is="compVL" v-bind:isBeaconV2="false" ref="VL"></component>
        <hr />
        <component :is="compVT" v-bind:isBeaconV2="false" ref="VT"></component>
      </div>
      <b-message
        data-testid="errorMessage"
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
          data-testid="resetButton"
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
          data-testid="searchTest"
          >Search</b-button
        >
      </div>
    </form>
    <div class="searchbar-footer">
      <span id="example" v-if="$route.path === '/'">
        <b-button
          data-testid="exampleButton"
          @click="exampleSearch"
          title="Insert example search parameters to the form"
          >Example range query</b-button
        ></span
      >

      <span id="basicSearch"
        ><b-button
          data-testid="basic"
          @click="changeSearchForm"
          title="Switch back to the basic search bar"
          >Basic Search</b-button
        ></span
      >
    </div>
  </div>
</template>

<script>
import VariantLocation from "./searchComponents/VariantLocation.vue";
import VariantTransformation from "./searchComponents/VariantTransformation.vue";
export default {
  name: "AdvancedSearch",
  components: {
    VariantLocation,
    VariantTransformation,
  },
  data() {
    return {
      compVL: VariantLocation,
      compVT: VariantTransformation,
      errorMessages: [],
      errorTooltip: false,
    };
  },
  methods: {
    changeSearchForm: function () {
      this.$emit("changeFormToB");
    },
    validateInput: function () {
      this.errorMessages = [];
      this.errorTooltip = false;
      // Validate referenceBases field
      if (!this.$refs.VT.refBases) {
        this.validated = false;
        this.errorMessages.push(
          "Reference Base(s) must be given, possible values are: A, T, C, G, N."
        );
        this.errorTooltip = true;
      }
      // Validate alternateBases field if variantType is unspecified
      if (
        this.$refs.VT.altBases === "" &&
        this.$refs.VT.variantType == "Unspecified"
      ) {
        this.errorMessages.push(
          "Alternate Base(s) must be given if Variant Type is unspecified, possible values are: A, T, C, G, N."
        );
        this.errorTooltip = true;
      }
      // Validate exact coords
      if (this.$refs.VL.coordType === "exact") {
        if (
          parseInt(this.$refs.VL.start) >= parseInt(this.$refs.VL.end) &&
          parseInt(this.$refs.VL.end) != 0
        ) {
          this.errorMessages.push(
            "If End coordinate is set, it must be greater than Start coordinate."
          );
          this.errorTooltip = true;
        }
      }
      // Validate range coords
      if (this.$refs.VL.coordType === "range") {
        if (
          parseInt(this.$refs.VL.startMin) >= parseInt(this.$refs.VL.endMin)
        ) {
          this.errorMessages.push(
            "Minimum End coordinate must be greater than Minimum Start coordinate."
          );
          this.errorTooltip = true;
        }
        if (
          parseInt(this.$refs.VL.startMin) >= parseInt(this.$refs.VL.startMax)
        ) {
          this.errorMessages.push(
            "Maximum Start coordinate must be greater than Minimum Start coordinate."
          );
          this.errorTooltip = true;
        }
        if (
          parseInt(this.$refs.VL.startMax) >= parseInt(this.$refs.VL.endMax)
        ) {
          this.errorMessages.push(
            "Maximum End coordinate must be greater than Maximum Start coordinate."
          );
          this.errorTooltip = true;
        }
        if (parseInt(this.$refs.VL.endMin) >= parseInt(this.$refs.VL.endMax)) {
          this.errorMessages.push(
            "Maximum End coordinate must be greater than Minimum End coordinate."
          );
          this.errorTooltip = true;
        }
      }
    },
    advancedSearch: function () {
      this.validateInput();
      if (this.errorMessages.length === 0) {
        // Base query string
        var queryObj = {
          searchType: "advanced",
          coordType: this.$refs.VL.coordType,
          includeDatasetResponses: "HIT",
          assemblyId: this.$refs.VL.assembly,
          referenceName: this.$refs.VL.referenceName,
          referenceBases: this.$refs.VT.refBases,
        };
        // Handle the other params
        if (this.$refs.VL.coordType === "exact") {
          queryObj.start =
            this.$refs.VL.start > 0 ? this.$refs.VL.start - 1 : 0;
          if (this.$refs.VL.end != 0 && this.$refs.VL.end > this.$refs.VL.start)
            queryObj.end = this.$refs.VL.end > 0 ? this.$refs.VL.end - 1 : 0;
        }
        if (this.$refs.VL.coordType === "range") {
          queryObj.startMin =
            this.$refs.VL.startMin > 0 ? this.$refs.VL.startMin - 1 : 0;
          queryObj.startMax =
            this.$refs.VL.startMax > 0 ? this.$refs.VL.startMax - 1 : 0;
          queryObj.endMin =
            this.$refs.VL.endMin > 0 ? this.$refs.VL.endMin - 1 : 0;
          queryObj.endMax =
            this.$refs.VL.endMax > 0 ? this.$refs.VL.endMax - 1 : 0;
        }
        if (this.$refs.VT.altBases) {
          queryObj.alternateBases = this.$refs.VT.altBases;
          this.$refs.VT.variantType = "Unspecified";
        } else {
          queryObj.variantType = this.$refs.VT.variantType;
          this.$refs.VT.altBases = "";
        }
        // Change view to results and send GET query string
        this.$router.push(
          {
            path: "results",
            query: queryObj,
          },
          undefined,
          () => {}
        );
      }
    },
    exampleSearch: function () {
      this.$refs.VL.exampleSearch();
      this.$refs.VT.exampleSearch();
      document.getElementById("searchButton").focus();
    },

    resetForm: function () {
      this.$refs.VL.resetForm();
      this.$refs.VT.resetForm();
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 1025px) {
  .searchbar-footer {
    display: flex;
  }
  .searchbar-footer span#BeaconV2Search {
    margin-left: auto;
  }
  .searchbar-footer span#basicSearch {
    margin-top: 5px;
    margin-left: auto;
  }
}
@media screen and (max-width: 1024px) {
  .searchbar-footer {
    display: flex;
    flex-flow: column;
  }
  #basicSearch {
    order: 1;
  }
  #Listingfour {
    order: 2;
  }
  #example {
    order: 3;
  }
}
.stretch {
  width: 100%;
}
.search-footer {
  margin-top: 10px;
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
