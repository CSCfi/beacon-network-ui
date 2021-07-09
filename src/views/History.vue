<template>
  <!-- inspired by https://bulma.io/documentation/components/panel/ -->
  <section title="History of searches in current seesion">
    <nav class="panel">
      <p class="panel-heading">
        Search history
      </p>
      <ul v-for="search in searches.slice().reverse()" :key="search.time">
        <router-link :to="parseUrl(search.url)">
          <a
            class="panel-block is-active"
            data-testid="beaconButton"
            :on="(url = parseUrl(search.url))"
          >
            {{ url + " time: " + search.time }}
          </a>
        </router-link>
      </ul>
    </nav>
  </section>
</template>

<script>
export default {
  data() {
    return {
      searches: []
    };
  },
  beforeMount() {
    this.searches = JSON.parse(localStorage.getItem("searches"));
  },
  methods: {
    parseUrl: function(url) {
      var splitUrl = url.split("/");
      return splitUrl[3];
    }
  }
};
</script>
