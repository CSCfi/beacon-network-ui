<template>
  <div id="col">
    <h1 id="header">(404) Page NotFound</h1>
    <b-button data-testid="homeButton" @click="toHome()">
      Return to homepage
    </b-button>
  </div>
</template>
<script>
export default {
  methods: {
    toHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
#col {
  text-align: center;
}
#header {
  font-size: 3em;
}
</style>
