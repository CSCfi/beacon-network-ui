<template>
  <section id="tabsSection">
    <b-tabs type="is-boxed" v-model="activeTab" expanded>
      <b-tab-item label="Connected Beacons">
        <ConnectedBeacons />
      </b-tab-item>

      <b-tab-item label="About Beacons">
        <div class="columns content">
          <div class="column word-wrap">
            <h4>Beacon</h4>
            <p>
              Beacons are web services that can be used to find genomic datasets
              from across the world. Institutions, universities and biobanks can
              share their data for secondary use by granting access to
              researchers that have found an interesting variant within a
              dataset. In short, Beacon is a search service for genomic data.
            </p>
            <p>
              <a href="https://beacon-project.io/"
                >More information regarding Beacons</a
              >
            </p>
          </div>

          <div class="column word-wrap">
            <h4>Beacon Network</h4>
            <p>
              Beacon Network is a collection of Beacons that have joined
              together under a centralised gateway for easier access. Beacons
              that have been connected to the network can be asynchronously
              queried from the user interface. Beacon Network provides a wider
              pool of data for researchers to sift through. The ELIXIR Beacon
              Network is a collection of Beacons from the ELIXIR Nodes.
            </p>
            <p>
              <a
                href="https://ga4gh-discovery.github.io/categories/discovery_networks.html"
                >More information regarding Beacon Networks</a
              >
            </p>
          </div>
        </div>
      </b-tab-item>

      <b-tab-item label="How to use Beacon Network">
        <div class="columns content">
          <div class="column">
            <div class="word-wrap">
              <h4>Basic Search</h4>
              <p>
                The Beacon Network searchbar is a simple form with two options:
                selection of assembly and definition of variant. The assembly
                can be selected from the dropdown menu on the left side. The
                searchbar then takes the desired variant information as a search
                term which will be sent to Beacons in a structured manner.
              </p>
            </div>
            <div class="word-wrap">
              <h4>Basic Search Structure</h4>
              <p>The search structure follows a strict convention of:</p>
              <pre>Chromosome : Position ReferenceBase > AlternateBase</pre>
              <p>and</p>
              <pre>Chromosome : Position ReferenceBase > VariantType</pre>
              <p>
                Note that Beacon APIs use 0-based coordinate system, while
                datasets may use either 0- or 1-based coordinate systems. More
                options are available in the Advanced Search Form.
              </p>
            </div>
            <div class="word-wrap">
              <h4>Advanced Search</h4>
              To access more search options, see the advanced search button
              below the basic searchbar.
            </div>
          </div>
          <div class="column">
            <div class="word-wrap">
              <h4>Example Queries</h4>
              <h5>Example query:</h5>
              <p>
                I want to find a genomic dataset which has samples of insertion
                type variants in chromosome 1 at position 104431389 where the
                reference base is C. This would transform into the following
                statement in the searchbar:
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
                chromosome at position 7599 where the reference base is G and
                the alternate base is A. This would transform into the following
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
                chromosome at position 194 where the reference base is
                TTACTAAAGT and the alternate base is of same length, ending in
                GT, but having any variations of bases in the preceding bases.
                In such cases, where the bases are unknown, we can use a
                wildcard N to denote the existence of an unknown nucleotide.
                This would transform into the following statement in the
                searchbar:
              </p>
              <figure class="highlight is-expanded">
                <div class="button-container">
                  <button
                    class="button is-text is-small copy-code"
                    v-on:click="
                      changeSearch('MT : 194 TTACTAAAGT > NNNNNNNNGT')
                    "
                  >
                    Try
                  </button>
                </div>
                <pre>MT : 194 TTACTAAAGT > NNNNNNNNGT</pre>
              </figure>
            </div>
          </div>
        </div>
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import ConnectedBeacons from "@/components/ConnectedBeacons.vue";

export default {
  components: {
    ConnectedBeacons,
  },
  data() {
    return {
      activeTab: 0,
      query: "",
    };
  },
  methods: {
    changeSearch: function (queryString) {
      this.$root.$emit("changeSearch", queryString);
      document.getElementById("app").scrollIntoView();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

#tabsSection {
  margin: 100px 0 20px;
}

.word-wrap {
  margin: 0 auto;
  max-width: 80ch;
  padding-bottom: 25px;
  text-align: left;
}
</style>
