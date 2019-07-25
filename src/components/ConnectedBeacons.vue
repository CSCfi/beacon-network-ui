<template>
    <section v-on:load="queryAPI">

      <div v-if="beacons">
        <div v-for="beacon in beacons">
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
                <br>Status: {{ checkStatus(beacon.url) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="error">
        {{ error }}
      </div>

    </section>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            beacons: [],
            error: ""
        }
    },
    methods: {
        queryAPI : function () {
          var vm = this;
          vm.beacons = [] // Clear view

          var url = "https://dev-registry-beacon.rahtiapp.fi/services?type=urn:ga4gh:beacon";

          axios
            .get(url)
            .then(response => {
              this.beacons = response.data
            })
            .catch(error => {
              this.error = "Could not find any Beacons to display."
              console.log(error)
            })
        },
        checkStatus : function(url) {
          axios
            .get(url)
            .then(response => {
              console.log(url, response.status)
            })
            .catch(error => {
              console.log(url, error)
            })

        }
    },
    beforeMount() {
      this.queryAPI()
    }
}
</script>

<style scoped>

</style>
