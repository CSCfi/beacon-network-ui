<template>
    <section>

        <b-field grouped group-multiline>
            <div class="control">
                <b-switch v-model="hits">Hits Only</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="pub" disabled>Public</b-switch>
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
            queryParams: undefined,
            hits: true,
            pub: true,
            registered: true,
            controlled: true,
            isLoading: false,
            response: [],
            variantTypes: ["DEL:ME", "INS:ME", "DUP:TANDEM", "DUP", "DEL", "INS", "INV", "CNV", "SNP", "MNP"],
            aggregator: process.env.VUE_APP_AGGREGATOR_URL
        }
    },
    watch: {
        "$route.query.query": function() {
            // Watch query string for changes in case the user makes a new
            // search while displaying results.
            this.parseQuery();
            this.queryAPI();
        }
    },
    methods: {
        queryAPI: function() {
            var vm = this;
            var queryString = vm.constructQueryString()
            // console.log(queryString)
            vm.response = [] // Clear table
            var wss = vm.aggregator.replace("https", "wss") // change aggregator https url to wss
            var websocket = new WebSocket(`${wss}query?${queryString}`);
        
            websocket.onopen = function(event) {
                // The connection was opened
                vm.isLoading = true;
                // console.log('websocket opened');
            }; 
            websocket.onclose = function(event) { 
                // The connection was closed
                vm.isLoading = false;
                // console.log('websocket closed');
            }; 
            websocket.onmessage = function(event) {
                // New message arrived
                // console.log('websocket received data');
                // console.log(event.data);
                vm.response.push(JSON.parse(event.data));
            }; 
            websocket.onerror = function(event) { 
                // There was an error with your WebSocket
                vm.isLoading = false;
                // console.log('websocket errored');
            };
        },
        constructQueryString: function() {
            var vm = this
            var baseString = `assemblyId=${vm.queryParams["assemblyId"]}&referenceName=${vm.queryParams["referenceName"]}\
&referenceBases=${vm.queryParams["referenceBases"]}&startMin=${vm.queryParams["startMin"]}\
&startMax=${vm.queryParams["startMax"]}&includeDatasetResponses=HIT`
            if ("alternateBases" in vm.queryParams) {
                baseString = baseString + `&alternateBases=${vm.queryParams["alternateBases"]}`
            } else if ("variantType" in vm.queryParams) {
                baseString = baseString + `&variantType=${vm.queryParams["variantType"]}`
            } else {
                console.log('Malformed query string.')
            }
            return baseString
        },
        parseQuery: function() {
            var vm = this
            var q = vm.$route.query.query.split(" ")
            var queryParams = {
              "assemblyId": vm.$route.query.assembly,
              "referenceName": q[0],
              "startMin": q[2] > 0 ? q[2]-1 : 0,
              "startMax": q[2],
              "referenceBases": q[3],
            }

            if (vm.variantTypes.includes(q[5])) {
              // q[5] is a variantType
              queryParams["variantType"] = q[5]
            } else {
              // q[5] is an alternateBases
              queryParams["alternateBases"] = q[5]
            }

            vm.queryParams = queryParams
        }
    },
    beforeMount () {
        this.parseQuery();
        this.queryAPI();
    }
}
</script>

<style scoped>
section {
    margin: 0 auto;
    margin-top: 50px;
    width: 80%;
}
</style>
