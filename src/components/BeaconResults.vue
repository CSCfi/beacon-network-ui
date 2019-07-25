<template>
    <section>
        <button v-on:click="queryAPI">Search</button>
        <b-field grouped group-multiline>
            <div class="control">
                <b-switch v-model="hits">Hits Only</b-switch>
            </div>
            <div class="control">
                <b-switch class="switch-public" v-model="pub" disabled>Public</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="registered" disabled>Registered</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="controlled" disabled>Controlled</b-switch>
            </div>
        </b-field>

        <b-table :data="response" :hits="hits" :loading="isLoading">

            <template slot-scope="props" v-if="props.row.exists || !hits">
                <b-table-column field="beacon" label="Beacon" sortable>
                    {{ props.row.beaconId }}
                </b-table-column>

                <b-table-column field="exists" label="Found" sortable>
                    {{ props.row.exists }}
                </b-table-column>

                <b-table-column field="Hits" label="Hits" sortable numeric>
                    {{ props.row.datasetAlleleResponses.length }}
                </b-table-column>

            </template>
            
            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="emoticon-sad"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>No results found.</p>
                    </div>
                </section>
            </template>
        </b-table>
    </section>
</template>

<script>
export default {
    data() {
        return {
            hits: true,
            pub: true,
            registered: true,
            controlled: true,
            isLoading: false,
            response: []
        }
    },
    methods: {
        queryAPI : function () {
            var vm = this;
            vm.response = [] // Clear table
            var queryParams = `assemblyId=GRCh38&referenceName=MT&start=9&referenceBases=T&alternateBases=C&includeDatasetResponses=HIT`;
            var websocket = new WebSocket(`wss://dev-aggregator-beacon.rahtiapp.fi/query?${queryParams}`);
        
            websocket.onopen = function(event) {
                // The connection was opened
                vm.isLoading = true;
                console.log('websocket opened');
            }; 
            websocket.onclose = function(event) { 
                // The connection was closed
                vm.isLoading = false;
                console.log('websocket closed');
            }; 
            websocket.onmessage = function(event) {
                // New message arrived
                console.log('websocket received data');
                // console.log(event.data);
                vm.response.push(JSON.parse(event.data));
            }; 
            websocket.onerror = function(event) { 
                // There was an error with your WebSocket
                vm.isLoading = false;
                console.log('websocket errored');
            };
        }
    }
}
</script>

<style scoped>
section {
    margin: 0 auto;
    margin-top: 50px;
    width: 80%;
}

.switch-public {
    color: green;
}
</style>