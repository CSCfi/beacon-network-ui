<template>
  <div class="container">
    <section>
      <h2>Variant Search</h2>
      <form @submit.prevent="onSubmit">
        <b-field>
          <p class="control">
            <b-tooltip animated label="Select a genomic assembly">
              <b-field>
                <b-select placeholder="Assembly" v-model="assembly">
                  <option value="GRCh38">GRCh38</option>
                  <option value="GRCh37">GRCh37</option>
                  <option value="hg19">hg19</option>
                </b-select>
              </b-field>
            </b-tooltip>
          </p>
          <b-tooltip
            class="stretch"
            animated
            label="Chromosome : Position ReferenceBase > AlternateBase|VariantType">
            <b-input
              id="searchBar"
              class="stretch searchbar"
              type="search"
              placeholder="Chromosome : Position ReferenceBase > AlternateBase|VariantType"
              v-model="query">
            </b-input>
          </b-tooltip>
          <b-tooltip animated label="Query Beacons">
            <b-button v-on:click="basicSearch" type="is-primary">Search</b-button>
          </b-tooltip>
        </b-field>
        <b-notification
            v-if="errorTooltip"
            type="is-warning"
            aria-close-label="Close notification"
            role="alert">
            {{ errorMessage }}
        </b-notification>
      </form>
    </section>
    <div class="searchbar-footer">
      <b-tooltip animated position="is-bottom" label="Show an example search term">
        <a v-on:click="exampleSearch">Show Example</a>
      </b-tooltip>
        |
      <b-tooltip animated position="is-bottom" label="Access more search options">
        <a>Advanced Search</a>
      </b-tooltip>
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
      regex: /^(X|Y|MT|[1-9]|1[0-9]|2[0-2]) \: (\d+) ([ATCGN]+) \> (DEL:ME|INS:ME|DUP:TANDEM|DUP|DEL|INS|INV|CNV|SNP|MNP|[ATCGN]+)$/i,
      variantTypes: ["DEL:ME", "INS:ME", "DUP:TANDEM", "DUP", "DEL", "INS", "INV", "CNV", "SNP", "MNP"]
    }
  },
  props: {

  },
  methods: {
    onSubmit: function() {
      // onSubmit is called when user inputs ENTER on search bar
      // proxy the event to the basicSearch function
      var vm = this;
      vm.basicSearch();
    },
    basicSearch: function() {
      // basicSearch is called when user clicks search button
      var vm = this
      vm.errorTooltip = false
      // Validate user input with regex
      vm.validateInput()
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
      vm.query = "MT : 10 T > C";
    },
    validateInput: function() {
      var vm = this;
      if (vm.regex.exec(vm.query)) {
        vm.validated = true;
      } else {
        vm.validated = false;
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  font-size: 2em;
}
section {
  margin-top: 100px;
}
.stretch {
  width: 100%;
}
.searchbar-footer {
  float: right;
}
</style>
