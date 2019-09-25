<template>
  <div class="content word-wrap">
    <router-link to="/">Return</router-link>
    <h1>ELIXIR Beacon Network</h1>
    <h2>Privacy Policy</h2>
    <p>
        This document covers the privacy policies of ELIXIR Beacon Network (from now on referred to as <i>service</i>).
    <h3>Service</h3>
    <p>
        The service is provided by ELIXIR Finland (CSC - IT Center for Science Ltd.). As a service
        provider ELIXIR Finland is responsible for hosting the service website and any underlying APIs.
        The service is operated by ELIXIR Europe (ELIXIR Hub). As a service operator ELIXIR Europe
        is responsible for managing the service contact address.
    </p>
    <h3>Personal Information</h3>
    <p>
        The service does not intentionally collect or store any personal or other identifiable data of its users.
        Users that authenticate with the ELIXIR AAI Login button will have their ELIXIR ID logged by the OIDC Client service.
        These logs reside inside the EU, and they are not permanently saved.
    </p>
    <h3>Cookies</h3>
    <p>
        The service utilises cookies for servicing broader access to authenticated and authorised users. If a user authenticates
        themselves at ELIXIR AAI, their ELIXIR AAI Access Token (JWT) will be saved to cookies for a duration of up to one hour.
        This cookie contains data such as what is the user's ELIXIR ID.
        This cookie is only available from the domain of the service, and can only travel in encrypted HTTPS traffic. Other cookies are also utilised,
        but they hold no personal data. Users are advised to delete their browser session cookies if they are using the service on a
        public computer.
    </p>
    <h3>Security</h3>
    <p>
        The service and all of its components will always be served over encrypted HTTPS traffic.
    </p>
    <h3>Third Party Beacons</h3>
    <p>
        The service is not responsible for the content that connected Beacons may hold. Users are advised, that if they have authenticated
        themselves at ELIXIR AAI, their ELIXIR AAI JWT Access Tokens are sent to the connected Beacons for processing to check for possible dataset permissions.
        The service has set strict requirements for connected Beacons regarding security. If you suspect malpractice at the end of a connected Beacon, please contact us,
        and the issue will be investigated. Malpractice at a Beacon may be for example; collection and storing of user access tokens with malicious intent or servicing
        their API via an unsecure, unencrypted HTTP traffic.
    </p>
    <h3>Changes to Privacy Policy</h3>
    <p>
        This document may be updated at any time without given notice.
        <br><i>Last updated at 24th of September, 2019.</i>
    </p>
    <h3>Contact Us</h3>
    <p>
        Should any questions or suggestions emerge, we urge you to contact us at
        <br><a href="mailto:bn-contact@elixir-europe.org">bn-contact@elixir-europe.org</a><br>
    </p>
    <router-link to="/tos">Terms of Service</router-link>
    <router-link to="/">Return</router-link>
  </div>
</template>

<style lang="scss" scoped>
.content {
    // margin-top: 100px;
}
.word-wrap {
    margin: 0 auto;
    max-width: 80ch;
    padding-bottom: 25px;
    text-align: left;
}
</style>