<template>
  <section id="tabsSection">
    <b-tabs type="is-boxed" v-model="activeTab" expanded>
      <b-tab-item label="Connected Beacons">
        <ConnectedBeacons />
      </b-tab-item>

      <b-tab-item label="About Beacons">
        <div class="columns content">
          <div class="column word-wrap smaller">
            <h4>Beacon</h4>
            A Beacon is an online web service that allows users to query an
            institution’s databases, to determine whether they contain a genetic
            variant of interest. The query is structured as a yes/no question of
            the form: “Do you have any genomes with an ‘X’ at position Y on
            chromosome Z?”<br />
            <a href="https://beacon-project.io/"
              >More information regarding Beacons</a
            >
          </div>

          <div class="column word-wrap smaller">
            <h4>Beacon Network</h4>
            Beacon networks consist of registries of multiple Beacons, in
            different locations, which can be queried through a common intercace
            or gateway protocol. The ELIXIR Beacon Network is a collection of
            Beacons from ELIXIR nodes.<br />
            <a
              href="https://ga4gh-discovery.github.io/categories/discovery_networks.html"
              >More information regarding Beacon Networks</a
            >
          </div>
        </div>
      </b-tab-item>

      <b-tab-item label="How to use Beacon Network">
        <div class="columns content">
          <div class="column">
            <div class="word-wrap">
              <h4>Basic Search</h4>
              The Beacon Network searchbar is a simple form with two options:
              selection of assembly and definition of variant. The assembly can
              be selected from the dropdown menu on the left side, currently
              supporting assemblies GRCh37 and GRCh38. The searchbar then takes
              the desired variant information as a search term which will be
              queried for in the dataset database.
            </div>
            <div class="word-wrap">
              <h4>Basic Search Structure</h4>
              The search structure follows a strict convention of {CHROMOSOME} :
              {CHROMOSOMAL POSITION} {REFERENCE BASES} > {ALTERNATE BASES |
              VARIANT TYPE}. Note that Beacon Network uses an adaptive
              coordinate system (0-1-based), while Beacon APIs use a 0-based
              (interbase) coordinate system.
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
              <b>Example query:</b> I want to find a genomic dataset which has
              samples of insertion type variants in chromosome 1 at position
              104431390 where the reference base is C. This would transform into
              the following statement in the searchbar: 1 : 104431390 C > INS.
            </div>
            <div class="word-wrap">
              <b>Example query:</b> I want to find a genomic dataset which has
              samples of single nucleotide polymorphism type of variant in the
              mitochondrial chromosome at position 7600 where the reference base
              is G and the alternate base is A. This would transform into the
              following statement in the searchbar: MT : 7600 G > A.
            </div>
            <div class="word-wrap">
              <b>Example query:</b> I want to find a genomic dataset which has
              samples of multiple nucleotide polymorphism type of variant in the
              mitochondrial chromosome at position 195 where the reference base
              is TTACTAAAGT and the alternate base is of same length, ending in
              GT, but having any variations of bases in the preceding bases. In
              such cases, where the bases are unknown, we can use a wildcard N
              to denote the existence of an unknown nucleotide. This would
              transform into the following statement in the searchbar: MT : 195
              TTACTAAAGT > NNNNNNNNGT.
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
    ConnectedBeacons
  },
  data() {
    return {
      activeTab: 0
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#tabsSection {
  margin: 100px 0;
}

.word-wrap {
  margin: 0 auto;
  max-width: 80ch;
  padding-bottom: 25px;
  text-align: left;
}

.word-wrap.smaller {
  max-width: 75ch;
}
</style>
