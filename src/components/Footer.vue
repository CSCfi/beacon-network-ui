<template>
  <footer class="footer">
    <div class="container">
      <div class="content">
        <div class="columns">
          <div class="column">
            <h5>Beacon Drivers</h5>
            <p><a href="https://elixir-europe.org/">ELIXIR Europe</a></p>
            <p><a href="https://www.ga4gh.org/">GA4GH</a></p>
          </div>
          <div class="column">
            <h5>Beacon Project</h5>
            <p><a href="https://beacon-project.io/">Beacon Project</a></p>
            <p><a href="https://ga4gh-discovery.github.io/networks/2018-12-13-network/">Beacon Network Project</a></p>
          </div>
          <div class="column">
            <h5>ELIXIR Beacon Network</h5>
            <p><router-link to="/join">Join the Network</router-link></p>
            <p><router-link to="/docs">For Developers</router-link></p>
          </div>
          <div class="column">
            <h5>Contact</h5>
            <p>
              CSC - IT Center for Science Ltd.<br>
              Keilaranta 14, Espoo, Finland<br>
              servicedesk@csc.fi<br>
              <a href="https://www.csc.fi/">csc.fi</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'footer-bar'
}
</script>

<style lang="scss" scoped>
</style>