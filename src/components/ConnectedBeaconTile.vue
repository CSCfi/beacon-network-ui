<template>
  <div class="columns">
      <div class="column">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Organization image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{ beacon.name }}</p>
                <p class="subtitle is-6">{{ beacon.id }}</p>
              </div>
            </div>

            <div class="content">
              {{ beacon.description }}
              <br>Status: {{ status }}
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  props: ['beacon'],
  data: function () {
    return {
      status: 404,
    }
  },
  methods: {
    checkStatus: function () {
      axios
            .head(this.$props.beacon.url)
            .then(response => {
              console.log(this.$props.beacon.url, response.status)
              this.status = response.status;
            })
            .catch(error => {
              console.log(this.$props.beacon.url, error)
            })
    }
  },
  beforeMount() {
    this.checkStatus();
  }
}
</script>