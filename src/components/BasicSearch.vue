<template>
  <div class="container">
    <section>
      <h2>Variant Search</h2>
      <form @submit.prevent="onSubmit">
        <b-field>
          <p class="control">
            <b-tooltip animated label="Select a genomic assembly">
              <b-field>
                <b-select placeholder="Assembly">
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
            <b-button type="is-primary">Search</b-button>
          </b-tooltip>
        </b-field>
      </form>
    </section>
    <div class="searchbar-footer">
      <a>Show Example</a> | <a>Advanced Search</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "BasicSearch",
  props: {
    query: String
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
