<template>
  <div class="container" style="margin-bottom: 24px">
    <section>
      <form @submit.prevent="onSubmit">
        <b-field>
          <b-tooltip class="stretch" animated label="Name of the gene">
            <label for="searchBar" style="display: none">Search Bar</label>
            <b-input
              id="searchBar"
              data-testid="testBar"
              class="stretch searchbar"
              size="is-medium"
              type="search"
              placeholder="Name of the gene"
              v-model="query"
              title="Gene search"
            ></b-input>
          </b-tooltip>
          <b-button
            v-on:click="geneSearch()"
            type="is-primary"
            size="is-medium"
            data-testid="searchButton"
            >Search</b-button
          >
        </b-field>
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
      <span class="field has-addons" id="advancedSearch">
        <p class="control">
          <b-button
            data-testid="basic"
            @click="changeSearchForm"
            title="Switch back to the basic search bar"
            >Basic Search</b-button
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
        <p class="control">
          <b-button
            data-testid="beaconListing"
            @click="changeFormToListing()"
            title="Change to listings search"
            >Listing search</b-button
          >
        </p>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GeneSearch",
  data() {
    return {
      query: "",
      validated: false,
      errorMessage: "",
      errorTooltip: false,
    };
  },
  methods: {
    changeSearchForm: function () {
      this.$emit("changeFormToB");
    },
    changeFormToListing: function () {
      this.$emit("changeFormToListing");
    },
    changeFormToA: function () {
      this.$emit("changeFormToA");
    },
    onSubmit: function () {
      // onSubmit is called when user inputs ENTER on search bar
      // proxy the event to the basicSearch function
      var vm = this;
      vm.geneSearch();
    },
    geneSearch: function () {
      // basicSearch is called when user clicks search button
      var vm = this;
      vm.errorTooltip = false;
      // Validate user input with regex

      // Query string
      var queryObj = {};
      queryObj.gene = vm.query;
      // Change view to results and send GET query string
      this.$router.push(
        {
          path: "results",
          query: queryObj,
        },
        undefined,
        () => {}
      );
    },
  },
  beforeMount() {
    // If user reloads page, this places the current query params from the address bar into the search bar
    // Check searchType
    if (this.$route.query.searchType == "basic") {
      // Continue to parse the object into a string
      this.assembly = `${this.$route.query.assemblyId}`;
      this.searchInInput = `${this.$route.query.searchInInput}`;
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
@media screen and (min-width: 1025px) {
  .searchbar-footer span#advancedSearch {
    margin-left: auto;
  }
  #searchButton {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}

h2 {
  font-size: 2em;
}
/* section {
    margin-top: 100px;
  } */
.stretch {
  width: 100%;
}
.searchbar-footer {
  margin-top: 12px;
  font-size: 0.9em;
  display: flex;
}

@media screen and (max-width: 1024px) {
  .searchbar-footer {
    display: flex;
    flex-flow: column;
  }
  #searchButton {
    order: 1;
  }
  #advancedSearch {
    order: 2;
  }
  #Listing {
    order: 3;
  }
  #example {
    order: 4;
  }
}
#searchBar {
  border-radius: 0;
}
/* fix safari bug https://github.com/jgthms/bulma/issues/2626 */
select {
  text-rendering: auto !important;
}
</style>
