<template>
  <div class="container" style="margin-bottom: 24px">
    <div class="searchComponents">
      <section class="searchBarField">
        <form @submit.prevent="onSubmit">
          <b-tooltip class="stretch searchbar" animated label="Search bar">
            <label for="searchBar">Search Terms</label>
            <b-input
              class="stretch searchbar"
              id="searchBar"
              data-testid="testBar"
              size="is-medium"
              type="search"
              placeholder="Type here"
              v-model="query"
              title="Variant search term"
            ></b-input>
          </b-tooltip>

          <b-message
            v-if="errorTooltip"
            type="is-danger"
            aria-close-label="Close notification"
            role="alert"
            >{{ errorMessage }}
            <router-link to="/guide" style="color: blue"
              >How to make a query?</router-link
            ></b-message
          >
        </form>
      </section>
      <div class="searchbar-footer">
        <div class="dropDownButtonGroup">
          <div class="dropDown1">
            <div>Biological species</div>
            <b-dropdown aria-role="list" v-model="biologicalOptions">
              <template #trigger="{ active }">
                <b-button
                  class="dropdownButton"
                  size="is-medium"
                  type="is-secondary"
                  :icon-right="active ? 'menu-up' : 'menu-down'"
                >
                  <p v-if="biologicalOptions.length == 0">Select</p>
                  <p v-else>{{ biologicalOptions }}</p>
                </b-button>
              </template>
              <b-dropdown-item value="Male" aria-role="listitem"
                >Male</b-dropdown-item
              >
              <b-dropdown-item value="Female" aria-role="listitem"
                >Female</b-dropdown-item
              >
            </b-dropdown>
          </div>
          <div class="dropDown">
            <div>Anatomical</div>
            <b-dropdown aria-role="list" v-model="anatomicalOptions">
              <template #trigger="{ active }">
                <b-button
                  class="dropdownButton"
                  size="is-medium"
                  type="is-secondary"
                  :icon-right="active ? 'menu-up' : 'menu-down'"
                >
                  <p v-if="anatomicalOptions.length == 0">Select</p>
                  <p v-else>{{ anatomicalOptions }}</p>
                </b-button>
              </template>
              <b-dropdown-item value="Male" aria-role="listitem"
                >Male</b-dropdown-item
              >
              <b-dropdown-item value="Female" aria-role="listitem"
                >Female</b-dropdown-item
              >
            </b-dropdown>
          </div>
          <div class="dropDown">
            <div>Sex</div>
            <b-dropdown aria-role="list" v-model="sexOptions">
              <template #trigger="{ active }">
                <b-button
                  class="dropdownButton"
                  size="is-medium"
                  type="is-secondary"
                  :icon-right="active ? 'menu-up' : 'menu-down'"
                >
                  <p v-if="sexOptions.length == 0">Select</p>
                  <p v-else>{{ sexOptions }}</p>
                </b-button>
              </template>
              <b-dropdown-item value="Male" aria-role="listitem"
                >Male</b-dropdown-item
              >
              <b-dropdown-item value="Female" aria-role="listitem"
                >Female</b-dropdown-item
              >
            </b-dropdown>
          </div>
          <div class="dropDown">
            <div>Age (years)</div>

            <component
              :is="ageSelector"
              :ageOptions="ageOptions"
              @updateAgeOptions="setAgeOptions"
              ref="ageSelector"
            ></component>
          </div>
        </div>
      </div>
      <div class="searchButtonField">
        <span>
          <b-button
            v-on:click="basicSearch()"
            type="is-primary"
            size="is-medium"
            data-testid="searchButton"
            >Search</b-button
          ></span
        >
        <span class="searchBtn">
          <b-button
            v-on:click="clearFields()"
            type="is-primary"
            size="is-medium"
            data-testid="clearButton"
            >Clear Fields
          </b-button>
        </span>
        <span class="searchBtn">
          <b-button
            v-on:click="exampleSearch()"
            type="is-primary"
            size="is-medium"
            data-testid="exampleButton"
            >Example search
          </b-button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import ageSelector from "./AgeSelector.vue";
export default {
  name: "BasicSearch",
  components: {
    ageSelector,
  },
  data() {
    return {
      ageSelector: ageSelector,
      query: "",
      validated: false,
      errorMessage: "",
      errorTooltip: false,
      sexOptions: [],
      ageOptions: [],
      anatomicalOptions: [],
      biologicalOptions: [],
    };
  },
  methods: {
    clearFields: function () {
      this.query = "";
      this.sexOptions = [];
      this.ageOptions = [];
      this.biologicalOptions = [];
      this.anatomicalOptions = [];
      this.$refs.ageSelector.clearAgeForm();
    },
    setAgeOptions: function (ageOptionsArray) {
      this.ageOptions = ageOptionsArray;
    },
    changeFormToA: function () {
      this.$emit("changeFormToA");
    },
    onSubmit: function () {
      // onSubmit is called when user inputs ENTER on search bar
      // proxy the event to the basicSearch function
      var vm = this;
      vm.basicSearch();
    },
    basicSearch: function () {
      // basicSearch is called when user clicks search button
      var vm = this;
      vm.errorTooltip = false;
      // Validate user input with regex
      vm.validateInput();
      if (vm.validated) {
        // Query string
        var queryObj = {};
        queryObj.searchType = "basic";
        queryObj.assemblyId = vm.assembly;
        queryObj = Object.assign(queryObj, vm.buildQueryObj());
        // Change view to results and send GET query string
        console.log(queryObj);
        this.$router.push(
          {
            path: "results",
            query: queryObj,
          },
          undefined,
          () => {}
        );
      } else {
        vm.errorMessage = "Search term is malformed, please try again.";
        vm.errorTooltip = true;
      }
    },
    exampleSearch: function () {
      var vm = this;
      vm.query = "test";
      this.sexOptions = "Male";

      this.biologicalOptions = "test";
      this.anatomicalOptions = "test";
      this.$refs.ageSelector.setAgeOpt();
      document.getElementById("searchBar").focus();
      this.ageOptions = ["<", "3"];
    },
    buildQueryObj: function () {
      var vm = this;

      var queryObj = {
        searchTerm: vm.query,
        biologicalSpecies: vm.biologicalOptions,
        anatomicalSite: vm.anatomicalOptions,
        sex: vm.sexOptions,
        age: vm.ageOptions,
      };

      return queryObj;
    },
    validateInput: function () {
      var vm = this;

      vm.validated = true;
    },
  },
  beforeMount() {
    // If user reloads page, this places the current query params from the address bar into the search bar
    // Check searchType
    if (this.$route.query.searchType == "basic") {
      // Continue to parse the object into a string
      this.query = `${this.$route.query.referenceName} : ${
        parseInt(this.$route.query.start, 10) + 1
      } ${this.$route.query.referenceBases} > ${
        this.$route.query.alternateBases
      }`;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  font-size: 2em;
}
/* section {
  margin-top: 100px;
} */
.stretch {
  width: 182.426%;
}
.searchbar-footer {
  margin-top: 10px;
  font-size: 0.9em;
  display: flex;
}
.searchComponents {
  display: flex;
  flex-flow: column wrap;
}
.dropDown {
  display: inline-block;
  padding-left: 20px;
}
.dropDown1 {
  display: inline-block;
}
.dropdownButton {
  width: 188px;
}

@media screen and (min-width: 1025px) {
  .searchbar-footer span#advancedSearch {
  }
}

@media screen and (max-width: 1024px) {
  .searchbar-footer {
    display: flex;
    flex-flow: column;
  }
  #advancedSearch {
    order: 1;
  }
  #example {
    order: 2;
  }
}
.searchBar {
  display: flex;
  border-radius: 0;
}
.searchBarField {
  display: flex;
  padding-top: 20px;
}
/* fix safari bug https://github.com/jgthms/bulma/issues/2626 */
select {
  text-rendering: auto !important;
}
.searchButtonField {
  display: flex;
  padding-top: 20px;
  padding-bottom: 30px;
}
.searchBtn {
  padding-left: 30px;
}
.button.is-primary {
  background-color: crimson;
}
.button.is-primary:hover {
  background-color: rgb(171, 0, 0);
  border-color: #000000;
  border-width: 2px;
}
.dropDownButtonGroup {
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  color: aliceblue;
}
</style>
