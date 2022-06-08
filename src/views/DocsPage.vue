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
    <h1>For Developers</h1>
    <h2>Overview</h2>
    <p>
      This document provides some technical documentation of ELIXIR Beacon
      Network for developers. Beacon Network and its components are developed by
      ELIXIR Finland (CSC - IT Center for Science Ltd.). All components have
      been developed with public ELIXIR funding, and are therefore open sourced.
    </p>
    <p>
      The software stack at Beacon Network consists of Vue in the frontend and
      python (aiohttp) in the backend. The different components are run in an
      OpenShift cluster with load balanced containers. The repositories listed
      below contain documentation regarding the configuration, deployment and
      use of the services.
    </p>
    <h3>UI</h3>
    <p>
      <a href="https://github.com/CSCfi/beacon-network-ui"
        >UI source code at GitHub</a
      ><br />
      The website has been developed with Vue. The SPA can be run with Node or
      served statically.
    </p>
    <h3>Registry</h3>
    <p>
      <a href="https://github.com/CSCfi/beacon-network"
        >Registry source code at GitHub</a
      ><br />
      The Beacon Registry forms the backbone of Beacon Network, it holds a
      catalogue of all of the registered Beacon services.
    </p>
    <h3>Aggregator</h3>
    <p>
      <a href="https://github.com/CSCfi/beacon-network"
        >Aggregator source code at GitHub</a
      ><br />
      The Beacon Aggregator is the service behing the Beacon Network searchbar,
      that conducts the actual request. When a query is made at the UI, the
      Aggregator will request a list of Beacons from the Registry. The
      Aggregator then propagates the user query to the Beacons, and aggregates
      the results, returning them to the UI in a websocket asynchronously. The
      Aggregator can also be used synchronously (http).
    </p>
    <h3>OIDC Client</h3>
    <p>
      <a href="https://github.com/CSCfi/oidc-client"
        >OIDC Client source code at GitHub</a
      ><br />
      The OIDC Client serves as the ELIXIR AAI client, which is used to
      authenticate users and to retrieve access tokens for authorised requests.
      The access token travels only in encrypted HTTPS traffic from component to
      component.
    </p>
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
