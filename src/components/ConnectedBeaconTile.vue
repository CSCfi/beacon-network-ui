<template>
  <div class="tile is-parent is-6">
    <div class="tile is-child box">
      <article class="media">
        <div class="media-left">
          <figure class="image is-96x96">
            <img :src="beacon.organization.logoUrl" alt="Organization image">
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p class="title is-4">{{ beacon.organization.name }}</p>
            <p class="subtitle is-6">{{ beacon.name }}</p>
            <p class="subtitle is-6">{{ beacon.description }}</p>    
          </div>
          <small><a v-bind:href="beacon.organization.url">Visit Us</a> · <a v-bind:href="beacon.url">Beacon API</a> · <a v-bind:href="beacon.contactUrl">Contact Us</a></small>
        </div>
        <div class="media-right">
          <span v-if="status == 200">
            <CheckboxBlankCircleIcon class="has-text-success"></CheckboxBlankCircleIcon>
          </span>
          <span v-else>
            <CheckboxBlankCircleIcon class="has-text-danger"></CheckboxBlankCircleIcon>
          </span>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CheckboxBlankCircleIcon from 'vue-material-design-icons/CheckboxBlankCircle.vue'

export default {
  components: {
    CheckboxBlankCircleIcon,
  },
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
              // console.log(this.$props.beacon.url, response.status)
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
