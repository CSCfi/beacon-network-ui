<template>
  <div class="tile is-parent">
    <div class="tile is-child box">
      <article class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img
              :src="data.organization.logoUrl"
              :alt="data.organization.name + ' organization logo'"
            />
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p class="title is-size-6">{{ data.organization.name }}</p>
            <p class="subtitle is-6">{{ data.name }}</p>
          </div>
          <small
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
        </div>
        <div class="media-right">
          <b-tag
            v-if="exists"
            class="accessibility-green-tag"
            title="A variant was found"
            ><b>Found</b></b-tag
          >
          <b-tag
            v-if="exists === false"
            class="accessibility-red-tag"
            title="No variants were found"
            ><b>Not Found</b></b-tag
          >
          <b-tag
            v-if="exists === null"
            class="accessibility-yellow-tag"
            title="Error in connecting to beacon"
            ><b>Unknown</b></b-tag
          >
        </div>
      </article>
    </div>
  </div>
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
