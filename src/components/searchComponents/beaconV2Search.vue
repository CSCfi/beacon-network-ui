<template>
  <form @submit.prevent="beaconV2Search">
    <div></div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      id: 0,
      coordType: "exact",
      startMin: 0,
      startMax: 0,
      end: 0,
      endMin: 0,
      endMax: 0,
      searchInInput: "",
      searchInInputs: [
        "Individuals",
        "Biosamples",
        "G variants",
        "Runs",
        "Variants in sample",
        "Variant interpretations",
        "Analyses",
        "Interactors",
        "Cohorts"
      ],
      searchByInput: "",
      searchByInputs: ["Pick a search value first"]
    };
  },
  methods: {
    pickSearchBySet: function() {
      if (this.searchInInput == "Individuals") {
        this.searchByInputs = ["Biosamples", "G variants", "cohorts"];
      } else if (this.searchInInput == "Biosamples") {
        this.searchByInputs = [
          "Individuals",
          "G variants",
          "Runs",
          "Variants in sample"
        ];
      } else if (this.searchInInput == "G variants") {
        this.searchByInputs = [
          "Individuals",
          "Biosamples",
          "Variants in sample",
          "Variant interpretations"
        ];
      } else if (this.searchInInput == "Runs") {
        this.searchByInputs = ["Biosamples", "Analyses"];
      } else if (this.searchInInput == "Interactors") {
        this.searchByInputs = ["Individuals"];
      } else if (this.searchInInput == "Cohorts") {
        this.searchByInputs = ["Individuals"];
      }
    },
    exampleSearch: function() {
      this.searchInInput = "Individuals";
      this.searchByInput = "Biosamples";
      this.id = 123;
    },
    resetForm: function() {
      this.searchInInput = "";
      this.searchByInput = "";
      this.id = 0;
      this.searchByInputs = ["Pick a search value first"];
    }
  },
  beforeMount: function() {}
};
</script>
