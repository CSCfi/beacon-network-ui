<template>
  <div class="content page-margin">
    <b-button tag="router-link" to="/" type="is-info">
      Return to main page
    </b-button>
    <h1>How to use Beacon Network</h1>
    <div class="columns">
      <div class="column">
        <div class="word-wrap">
          <h4>Basic Search</h4>
          <p>
            The Beacon Network searchbar is a simple form with two options:
            selection of assembly and definition of variant. The assembly can be
            selected from the dropdown menu on the left side. The searchbar then
            takes the desired variant information as a search term which will be
            sent to Beacons in a structured manner.
          </p>
        </div>
        <div class="word-wrap">
          <h4>Basic Search Structure</h4>
          <p>
            The search structure follows a strict convention of:
          </p>
          <pre>Chromosome : Position ReferenceBase > AlternateBase</pre>
          <p>
            and
          </p>
          <pre>Chromosome : Position ReferenceBase > VariantType</pre>
          <p>
            Note that Beacon APIs use 0-based coordinate system, while datasets
            may use either 0- or 1-based coordinate systems. More options are
            available in the Advanced Search Form.
          </p>
        </div>
        <div class="word-wrap">
          <h4>Advanced Search</h4>
          To access more search options, see the advanced search button below
          the basic searchbar.
        </div>
      </div>
      <div class="column">
        <div class="word-wrap">
          <h4>Example Queries</h4>
          <h5>Example query:</h5>
          <p>
            I want to find a genomic dataset which has samples of insertion type
            variants in chromosome 1 at position 104431389 where the reference
            base is C. This would transform into the following statement in the
            searchbar:
          </p>
          <figure class="highlight is-expanded">
            <div class="button-container">
              <button
                class="button is-text is-small copy-code"
                v-on:click="changeSearch('1 : 104431389 C > INS')"
              >
                Try
              </button>
            </div>
            <pre>1 : 104431389 C > INS</pre>
          </figure>
        </div>
        <div class="word-wrap">
          <h5>Example query:</h5>
          <p>
            I want to find a genomic dataset which has samples of single
            nucleotide polymorphism type of variant in the mitochondrial
            chromosome at position 7599 where the reference base is G and the
            alternate base is A. This would transform into the following
            statement in the searchbar:
          </p>
          <figure class="highlight is-expanded">
            <div class="button-container">
              <button
                class="button is-text is-small copy-code"
                v-on:click="changeSearch('MT : 7599 G > A')"
              >
                Try
              </button>
            </div>
            <pre>MT : 7599 G > A</pre>
          </figure>
        </div>
        <div class="word-wrap">
          <h5>Example query:</h5>
          <p>
            I want to find a genomic dataset which has samples of multiple
            nucleotide polymorphism type of variant in the mitochondrial
            chromosome at position 194 where the reference base is TTACTAAAGT
            and the alternate base is of same length, ending in GT, but having
            any variations of bases in the preceding bases. In such cases, where
            the bases are unknown, we can use a wildcard N to denote the
            existence of an unknown nucleotide. This would transform into the
            following statement in the searchbar:
          </p>
          <figure class="highlight is-expanded">
            <div class="button-container">
              <button
                class="button is-text is-small copy-code"
                v-on:click="changeSearch('MT : 194 TTACTAAAGT > NNNNNNNNGT')"
              >
                Try
              </button>
            </div>
            <pre>MT : 194 TTACTAAAGT > NNNNNNNNGT</pre>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
.word-wrap {
  margin: 0 auto;
  max-width: 200ch;
  padding-bottom: 25px;
  text-align: left;
}
.page-margin {
  margin: 0 15px 0 15px;
}
</style>
