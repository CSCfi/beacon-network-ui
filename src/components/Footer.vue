<template>
  <footer class="footer">
    <!-- Upper Footer -->
    <div class="footerContainer centered">
      <div class="content">
        <div class="columns">
          <div
            class="column"
            title="ELIXIR Beacon Network website internal navigation"
          >
            <p class="footer-heading">ELIXIR Beacon Network</p>
            <ul>
              <li>
                <router-link
                  data-testid="quide"
                  to="/guide"
                  title="A guide on how to user the Beacon Network user interface"
                  >How to use Beacon Network</router-link
                >
              </li>
              <li>
                <router-link
                  data-testid="join"
                  to="/join"
                  title="How to register a new Beacon to ELIXIR Beacon Network"
                  >Join the Network</router-link
                >
              </li>
              <li>
                <router-link
                  data-testid="docs"
                  to="/docs"
                  title="Technical documentation for web and API developers"
                  >For Developers</router-link
                >
              </li>
              <li>
                <router-link
                  data-testid="apiDocs"
                  to="/docsapi"
                  title="Technical documentation of advanced API usage"
                  >API Documentation</router-link
                >
              </li>
              <li>
                <router-link
                  data-testid="accessibility"
                  to="/accessibility"
                  title="Accessibility statement"
                  >Accessibility Statement</router-link
                >
              </li>
            </ul>
          </div>
          <div class="column" title="Affiliated external links">
            <p class="footer-heading">More About Beacon</p>
            <ul>
              <li>
                <a
                  data-testid="beaconProject"
                  href="https://beacon-project.io/"
                  title="Information regarding the GA4GH/ELIXIR Beacon project"
                  >Beacon Project</a
                >
              </li>
              <li>
                <a
                  data-testid="elixirSite"
                  href="https://elixir-europe.org/"
                  title="ELIXIR Europe website"
                  >ELIXIR Europe</a
                >
              </li>
              <li>
                <a
                  data-testid="ga4gh"
                  href="https://www.ga4gh.org/"
                  title="GA4GH website"
                  >GA4GH</a
                >
              </li>
              <li>
                <a
                  data-testid="ga4ghDiscovery"
                  href="https://ga4gh-discovery.github.io/"
                  title="Information regarding the GA4GH/ELIXIR Beacon Network project"
                  >GA4GH Discovery</a
                >
              </li>
            </ul>
          </div>
          <div class="column is-one-fifth">
            <a
              class="login"
              href="https://elixir-europe.org/"
              title="Go to ELIXIR Europe"
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
              <a
                href="http://www.elixir-europe.org/"
                title="Go to ELIXIR Europe"
                >ELIXIR Hub</a
              >
              |
              <a
                href="mailto:bn-contact@elixir-europe.org"
                title="Contact the ELIXIR Beacon Network operator"
                >bn-contact@elixir-europe.org</a
              >
              <br />
              ELIXIR Beacon Network is provided by
              <a
                href="http://www.elixir-finland.org/en/frontpage/"
                title="Go to ELIXIR Finland, the ELIXIR Beacon Network provider"
                >ELIXIR Finland</a
              >
              |
              <a
                href="https://www.csc.fi/"
                title="Go to CSC, the ELIXIR Beacon Network provider"
                >CSC</a
              >
            </p>
            <p class="legal">
              Copyright © ELIXIR 2019 - {{ new Date().getFullYear() }} |
              <router-link
                to="/tos"
                title="Read the Terms of Service of ELIXIR Beacon Network"
                >Terms of Service</router-link
              >
              |
              <router-link
                to="/privacy"
                title="Read the Privacy Policy of ELIXIR Beacon Network"
                >Privacy Policy</router-link
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "footer-bar",
};
</script>

<style lang="scss" scoped>
.footer {
  background: #3e3e3e;
  color: white;
  padding: 0;

  margin-top: auto;
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
.footer-heading {
  color: #fff;
  border-bottom: solid 1px #fff;
  font-weight: 700;
  font-size: 16px;
}
</style>
