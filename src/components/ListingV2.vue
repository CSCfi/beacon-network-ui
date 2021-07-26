<template>
  <div class="container content">
    <h2>V2 search</h2>
    <form
      @submit.prevent="advancedSearchV2"
      title="Advanced Search Options for beaconv2"
    >
      <div v-for="(row, index) in list" :key="index">
        <div class="columns">
          <div class="column">
            <label class="form-label" for="row.searchInInput">Search In</label>
            <b-select
              data-testid="inInput"
              v-model="row.searchInInput"
              v-on:input="pickSearchBySet(index)"
              expanded
            >
              <option
                data-testid="inputOption"
                v-for="(input1, index) in row.searchInInputs"
                :value="input1"
                :key="index"
              >
                {{ input1 }}
              </option>
            </b-select>
          </div>

          <div class="column">
            <label class="form-label" for="id">Search value</label>
            <b-input
              data-testid="id"
              v-if="coordType === 'exact'"
              v-model="row.searchValue"
              controls-position="compact"
              min="0"
              title="Exact start coordinate"
            ></b-input>
          </div>

          <div class="column" v-if="row.searchByInputs">
            <label class="form-label" for="searchByInputs">Search By</label>
            <b-select
              data-testid="searchByInput"
              list="searchByInputs"
              v-model="row.searchByInput"
              expanded
            >
              <option
                data-testid="byInputOption"
                v-for="input2 in row.searchByInputs"
                :value="input2"
                :key="input2"
              >
                {{ input2 }}
              </option>
            </b-select>
          </div>
          <b-button
            v-if="checkListLenght()"
            v-on:click="removeInputfield(index)"
            id="removeButton"
            >Remove</b-button
          >
        </div>
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
          @click="addRow"
          data-testid="resetButton"
          type="is-secondary"
          title="Empty all form fields and reset the view to its initial state"
          >Add more search parameters</b-button
        >
        <b-button
          @click="resetForm"
          data-testid="resetButton"
          type="is-secondary"
          class="reset-button"
          title="Empty all form fields and reset the view to its initial state"
          >Reset Form</b-button
        >
        <b-button
          @click="listingSearch"
          type="is-primary"
          class="search-button"
          id="searchButton"
          data-testid="searchTest"
          >Search</b-button
        >
      </div>
    </form>

    <div class="search-footer">
      <span id="example" v-if="$route.path === '/'">
        <b-button
          data-testid="exampleButton"
          @click="exampleSearch"
          title="Insert example search parameters to the form"
          >Example range query</b-button
        ></span
      >
      <span id="BeaconV1Search"
        ><b-button
          data-testid="beaconV1Advanced"
          @click="setV2()"
          title="Switch to the advanced search form which has more options"
          >BeaconV1 Search</b-button
        ></span
      >
      <span id="basicSearch"
        ><b-button
          data-testid="basic"
          @click="returnToPrevious()"
          title="Switch back to the basic search bar"
          >Return to previous page</b-button
        ></span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "AdvancedSearch",
  components: {},
  data() {
    return {
      list: [],
      errorMessages: [],
      errorTooltip: false,
      coordType: "exact"
    };
  },
  methods: {
    pickSearchBySet: function(index) {
      const element = this.list[index];
      if (element.searchInInput === "Individuals") {
        element.searchByInputs = ["Biosamples", "G variants", "cohorts"];
      } else if (element.searchInInput === "Biosamples") {
        element.searchByInputs = [
          "Individuals",
          "G variants",
          "Runs",
          "Variants in sample"
        ];
      } else if (element.searchInInput === "g_variants") {
        element.searchByInputs = [
          "Individuals",
          "Biosamples",
          "Variants in sample",
          "Variant interpretations"
        ];
      } else if (element.searchInInput === "Runs") {
        element.searchByInputs = ["Biosamples", "Analyses"];
      } else if (element.searchInInput === "Interactors") {
        element.searchByInputs = ["Individuals"];
      } else if (element.searchInInput === "Cohorts") {
        element.searchByInputs = ["Individuals"];
      } else if (element.searchInInput === "Variants in sample") {
        element.searchByInputs = [""];
      } else if (element.searchInInput === "Variant interpretations") {
        element.searchByInputs = [""];
      } else if (element.searchInInput === "Analyses") {
        element.searchByInputs = ["Runs", "Variants in sample"];
      }
    },
    setV2: function() {
      this.$emit("setV2");
    },
    returnToPrevious: function() {
      this.$emit("returnToPrevious");
    },
    validateInput: function() {},
    listingSearch: function() {
      var queryObj = {
        searchInInput: this.list[0].searchInInput,
        searchByInput: this.list[0].searchByInput
      };
      this.$router.push(
        {
          path: "results",
          query: queryObj
        },
        undefined,
        () => {}
      );
    },
    exampleSearch: function() {
      this.list = [];
      this.list.push({
        searchInInput: "Biosamples",
        searchInInputs: [
          "Individuals",
          "Biosamples",
          "g_variants",
          "Runs",
          "Variants in sample",
          "Variant interpretations",
          "Analyses",
          "Interactors",
          "Cohorts"
        ],
        searchValue: "10",
        searchByInput: "Individuals",
        searchByInputs: ["Pick a search value first"]
      });
      this.list.push({
        searchInInput: "G variants",
        searchInInputs: [
          "Individuals",
          "Biosamples",
          "g_variants",
          "Runs",
          "Variants in sample",
          "Variant interpretations",
          "Analyses",
          "Interactors",
          "Cohorts"
        ],
        searchValue: "10",
        searchByInput: "Biosamples",
        searchByInputs: ["Pick a search value first"]
      });
      this.pickSearchBySet(0);
      this.pickSearchBySet(1);
    },
    resetForm: function() {
      this.list.forEach(row => {
        row.searchInInput = "";
        row.searchByInput = "";
        row.searchByInputs = ["Pick a search value first"];
        row.searchValue = "0";
        row.toId = "0";
      });
    },
    addRow: function() {
      if (this.list.length < 6) {
        this.list.push({
          searchInInput: "",
          searchInInputs: [
            "individuals",
            "biosamples",
            "g_variants",
            "runs",
            "analyses",
            "interactors",
            "cohorts"
          ],
          searchValue: "0",
          toId: "0",
          searchByInput: "",
          searchByInputs: ["Pick a search value first"]
        });
      }
    },
    checkListLenght: function() {
      if (this.list.length > 1) {
        return true;
      }
      return false;
    },
    removeInputfield(index) {
      this.list.splice(index, 1);
    }
  },
  beforeMount() {
    this.addRow();
  }
};
</script>

<style scoped>
span#BeaconV1Search {
  margin-left: auto;
}
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
#removeButton {
  margin-top: 43px;
  height: 41px;
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
