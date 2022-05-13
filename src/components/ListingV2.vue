<template>
  <div class="container content">
    <h2>Listing search</h2>
    <form @submit.prevent="listingSearch" title="Listings search">
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
          {{
            errorMessage
          }}
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
      <span class="field has-addons" id="advancedSearch">
        <p class="control">
          <b-button
            data-testid="beaconListing"
            @click="changeFormToB()"
            title="Change to listings search"
            >Basic search</b-button
          >
        </p>
        <p class="control">
          <b-button
            data-testid="advanced"
            @click="changeFormToA()"
            title="Switch to the advanced search form which has more options"
            >Advanced Search</b-button
          >
        </p>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdvancedSearch",
  components: {},
  data() {
    return {
      // input values are in a list incase if in the future a multisearch feature is added
      list: [],
      validated: false,
      errorMessage: "",
      errorTooltip: false,
    };
  },
  methods: {
    changeFormToA: function () {
      this.$emit("changeFormToA");
    },
    changeFormToB: function () {
      this.$emit("changeFormToB");
    },
    pickSearchBySet: function (index) {
      const element = this.list[index];
      if (element.searchInInput === "individuals") {
        element.searchByInputs = ["", "biosamples", "g_variants", "cohorts"];
      } else if (element.searchInInput === "biosamples") {
        element.searchByInputs = [
          "individuals",
          "g_variants",
          "runs",
          "variants in sample",
        ];
      } else if (element.searchInInput === "g_variants") {
        element.searchByInputs = [
          "",
          "individuals",
          "biosamples",
          "variants in sample",
          "variant interpretations",
        ];
      } else if (element.searchInInput === "runs") {
        element.searchByInputs = ["", "biosamples", "analyses"];
      } else if (element.searchInInput === "interactors") {
        element.searchByInputs = ["", "individuals"];
      } else if (element.searchInInput === "cohorts") {
        element.searchByInputs = ["", "individuals"];
      } else if (element.searchInInput === "analyses") {
        element.searchByInputs = ["", "runs", "variants in sample"];
      }
    },
    setV2: function () {
      this.$emit("setV2");
    },
    returnToPrevious: function () {
      this.$emit("returnToPrevious");
    },
    validateInput: function () {
      var vm = this;
      if (vm.list[0].searchInInput !== "" && vm.list[0].searchValue !== "") {
        vm.validated = true;
      } else {
        vm.validated = false;
      }
    },
    listingSearch: function () {
      var vm = this;
      vm.errorTooltip = false;
      vm.validateInput();
      if (vm.validated) {
        var queryObj = {
          searchType: "listing",
          searchInInput: this.list[0].searchInInput,
          id: this.list[0].searchValue,
          searchByInput: this.list[0].searchByInput,
        };
        if (queryObj.searchByInput == undefined) {
          queryObj.searchByInput = "";
        }
        this.$router.push(
          {
            path: "results",
            query: queryObj,
          },
          undefined,
          () => {}
        );
      } else {
        vm.errorMessage = "Search inputs are empty";
        vm.errorTooltip = true;
      }
    },
    exampleSearch: function () {
      this.list = [];
      this.list.push({
        searchInInput: "biosamples",
        searchInInputs: [
          "individuals",
          "biosamples",
          "g_variants",
          "runs",
          "analyses",
          "interactors",
          "cohorts",
        ],
        searchValue: "SAMN03283350",
        searchByInput: "individuals",
        searchByInputs: ["Pick a search value first"],
      });
      document.getElementById("searchButton").focus();
      this.pickSearchBySet(0);
    },
    resetForm: function () {
      this.removeInputfield(0);
      this.addRow();
    },
    addRow: function () {
      /* this methdod was created so search fields could be easily added.
       But the back end currently offers no support for multiple different queries 
       so this method is only used before mount*/
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
            "cohorts",
          ],
          searchValue: "0",
          toId: "0",
          searchByInput: "",
          searchByInputs: ["Pick a search value first"],
        });
      }
    },
    checkListLenght: function () {
      if (this.list.length > 1) {
        return true;
      }
      return false;
    },
    removeInputfield(index) {
      this.list.splice(index, 1);
    },
  },
  beforeMount() {
    this.addRow();
    if (this.$route.query.id != undefined) {
      this.list = [];
      this.list.push({
        searchInInput: this.$route.query.searchInInput,
        searchInInputs: [
          "individuals",
          "biosamples",
          "g_variants",
          "runs",
          "analyses",
          "interactors",
          "cohorts",
        ],
        searchValue: this.$route.query.id,
        toId: "0",
        searchByInput: this.$route.query.searchByInput,
        searchByInputs: [this.$route.query.searchByInput],
      });
    }
  },
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
