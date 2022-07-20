<template>
  <span class="tile is-parent">
    <span class="tile is-child box">
      <article class="media">
        <span class="media-left">
          <p class="title is-size-6">{{ data.name }}</p>
          <p class="subtitle is-6">{{ data.organization.name }}</p>
        </span>

        <span class="media-content"> beacon description</span>
        <span class="media-right">
          <small class="contactInfoBar"
            ><a
              v-bind:href="data.organization.url"
              :title="
                'Visit ' + data.organization.name + ' organisation website'
              "
              >Visit Us</a
            >
            ·
            <a
              v-bind:href="data.url"
              :title="'Visit ' + data.name + ' Beacon API'"
              >Beacon API</a
            >
            ·
            <a
              v-bind:href="data.contactUrl"
              :title="data.organization.name + '\'s contact address'"
              >Contact Us</a
            >
          </small>
        </span>
      </article>
    </span>
  </span>
</template>

<script>
import axios from "axios";

export default {
  props: ["beaconId", "exists"],
  data() {
    return {
      registry: process.env.VUE_APP_REGISTRY_URL,
      data: { name: "", organization: { name: "", logoUrl: "" } },
    };
  },
  watch: {
    "$route.query.query": function () {
      // Watch query string for changes in case the user makes a new
      // search while displaying results.
      this.getInfo();
    },
  },
  methods: {
    // we first try the registry to fetch info
    // if that does not work we try the beacon directly
    // because there is no way to know the information that
    // comes from another aggregator
    getInfo: function () {
      axios
        .get(`${this.registry}services/${this.$props.beaconId}`)
        .then((response) => {
          this.data = response.data;
        })
        .catch((error) => {
          var try_url = this.$props.beaconId.split(".").reverse().join(".");
          axios
            .get(`https://${try_url}`)
            .then((response) => {
              this.data = response.data;
            })
            .catch((error) => {
              // We could not fetch info for beacon
            });
        });
    },
  },
  beforeMount() {
    this.getInfo();
  },
};
</script>

<style scoped>
a {
  color: #1c007b;
}
.media-right {
  margin-right: 20%;
}
.accessibility-green-tag {
  background-color: #29852a;
  color: #fff;
}
.accessibility-red-tag {
  background-color: #e90000;
  color: #fff;
}
.accessibility-yellow-tag {
  background-color: #e6e200;
  color: #fff;
}
</style>
