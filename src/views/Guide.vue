<template>
  <div class="content word-wrap">
    <b-button
      data-testid="returnButton"
      tag="router-link"
      to="/"
      type="is-primary"
    >
      Return to main page
    </b-button>
    <h1>How to use Beacon Network</h1>
    <h2>Making Queries</h2>
    <h3>Basic Search</h3>
    <p>
      The Beacon Network searchbar is a simple form with two options: selection
      of assembly and definition of variant. The assembly can be selected from
      the dropdown menu on the left side. The searchbar then takes the desired
      variant information as a search term which will be sent to Beacons in a
      structured manner.
    </p>
    <h3>Basic Search Structure</h3>
    <p>The search structure follows a strict convention of:</p>
    <pre>Chromosome : Position ReferenceBase > AlternateBase</pre>
    <p>and</p>
    <pre>Chromosome : Position ReferenceBase > VariantType</pre>
    <p>
      <b>Note that:</b> The Beacon Network UI is using a human-friendly 1-based
      coordinate system. Beacon API services are using a 0-based coordinate
      system, while datasets may use either a 0- or a 1-based coordinate system
      depending on the dataset file type. 1-based queries made from the Beacon
      Network UI are substracted by one, and received at the Beacon APIs as
      0-based. <b>Note that:</b> Spaces are not enforced.
    </p>
    <h3>Advanced Search</h3>
    <p>
      To access more search options, see the advanced search button below the
      basic searchbar.
    </p>
    <h2>Example Queries</h2>
    <h3>Example query:</h3>
    <p>
      I want to find a genomic dataset which has samples of insertion type
      variants in chromosome 1 at position 104431390 where the reference base is
      C. This would transform into the following statement in the searchbar:
    </p>
    <figure class="highlight is-expanded">
      <div class="button-container">
        <button
          data-testid="testButton1"
          class="button is-text is-small copy-code"
          v-on:click="exampleSearch('1 : 104431389 C > INS')"
        >
          Try
        </button>
      </div>
      <pre>1 : 104431390 C > INS</pre>
    </figure>
    <h3>Example query:</h3>
    <p>
      I want to find a genomic dataset which has samples of single nucleotide
      polymorphism type of variant in the mitochondrial chromosome at position
      7600 where the reference base is G and the alternate base is A. This would
      transform into the following statement in the searchbar:
    </p>
    <figure class="highlight is-expanded">
      <div class="button-container">
        <button
          data-testid="testButton2"
          class="button is-text is-small copy-code"
          v-on:click="exampleSearch('MT : 7599 G > A')"
        >
          Try
        </button>
      </div>
      <pre>MT : 7600 G > A</pre>
    </figure>
    <h3>Example query:</h3>
    <p>
      I want to find a genomic dataset which has samples of multiple nucleotide
      polymorphism type of variant in the mitochondrial chromosome at position
      195 where the reference base is TTACTAAAGT and the alternate base is of
      same length, ending in GT, but having any variations of bases in the
      preceding bases. In such cases, where the bases are unknown, we can use a
      wildcard N to denote the existence of an unknown nucleotide. This would
      transform into the following statement in the searchbar:
    </p>
    <figure class="highlight is-expanded">
      <div class="button-container">
        <button
          data-testid="testButton3"
          class="button is-text is-small copy-code"
          v-on:click="exampleSearch('MT : 194 TTACTAAAGT > NNNNNNNNGT')"
        >
          Try
        </button>
      </div>
      <pre>MT : 195 TTACTAAAGT > NNNNNNNNGT</pre>
    </figure>
    <h3>Beacon 2.x</h3>
    <h4>Basic Search and Advanced search</h4>
    <p>
      Search queries in beacon 2.x work much like they did in beacon 1.1.0,
      except now queries can be filtered using the following models from the
      dropdown field: <b>individuals, biosamples, g-variants and cohorts </b>.
    </p>
    <h4>Listings search</h4>
    <p>
      Listings search is a new feature of beacon 2.x. With this feature the user
      can search data by modules. Listings search has three valid search
      methods.
    </p>
    <h5>Generic search</h5>
    <figure class="highlight is-expanded">
      <div class="button-container">
        <button
          data-testid="testButton3"
          class="button is-text is-small copy-code"
          v-on:click="
            listignsExampleSearch({
              searchInInput: 'biosamples',
              id: '',
              searchByInput: '',
            })
          "
        >
          Try
        </button>
      </div>
      <pre>
        Search In:    Search value:  Search By:
        biosample      -              -</pre
      >
    </figure>
    <h5>Search by module id</h5>
    <figure class="highlight is-expanded">
      <div class="button-container">
        <button
          data-testid="testButton3"
          class="button is-text is-small copy-code"
          v-on:click="
            listignsExampleSearch({
              searchInInput: 'biosamples',
              id: 'SAMN03283350',
              searchByInput: '',
            })
          "
        >
          Try
        </button>
      </div>

      <pre>
        Search In:    Search value:  Search By: 
        biosample     SAMN03283350    -</pre
      >
    </figure>
    <h5>Search modules by modules</h5>
    <figure class="highlight is-expanded">
      <div class="button-container">
        <button
          data-testid="testButton3"
          class="button is-text is-small copy-code"
          v-on:click="
            listignsExampleSearch({
              searchInInput: 'biosamples',
              id: 'SAMN03283350',
              searchByInput: 'individuals',
            })
          "
        >
          Try
        </button>
      </div>
      <pre>
        Search In:    Search value:  Search By:
        biosample     SAMN03283350   individuals</pre
      >
    </figure>
  </div>
</template>

<script>
export default {
  methods: {
    parseQueryString: function (queryString) {
      // Function copypasted from BasicSearch.vue and simplified
      var queryObj = {
        includeDatasetResponses: "HIT",
        assemblyId: "GRCh38",
        referenceName: queryString.split(" ")[0],
        start: queryString.split(" ")[2],
        referenceBases: queryString.split(" ")[3],
      };
      // Determine if last element is a base of a variant type
      if (queryString.split(" ")[5] === "INS") {
        // queryString.split(" ")[5]) is a variantType
        queryObj["variantType"] = queryString.split(" ")[5];
      } else {
        // queryString.split(" ")[5]) is an alternateBases
        queryObj["alternateBases"] = queryString.split(" ")[5];
      }
      return queryObj;
    },
    exampleSearch: function (queryString) {
      var queryObj = this.parseQueryString(queryString);
      this.$router.push(
        {
          path: "results",
          query: queryObj,
        },
        undefined,
        () => {}
      );
    },
    listignsExampleSearch: function (queryObj) {
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
};
</script>

<style lang="scss" scoped>
.word-wrap {
  margin: 0 auto;
  max-width: 80ch;
  padding-bottom: 25px;
  text-align: left;
}
.highlight {
  position: relative;
  text-align: left !important;
  height: 3.25rem;
  margin: 0;
}
.highlight .button-container {
  position: absolute;
  display: inline-flex;
  background: transparent;
  border-radius: 4px 4px 0 0;
  top: 0.25rem;
  right: 1.35rem;
  padding: 0 0 0 8px;
  vertical-align: top;
}
.highlight .button-container .button:hover {
  color: #3273dc;
  background: transparent;
}
</style>
