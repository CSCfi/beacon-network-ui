<template>
  <footer class="footer">
    <!-- Upper Footer -->
    <div class="footerContainer centered">
      <div class="content">
        <div class="columns">
          <div class="column">
            <h5>ELIXIR Beacon Network</h5>
            <ul>
              <li>
                <router-link to="/guide">How to use Beacon Network</router-link>
              </li>
              <li><router-link to="/join">Join the Network</router-link></li>
              <li><router-link to="/docs">For Developers</router-link></li>
              <li>
                <router-link to="/docsapi">API Documentation</router-link>
              </li>
            </ul>
          </div>
          <div class="column">
            <h5>More About Beacon</h5>
            <ul>
              <li><a href="https://beacon-project.io/">Beacon Project</a></li>
              <li><a href="https://elixir-europe.org/">ELIXIR Europe</a></li>
              <li><a href="https://www.ga4gh.org/">GA4GH</a></li>
              <li>
                <a href="https://ga4gh-discovery.github.io/">GA4GH Discovery</a>
              </li>
            </ul>
          </div>
          <div class="column is-one-fifth">
            <a class="login" href="https://elixir-europe.org/"
              ><img
                src="@/assets/elixir-white-orange-logo.png"
                alt="ELIXIR Europe Logo"
            /></a>
          </div>
        </div>
      </div>
    </div>
    <!-- Lower Footer -->
    <div class="footerContainer">
      <div class="content">
        <div class="columns">
          <div class="column">
            <p>
              <img class="flag" alt="EU Flag" src="../assets/eu-flag-bw.jpg" />
              ELIXIR is partly funded by the European Commission within the
              Research Infrastructures programme of Horizon 2020.
            </p>
          </div>
          <div class="column contact">
            <p class="address">
              ELIXIR Beacon Network is operated by
              <a href="http://www.elixir-europe.org/">ELIXIR Hub</a>
              |
              <a href="mailto:bn-contact@elixir-europe.org"
                >bn-contact@elixir-europe.org</a
              >
              <br />
              ELIXIR Beacon Network is provided by
              <a href="http://www.elixir-finland.org/en/frontpage/"
                >ELIXIR Finland</a
              >
              | <a href="https://www.csc.fi/">CSC</a>
            </p>
            <p class="legal">
              Copyright © ELIXIR 2019 |
              <router-link to="/tos">Terms of Service</router-link> |
              <router-link to="/privacy">Privacy Policy</router-link>
            </p>
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

<style lang="scss" scoped>
.footer {
  background: #3e3e3e;
  color: white;
  padding: 0;
  flex-shrink: 0;
  font-size: 0.875em;
  margin-top: 20px;
}
.footer .footerContainer.centered h5 {
  color: white;
  padding-bottom: 5px;
  border-bottom: solid 1px white;
  width: 50%;
  min-width: 300px;
}
.footer .footerContainer.centered ul {
  margin: 0;
  padding: 0;
}
.footer .footerContainer.centered ul li {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.footer .footerContainer.centered ul li a {
  color: white;
}
.footer .footerContainer.centered ul li a:hover {
  color: #f47d21;
}
.footer a {
  color: #0bf;
}
.footer a:hover {
  color: #f47d21;
}
.footer .footerContainer.centered {
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
}
.footer .footerContainer.centered .is-one-fifth {
  text-align: center;
}
.footer .footerContainer + .footerContainer {
  background: #023452;
  padding-left: 3rem;
  padding-right: 3rem;
}
.footer .footerContainer + .footerContainer .content {
  max-width: 1200px;
  margin: 0 auto;
}
.footerContainer .contact {
  text-align: right;
}
.footerContainer .contact p {
  margin: 0;
}
.flag {
  height: 30px;
  float: left;
  margin: 5px 10px 0 0;
}
</style>
