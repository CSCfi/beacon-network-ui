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
      var vm = this
      vm.basicSearch()
    },
    basicSearch: function() {
      // basicSearch is called when user clicks search button
      var vm = this
      vm.errorTooltip = false
      // Validate user input with regex
      vm.validateInput()
      if (vm.validated) {
        var parsedQuery = vm.parseQuery()
        // Send parsed query to Home component
        this.$emit('basicSearch', parsedQuery)
        // this.$emit('basicSearch', vm.query) // unparsed query string
      } else {
        vm.errorMessage = "Variant search term is malformed, please try again."
        vm.errorTooltip = true
      }
    },
    exampleSearch: function() {
      var vm = this
      vm.query = "MT : 10 T > C"
    },
    validateInput: function() {
      var vm = this
      if (vm.regex.exec(vm.query)) {
        vm.validated = true
      } else {
        vm.validated = false
      }
    },
    parseQuery: function() {
        var vm = this
        var q = vm.query.split(" ")
        var queryParams = {
          "assemblyId": vm.assembly,
          "referenceName": q[0],
          "startMin": q[2] > 0 ? q[2]-1 : 0,
          "startMax": q[2],
          "referenceBases": q[3],
        }

        if (vm.variantTypes.includes(q[5])) {
          // q[5] is a variantType
          queryParams["variantType"] = q[5]
        } else {
          // q[5] is an alternateBases
          queryParams["alternateBases"] = q[5]
        }

        return queryParams
    }
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
