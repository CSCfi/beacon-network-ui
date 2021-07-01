<template>
  <div class="content word-wrap">
    <b-button
      data-testid="returnButton"
      tag="router-link"
      to="/"
      type="is-primary"
    >
      Return to main page
    </b-button>
    <h1>ELIXIR Beacon Network</h1>
    <h2>Terms of Service</h2>
    <p>
      This document covers the privacy policies of ELIXIR Beacon Network (from
      now on referred to as <i>service</i>).
    </p>

    <h3>Service</h3>
    <p>
      The service is provided by ELIXIR Finland (CSC - IT Center for Science
      Ltd.). As a service provider ELIXIR Finland is responsible for hosting the
      service website and any underlying APIs. The service is operated by ELIXIR
      Europe (ELIXIR Hub). As a service operator ELIXIR Europe is responsible
      for managing the service contact address.
    </p>
    <h3>Warranty and Liability</h3>
    <p>
      The service is provided "as is", and the provider or operator expresses no
      warranties of any kind related to the service or any of its components. In
      no event shall the provider or operator be held liable for anything
      arising from your personal use of the service.
    </p>
    <h3>Misuse</h3>
    <p>
      As a user you agree not to misuse the service in any way. Any case of
      misuse may be reported to law enforcement or the scientific community.
      Cases of misuse include, but are not limited to, for example, attempting
      to identify individuals from strategically selected variant queries, or
      attempting to send a forged access token to the connected Beacons in an
      attempt to gain access to restricted datasets.
    </p>
    <h3>Agreement</h3>
    <p>
      Use of the service indicates your acceptance of the Terms of Service and
      Privacy Policy.
    </p>
    <h3>Changes to Terms of Service</h3>
    <p>
      This document may be updated at any time without given notice.
      <br /><i>Last updated: 24 September 2019.</i>
    </p>
    <h3>Contact Us</h3>
    <p>
      Should any questions or suggestions emerge, we urge you to contact us at
      <br /><a href="mailto:bn-contact@elixir-europe.org"
        >bn-contact@elixir-europe.org</a
      ><br />
    </p>
    <router-link to="/privacy">Privacy Policy</router-link><br />
  </div>
</template>

<style lang="scss" scoped>
.word-wrap {
  margin: 0 auto;
  max-width: 80ch;
  padding-bottom: 25px;
  text-align: left;
}
</style>
