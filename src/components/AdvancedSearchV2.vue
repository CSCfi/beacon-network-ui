<template>
  <div class="container content">
    <h2>V2 search</h2>
    <form
      @submit.prevent="advancedSearchV2"
      title="Advanced Search Options for beaconv2"
    >
      <tr v-for="(row, index) in list" :key="index">
        <div class="columns">
          <div class="column">
            <label class="form-label" for="searchInInput">Search In</label>
            {{ index }}
            <b-input
              :key="index"
              data-testid="inInput"
              list="searchInInputs"
              v-model="row.searchInInput"
              v-on:input="pickSearchBySet(row)"
            />
            <datalist id="searchInInputs">
              <option
                data-testid="inputOption"
                v-for="input1 in searchInInputs"
                :value="input1"
                :key="input1"
              >
                {{ input1 }}
              </option>
            </datalist>
          </div>

          <div class="column">
            <label class="form-label" for="id">From Id</label>
            <b-input
              data-testid="id"
              v-if="coordType === 'exact'"
              type="number"
              v-model="row.fromId"
              controls-position="compact"
              min="0"
              title="Exact start coordinate"
            ></b-input>
          </div>
          <div class="column">
            <label class="form-label" for="id">To Id</label>
            <b-input
              data-testid="id"
              v-if="coordType === 'exact'"
              type="number"
              v-model="row.toId"
              controls-position="compact"
              min="0"
              title="Exact start coordinate"
            ></b-input>
          </div>
          <div class="column">
            <label class="form-label" for="row.searchByInputs">Search By</label>
            <b-input
              data-testid="searchByInput"
              list="row.searchByInputs"
              v-model="row.searchByInput"
            ></b-input>
            <datalist id="row.searchByInputs">
              <option
                data-testid="byInputOption"
                v-for="input2 in row.searchByInputs"
                :value="input2"
                :key="input2"
                :title="'Input ID ' + input2"
              >
                {{ input2 }}
              </option>
            </datalist>
          </div>
          <div class="column">
            <label class="form-label" for="removeButton">Remove this row</label>
            <b-button
              v-if="checkListLenght"
              v-on:click="removeInputfield(index)"
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
      </tr>
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
          @click="advancedSearch"
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
  components: {},
  data() {
    return {
      list: [],
      errorMessages: [],
      errorTooltip: false,
      componentRefs: {},
      id: 0,
      coordType: "exact",
      searchInInput: "",
      searchInInputs: [
        "Individuals",
        "Biosamples",
        "G variants",
        "Runs",
        "Variants in sample",
        "Variant interpretations",
        "Analyses",
        "Interactors",
        "Cohorts"
      ],
      searchByInput: "",
      searchByInputs: [""]
    };
  },
  methods: {
    pickSearchBySet: function(row) {
      console.log(row);
      if (row.searchInInput == "Individuals") {
        row.searchByInputs = ["Biosamples", "G variants", "cohorts"];
      } else if (row.searchInInput == "Biosamples") {
        row.searchByInputs = [
          "Individuals",
          "G variants",
          "Runs",
          "Variants in sample"
        ];
      } else if (row.searchInInput == "G variants") {
        row.searchByInputs = [
          "Individuals",
          "Biosamples",
          "Variants in sample",
          "Variant interpretations"
        ];
      } else if (row.searchInInput == "Runs") {
        row.searchByInputs = ["Biosamples", "Analyses"];
      } else if (row.searchInInput == "Interactors") {
        row.searchByInputs = ["Individuals"];
      } else if (row.searchInInput == "Cohorts") {
        row.searchByInputs = ["Individuals"];
      }
      this.list.forEach(element => {});
    },
    setV2: function() {
      this.$emit("setV2");
    },
    changeSearchForm: function() {
      this.$emit("changeSearchForm");
    },
    validateInput: function() {},
    advancedSearch: function() {
      // add fucntionality when backend is implemented
      // Change view to results and send GET query string
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
      Object.keys(this.$refs).forEach(el => {
        this.$refs[el].forEach(element => {
          element.searchInInput = "Individulas";
          element.searchByInput = "Biosamples";
        });
      });
    },
    resetForm: function() {
      Object.keys(this.$refs).forEach(el => {
        this.$refs[el].forEach(element => {
          element.resetForm();
        });
      });
    },
    addRow: function() {
      this.list.push({
        searchInInput: "",
        tsearchInInputs: [],
        fromId: "0",
        toId: "0",
        searchByInput: "",
        searchByInputs: ["Pick a search value first"]
      });
    },
    checkListLenght: function() {
      console.log(this.list.length);
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
