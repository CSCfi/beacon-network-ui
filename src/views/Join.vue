<template>
    <section>
		<div class="columns content return-container">
			<router-link to="/">Return</router-link>
		</div>

        <div class="columns content form-container">

			<div class="column">
				<h2>Beacon Registration Form</h2>
				<b-field label="Email" message="Contact address for the maintainer of this Beacon">
					<b-input type="email" maxlength="256">
					</b-input>
				</b-field>
				<b-field label="Beacon Info Endpoint" message="URL to the info endpoint of this Beacon">
					<b-input type="text" maxlength="512">
					</b-input>
				</b-field>
				<b-field label="API Key" message="API key to authorise this registration">
					<b-input type="text" minlength="64" maxlength="64">
					</b-input>
				</b-field>
				<b-field message="By registering you confirm that your Beacon service will uphold to the service requirements listed below.">
					<button class="button is-primary">Register</button>
				</b-field>
			</div>

			<div class="column">
				<h2>Preview</h2>
				Dev notes:

				<br>1. A preview `ConnectedBeaconTile` will be displayed here as a visual example, with data pulled from the address given in Beacon Info Endpoint field.
				Data can be pulled in the `blur` event (field un-focus event), and a non-200 response will also serve as a kind of validation of address.

				<br>2. Exceptions and errors from Registry API will also be displayed here.

				<br>3. Successful registration response from Registry API will also be displayed here. The response contains a confirmation message, service id and service key for the user to keep safe.
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
