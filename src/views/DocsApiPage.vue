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
    <h2>Advanced API User Guide</h2>
    <p>
      Your registration can be managed via the Registry API. A form similar to
      the registration form may be released in the future if need be. Your
      Beacon has been registered at the ELIXIR Beacon Network Registry residing
      at <a v-bind:href="registry">{{ registry }}</a
      >. For full API reference, please see the
      <a
        href="http://editor.swagger.io/?url=https://raw.githubusercontent.com/CSCfi/beacon-network/dev/beacon-network.yaml"
        >Beacon Network API specification</a
      >.
    </p>
    <h3>Deleting your Registration</h3>
    <p>
      Your registration can be deleted manually using the
      <code>serviceId</code> and <code>serviceKey</code> you received upon
      registration. If you have lost your Beacon service key and you wish to
      delete your registration, pleace contact
      <a href="mailto:bn-contact@elixir-europe.org"
        >bn-contact@elixir-europe.org</a
      >
      from the email address you used at registration.
    </p>
    <pre>
curl -X DELETE \
    {{ registry }}services/YOUR-BEACON-ID-HERE \
    -H 'Beacon-Service-Key: YOUR-SERVICE-KEY-HERE'</pre
    >
    <h3>Updating your Registration</h3>
    <p>
      If your Beacon info has changed, but the Registry is still displaying old
      information, you can trigger an update manually. Remember, that the
      Registry will still automatically refresh all information every midnight
      (0:00 UTC). Your registration can be updated manually using the
      <code>serviceId</code> and <code>serviceKey</code> you received upon
      registration. If you have lost your Beacon service key and you wish to
      delete your registration, pleace contact
      <a href="mailto:bn-contact@elixir-europe.org"
        >bn-contact@elixir-europe.org</a
      >
      from the email address you used at registration. Your Beacon service will
      then be manually removed from the Network, and then you can re-register
      your Beacon using the registration form, which will return you with a new
      service key.
    </p>
    <pre>
curl -X PUT \
    {{ registry }}services/YOUR-BEACON-ID-HERE \
    -H 'Beacon-Service-Key: YOUR-SERVICE-KEY-HERE'
    -H 'Content-Type: application/json' \
    -d '{
        "type": "beacon",
        "url": "YOUR-BEACON-INFO-ENDPOINT-HERE"
    }'
</pre
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      registry: process.env.VUE_APP_REGISTRY_URL,
    };
  },
};
</script>

<style lang="scss" scoped>
.word-wrap {
  margin: 0 auto;
  max-width: 80ch;
  padding-bottom: 25px;
  text-align: left;
}
code {
  color: #000;
}
</style>
