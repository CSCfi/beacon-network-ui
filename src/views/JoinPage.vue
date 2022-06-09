<template>
  <section>
    <b-button
      data-testid="returnButton"
      tag="router-link"
      to="/"
      type="is-primary"
      class="return-button"
    >
      Return to main page
    </b-button>

    <div class="columns content form-container">
      <div class="column">
        <form @submit.prevent="onSubmit">
          <h2>Beacon Registration Form</h2>
          <label class="form-label" for="url">Beacon Info Endpoint</label>
          <b-input
            required
            v-model="url"
            data-testid="url"
            type="url"
            pattern="https://.*"
            maxlength="512"
            placeholder="https://beacon.org/"
            title="Info endpoint of the Beacon API"
          >
          </b-input>
          <span class="input-subtitle"
            >https:// address to the info endpoint of this Beacon</span
          >
          <label class="form-label" for="apiKey">API Key</label>
          <b-input
            required
            v-model="apikey"
            data-testid="apiKey"
            type="password"
            minlength="64"
            maxlength="64"
            placeholder="secret"
            title="API key provided by ELIXIR"
          >
          </b-input>
          <span class="input-subtitle"
            >API key to authorise this registration</span
          >
          <b-field
            message="By registering you confirm that your Beacon service will uphold to the service requirements listed below."
          >
            <button v-on:click="registerButton" class="button is-primary">
              Register
            </button>
          </b-field>
        </form>
      </div>

      <div class="column">
        <h2>Preview</h2>
        <div v-if="response && beacon">
          <!-- Make a ConnectedBeaconTile appear here with data pulled from registry using response.data.serviceId -->
          <ConnectedBeaconTile
            style="width: 100%"
            v-bind:key="beacon.url"
            v-bind:beacon="beacon"
          >
          </ConnectedBeaconTile>
        </div>
        <div v-if="response">
          <b-message type="is-success">
            {{ response.data.message }}<br />
            <b>Service ID:</b> {{ response.data.serviceId }}<br />
            <b>Service Key:</b> {{ response.data.serviceKey }}<br />
            <b>Help:</b> {{ response.data.help }} (technical documentation)<br />
          </b-message>
        </div>
        <div v-if="!response && error">
          <b-message type="is-warning">
            {{ error.data }}
          </b-message>
        </div>
      </div>
    </div>
    <div class="columns content text-container">
      <div class="column">
        <h2>Beacon Requirements</h2>
        <p>
          By registering your Beacon service to ELIXIR Beacon Network, you agree
          that your service is upholding to the following requirements, and will
          continue to do so as long as the service is a member of this network.
        </p>
        <h3>Operating Requirements</h3>
        <ol>
          <li>
            The service and all of its components must be served over an HTTPS
            connection.
          </li>
          <li>
            All links in the info endpoints (e.g. contactUrl, logoUrl...) must
            be served over an HTTPS connection.
          </li>
          <li>User access tokens must be processed securely and ethically.</li>
          <li>
            User access tokens must not be cached or stored permanently, at most
            up to 1 hour or until the time stated in the access token's
            <i>exp</i> claim.
          </li>
          <li>User access tokens must be validated.<b>*</b></li>
          <li>
            Dataset permissions (GA4GH passports from ELIXIR AAI /userinfo) in
            user access tokens must be validated from their third party
            origins.<b>*</b>
          </li>
          <li>
            Review the
            <a v-bind:href="securityDocument"
              >Beacon Network Security Best Practices</a
            >
            document.
          </li>
        </ol>
        <p>
          <i
            ><b>*</b>if service is using access tokens for dataset
            permissions.</i
          >
        </p>
        <h3>Good to Know</h3>
        <ol>
          <li>
            Beacon Network can read Beacon info from
            <a href="https://github.com/ga4gh-beacon/specification/"
              >GA4GH Beacon "/" endpoint</a
            >
            and
            <a href="https://github.com/ga4gh-discovery/ga4gh-service-info"
              >GA4GH Discovery "/service-info" endpoint</a
            >.
          </li>
          <li>
            Beacon Network updates the service information of registered Beacons
            every midnight (0:00 UTC).
          </li>
          <li>
            Beacon Network uses ELIXIR AAI access tokens, issued by
            <code>https://login.elixir-czech.org/oidc/</code> with JWK available
            at <code>https://login.elixir-czech.org/oidc/jwk</code>.
          </li>
          <li>
            ELIXIR AAI is using
            <a
              href="https://github.com/ga4gh-duri/ga4gh-duri.github.io/blob/master/researcher_ids/RI_Claims_V1.md"
              >GA4GH DURI specification</a
            >
            for permission handling.
          </li>
          <li>
            Beacon Network's ELIXIR AAI JWT audience is
            <code>{{ audience }}</code
            >. GA4GH Passports have no audience.
          </li>
          <li>
            Beacon API specification doesn't declare how to indicate a dataset's
            access level. To convey this information in the UI, the Beacon can
            add <code>{"accessType": "LEVEL"}</code> to
            <code>datasetAlleleResponses</code>'s <code>info</code> key. The
            possible values are <code>"PUBLIC"</code> for public access,
            <code>"REGISTERED"</code> for Bona Fide access and
            <code>"CONTROLLED"</code> for application-controlled access. See the
            <a
              href="https://beaconpy-elixirbeacon.rahtiapp.fi/query?assemblyId=GRCh38&referenceName=MT&start=9&referenceBases=T&alternateBases=C&includeDatasetResponses=HIT"
              >example response</a
            >
            for how to specify a dataset's access level.
          </li>
          <li>
            Additional extra-specification values displayed in the results table
            are <code>referenceBases</code>, <code>alternateBases</code> and
            <code>variantType</code> which are useful for clarifying wildcards
            results. <code>start</code> and <code>end</code> can also be added
            to give insight on range queries. These keys are also shown in the
            <a
              href="https://beaconpy-elixirbeacon.rahtiapp.fi/query?assemblyId=GRCh38&referenceName=MT&start=9&referenceBases=T&alternateBases=C&includeDatasetResponses=HIT"
              >example response</a
            >.
          </li>
        </ol>
      </div>
      <div class="column"></div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import ConnectedBeaconTile from "@/components/ConnectedBeaconTile.vue";

export default {
  name: "RegistrationForm",
  components: {
    ConnectedBeaconTile,
  },
  data() {
    return {
      url: "",
      apikey: "",
      response: "",
      error: "",
      beacon: { organization: {} },
      registry: process.env.VUE_APP_REGISTRY_URL,
      aggregator: process.env.VUE_APP_AGGREGATOR_URL,
      ui: process.env.VUE_APP_UI_URL,
      audience: process.env.VUE_APP_JWT_AUDIENCE,
      securityDocument: process.env.VUE_APP_SECURITY_DOCUMENT,
    };
  },
  props: {},
  methods: {
    onSubmit: function () {
      // onSubmit is called when user inputs ENTER on search bar
      // proxy the event to the basicSearch function
      var vm = this;
      vm.registerButton();
    },
    registerButton: function () {
      // registerButton is called when user clicks register button
      var vm = this;
      vm.registerService();
    },
    registerService: function () {
      var vm = this;
      var registry = `${vm.registry}services`;
      var headers = {
        Authorization: vm.apikey,
        "Content-Type": "application/json",
      };
      var data = {
        type: "beacon",
        url: vm.url,
      };
      // console.log(vm.email, vm.url, vm.apikey);
      axios
        .post(registry, data, { headers: headers })
        .then((response) => {
          vm.response = response;
          // console.log(response)
          vm.getNewBeaconInfo();
        })
        .catch((error) => {
          vm.error = error.response;
          // console.log(error.response)
        });
    },
    getNewBeaconInfo: function () {
      var vm = this;

      var url = `${vm.registry}services/${vm.response.data.serviceId}`;

      axios
        .get(url)
        .then((resp) => {
          console.log(resp);
          vm.beacon = resp.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.form-container {
  text-align: left;
  margin: 0 auto 0 auto;
}
.text-container {
  text-align: left;
  margin: 50px auto 0 auto;
}
.return-button {
  margin: auto auto auto 15px;
}
code {
  color: #000;
}
.form-label {
  color: #363636;
  display: block;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5em;
}
.input-subtitle {
  display: block;
  font-size: 0.75rem;
  margin-top: -1rem;
  margin-bottom: 1rem;
}
</style>
