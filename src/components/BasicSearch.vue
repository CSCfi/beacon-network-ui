<template>
  <div class="container" style="margin-bottom:24px">
    <section>
      <form @submit.prevent="onSubmit">
        <b-field>
          <p class="control">
            <label for="assembly" style="display:none">Assembly</label>
            <b-select
              id="assembly"
              placeholder="Assembly"
              v-model="assembly"
              size="is-medium"
              title="Assembly ID"
            >
              <option value="GRCh38">GRCh38</option>
              <option value="GRCh37">GRCh37</option>
              <option value="hg19">hg19</option>
            </b-select>
          </p>
          <b-tooltip
            class="stretch"
            animated
            label="Chromosome : Position ReferenceBase > AlternateBase|VariantType"
          >
            <label for="searchBar" style="display:none">Search Bar</label>
            <b-input
              id="searchBar"
              class="stretch searchbar"
              size="is-medium"
              type="search"
              placeholder="Chromosome : Position ReferenceBase > AlternateBase|VariantType"
              v-model="query"
              title="Variant search term"
            ></b-input>
          </b-tooltip>
          <b-button
            v-on:click="basicSearch"
            type="is-primary"
            size="is-medium"
            id="searchButton"
            >Search</b-button
          >
        </b-field>
        <b-message
          v-if="errorTooltip"
          type="is-danger"
          aria-close-label="Close notification"
          role="alert"
          >{{ errorMessage }}
          <router-link to="/guide" style="color:blue"
            >How to make a query?</router-link
          ></b-message
        >
      </form>
    </section>
    <div class="searchbar-footer">
      <span id="example" v-if="$route.path === '/'">
        <b-button
          @click="exampleSearch"
          title="Insert an example search term to the search bar"
          >Example variant query</b-button
        ></span
      >
      <span id="advancedSearch"
        ><b-button
          @click="changeSearchForm"
          title="Switch to the advanced search form which has more options"
          >Advanced Search</b-button
        ></span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "BasicSearch",
  data() {
    return {
      query: "",
      assembly: "GRCh38",
      validated: false,
      errorMessage: "",
      errorTooltip: false,
      regex: /^(X|Y|MT|[1-9]|1[0-9]|2[0-2])\s:\s(\d+) ([ATCGN]+)\s>\s(DEL:ME|INS:ME|DUP:TANDEM|DUP|DEL|INS|INV|CNV|SNP|MNP|[ATCGN]+)$/i,
      variantTypes: [
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
      ]
    };
  },
  methods: {
    changeSearchForm: function() {
      this.$emit("changeSearchForm");
    },
    onSubmit: function() {
      // onSubmit is called when user inputs ENTER on search bar
      // proxy the event to the basicSearch function
      var vm = this;
      vm.basicSearch();
    },
    basicSearch: function() {
      // basicSearch is called when user clicks search button
      var vm = this;
      vm.errorTooltip = false;
      // Validate user input with regex
      vm.validateInput();
      if (vm.validated) {
        // Query string
        var queryObj = {
          searchType: "basic",
          includeDatasetResponses: "HIT",
          assemblyId: vm.assembly,
          referenceName: vm.query.split(" ")[0],
          start: vm.query.split(" ")[2] > 0 ? vm.query.split(" ")[2] - 1 : 0,
          referenceBases: vm.query.split(" ")[3]
        };
        // Determine if last element is a base of a variant type
        if (vm.variantTypes.includes(vm.query.split(" ")[5])) {
          // vm.query.split(" ")[5]) is a variantType
          queryObj["variantType"] = vm.query.split(" ")[5];
        } else {
          // vm.query.split(" ")[5]) is an alternateBases
          queryObj["alternateBases"] = vm.query.split(" ")[5];
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
      } else {
        vm.errorMessage = "Variant search term is malformed, please try again.";
        vm.errorTooltip = true;
      }
    },
    exampleSearch: function() {
      var vm = this;
      vm.query = "MT : 10 T > C";
      document.getElementById("searchBar").focus();
    },
    validateInput: function() {
      var vm = this;
      if (vm.regex.exec(vm.query)) {
        vm.validated = true;
      } else {
        vm.validated = false;
      }
    }
  },
  beforeMount() {
    // If user reloads page, this places the current query params from the address bar into the search bar
    // Check searchType
    if (this.$route.query.searchType == "basic") {
      // Continue to parse the object into a string
      this.query = `${this.$route.query.referenceName} : ${parseInt(
        this.$route.query.start,
        10
      ) + 1} ${this.$route.query.referenceBases} > ${
        this.$route.query.alternateBases
      }`;
    } else if (this.$route.query.searchType == "advanced") {
      // Change to advanced search form
      this.changeSearchForm();
    } else {
      // Default to basic search
      this.query = "";
    }
  }
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
  width: 100%;
}
.searchbar-footer {
  margin-top: 12px;
  font-size: 0.9em;
  display: flex;
}
.searchbar-footer span#advancedSearch {
  margin-left: auto;
}
#searchButton {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
<style>
#searchBar {
  border-radius: 0;
}
/* fix safari bug https://github.com/jgthms/bulma/issues/2626 */
select {
  text-rendering: auto !important;
}
</style>
