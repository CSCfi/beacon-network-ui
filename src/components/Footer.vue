<template>
  <footer class="footer">
    <!-- Upper Footer -->
    <div class="container">
      <div class="content">
        <div class="columns">
          <div class="column">
            <h5>Beacon Drivers</h5>
            <p><a href="https://elixir-europe.org/">ELIXIR Europe</a></p>
            <p><a href="https://www.ga4gh.org/">GA4GH</a></p>
          </div>
          <div class="column">
            <h5>Legal</h5>
            <p><router-link to="/tos">Terms of Service</router-link></p>
            <p><router-link to="/privacy">Privacy Policy</router-link></p>
          </div>
          <div class="column">
            <h5>ELIXIR Beacon Network</h5>
            <p><router-link to="/join">Join the Network</router-link></p>
            <p><router-link to="/docs">For Developers</router-link></p>
          </div>
          <div class="column">
            <h5>Network Host</h5>
            ELIXIR Beacon Network is provided by<br />
            <a href="http://www.elixir-finland.org/en/frontpage/"
              >ELIXIR Finland</a
            >
            · <a href="https://www.csc.fi/">CSC</a><br />
          </div>
        </div>
      </div>
    </div>
    <!-- Lower Footer -->
    <div class="container">
      <div class="content">
        <div class="columns">
          <div class="column">
            <h5>Beacon Project</h5>
            <p><a href="https://beacon-project.io/">Beacon Project</a></p>
            <p>
              <a
                href="https://ga4gh-discovery.github.io/networks/2018-12-13-network/"
                >Beacon Network Project</a
              >
            </p>
          </div>
          <div class="column">
            <!-- 2nd Column -->
          </div>
          <div class="column">
            <!-- 3rd Column -->
          </div>
          <div class="column">
            <h5>Network Contact</h5>
            ELIXIR Europe<br />
            <a href="mailto:bn-contact@elixir-europe.org"
              >bn-contact@elixir-europe.org</a
            ><br />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "footer-bar"
};
</script>

<style lang="scss" scoped></style>
