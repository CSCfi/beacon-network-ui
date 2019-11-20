<template>
  <div class="tile is-parent">
    <div class="tile is-child box">
      <article class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img
              :src="data.organization.logoUrl"
              :alt="data.organization.name + ' organization image'"
            />
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p class="title is-size-6">{{ data.organization.name }}</p>
            <p class="subtitle is-6">{{ data.name }}</p>
          </div>
          <small
            ><a v-bind:href="data.organization.url">Visit Us</a> ·
            <a v-bind:href="data.url">Beacon API</a> ·
            <a v-bind:href="data.contactUrl">Contact Us</a>
          </small>
        </div>
        <div class="media-right">
          <b-tag v-if="exists" type="is-success">Found</b-tag>
          <b-tag v-if="!exists" type="is-danger">Not Found</b-tag>
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
      data: { name: "", organization: { name: "", logoUrl: "" } }
    };
  },
  watch: {
    "$route.query.query": function() {
      // Watch query string for changes in case the user makes a new
      // search while displaying results.
      this.getInfo();
    }
  },
  methods: {
    getInfo: function() {
      axios
        .get(`${this.registry}services/${this.$props.beaconId}`)
        .then(response => {
          this.data = response.data;
        })
        .catch(error => {
          console.log(this.$props.beaconId, error);
        });
    }
  },
  beforeMount() {
    this.getInfo();
  }
};
</script>
