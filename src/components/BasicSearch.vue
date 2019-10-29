<template>
  <div class="container">
    <section>
      <form @submit.prevent="onSubmit">
        <b-field>
          <p class="control">
            <b-field>
              <b-select
                placeholder="Assembly"
                v-model="assembly"
                size="is-medium"
              >
                <option value="GRCh38">GRCh38</option>
                <option value="GRCh37">GRCh37</option>
                <option value="hg19">hg19</option>
              </b-select>
            </b-field>
          </p>
          <b-tooltip
            class="stretch"
            animated
            label="Chromosome : Position ReferenceBase > AlternateBase|VariantType"
          >
            <b-input
              id="searchBar"
              class="stretch searchbar"
              size="is-medium"
              type="search"
              placeholder="Chromosome : Position ReferenceBase > AlternateBase|VariantType"
              v-model="query"
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
        <b-notification
          v-if="errorTooltip"
          type="is-warning"
          aria-close-label="Close notification"
          role="alert"
          >{{ errorMessage }}</b-notification
        >
      </form>
    </section>
    <div class="searchbar-footer">
      <span id="example" v-if="$route.path === '/'"
        ><strong>Quickstart: </strong>
        <a v-on:click="exampleSearch"
          >Example of a mitochondrial variant query</a
        ></span
      >
      <span id="advancedSearch"
        ><a @click="changeSearchForm">Advanced Search</a></span
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
        this.$router.push({
          path: "results",
          query: {
            query: vm.query,
            assembly: vm.assembly
          }
        });
      } else {
        vm.errorMessage = "Variant search term is malformed, please try again.";
        vm.errorTooltip = true;
      }
    },
    exampleSearch: function() {
      var vm = this;
      vm.query = "MT : 9 T > C";
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
  mounted() {
    this.$root.$on("changeSearch", data => {
      var vm = this;
      vm.query = data;
    });
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
  margin-right: 5px;
  font-size: 0.9em;
  display: flex;
}

.searchbar-footer span#example {
  margin-left: 5px;
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
</style>
