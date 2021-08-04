<template>
  <div class="tile is-parent is-6">
    <div class="tile is-child box">
      <article class="media">
        <div class="media-left">
          <figure class="image is-96x96">
            <img
              :src="beacon.organization.logoUrl"
              :alt="beacon.organization.name + ' organization logo'"
            />
          </figure>
        </div>

        <div class="media-content">
          <div class="content">
            <p class="title is-size-5">{{ beacon.organization.name }}</p>
            <p class="subtitle is-6">{{ beacon.name }}</p>
            <p class="subtitle is-6">{{ beacon.description }}</p>
          </div>
          <small
            ><a
              v-bind:href="beacon.organization.url"
              :title="
                'Visit ' + beacon.organization.name + ' organisation website'
              "
              >Visit Us</a
            >
            ·
            <a
              v-bind:href="beacon.url"
              :title="'Visit ' + beacon.name + ' Beacon API'"
              >Beacon API</a
            >
            ·
            <a
              v-bind:href="beacon.contactUrl"
              :title="beacon.organization.name + '\'s contact address'"
              >Contact Us</a
            ></small
          >
        </div>
        <div class="media-right">
          <b-tag type="is-success">{{ beacon.version }}</b-tag>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  props: ["beacon"]
};
</script>
