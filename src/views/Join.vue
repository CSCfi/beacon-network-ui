<template>
    <section>
		<div class="columns content return-container">
			<router-link to="/">Return</router-link>
		</div>

        	<div class="columns content form-container">
				<div class="column">
					<form @submit.prevent="onSubmit">
						<h2>Beacon Registration Form</h2>
						<b-field label="Email" message="Contact address for the maintainer of this Beacon">
							<b-input v-model="email" id="email" type="email" maxlength="256" placeholder="admin@beacon.org">
							</b-input>
						</b-field>
						<b-field label="Beacon Info Endpoint" message="https:// address to the info endpoint of this Beacon">
							<b-input v-model="url" id="url" type="url" pattern="https://.*" maxlength="512" placeholder="https://beacon.org/">
							</b-input>
						</b-field>
						<b-field label="API Key" message="API key to authorise this registration">
							<b-input v-model="apikey" id="apikey" type="password" minlength="64" maxlength="64" placeholder="secret">
							</b-input>
						</b-field>
						<b-field message="By registering you confirm that your Beacon service will uphold to the service requirements listed below.">
							<button v-on:click="registerButton" class="button is-primary">Register</button>
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
						v-bind:beacon="beacon">
					</ConnectedBeaconTile>
				</div>
				<div v-if="response">
					<b-message v-bind:title="response.statusText" type="is-success" aria-close-label="Close message">
						{{ response.data.message }}<br>
						<b>Service ID:</b> {{ response.data.serviceId }}<br>
						<b>Service Key:</b> {{ response.data.serviceKey }}<br>
						<b>Help:</b> {{ response.data.help }} (technical documentation)<br>
					</b-message>
				</div>
				<div v-if="!response && error">
					<b-message v-bind:title="error.statusText" type="is-warning" aria-close-label="Close message">
						{{ error.data }}
					</b-message>
				</div>
			</div>

        </div>
		<div class="columns content text-container">
			<div class="column">
				<h2>Beacon Requirements</h2>
				<p>
					By registering your Beacon service to ELIXIR Beacon Network, you agree that your service is upholding to the following requirements, and
					will continue to do so as long as the service is a member of this network.
				</p>
				<p>
					...
				</p>
			</div>
			<div class="column">
				<h2>Advanced API User Guide</h2>
				<p>
					How to use the Registry API to manage your registration.
				</p>
				<p>
					...
				</p>
			</div>
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
			email: "",
			url: "",
			apikey: "",
			response: "",
			error: "",
			beacon: {"organization": {}}
		}
	},
	props: {

	},
	methods: {
		onSubmit: function() {
			// onSubmit is called when user inputs ENTER on search bar
			// proxy the event to the basicSearch function
			var vm = this;
			vm.registerButton();
		},
		registerButton: function() {
			// registerButton is called when user clicks register button
			var vm = this;
			vm.registerService();
		},
		registerService: function() {
			// axios makes 2 requests to registry
			// first axios sends an OPTIONS
			// then axios sends the wanted POST
			// it appears, that the service registration passes on the first request
			// the second request will land after the service has been registered
			// for some reason the OPTIONS is also processed like a POST
			// and this causes the ui to receive both "success 201" and "conflict 409"
			// messages to be shown. investigate how to fix this.
			// 1. use text/plain and JSON.stringify() the data ;; tested, didn't have any effect
			// 2. somehow put a delay on the request, so that the OPTIONS will be able to do
			//    a round trip before POST is initiated
			// 3. somehow turn the OPTIONS request off
			// the Registry has CORS enabled
			var vm = this;
			var registry = "https://dev-registry-beacon.rahtiapp.fi/services";
			var headers = {
				"Authorization": vm.apikey,
				"Content-Type": "application/json"
			}
			var data = {
				"email": vm.email,
				"type": "org.ga4gh:beacon",
				"url": vm.url
			}
			// console.log(vm.email, vm.url, vm.apikey);
			axios
				.post(registry, data, {headers: headers})
				.then(response => {
					vm.response = response
					// console.log(response)
					vm.getNewBeaconInfo();
				})
				.catch(error => {
					vm.error = error.response
					// console.log(error.response)
				})
		},
		getNewBeaconInfo : function () {
			var vm = this;

			var url = `https://dev-registry-beacon.rahtiapp.fi/services/${vm.response.data.serviceId}`;

			axios
				.get(url)
				.then(resp => {
					console.log(resp);
					vm.beacon = resp.data;
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
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
.return-container {
	text-align: left;
	margin: 100px auto auto 15px;
}
</style>
