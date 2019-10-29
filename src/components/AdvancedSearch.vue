<template>
  <div>
    Advanced Form
    <span id="basicSearch"><a @click="changeSearchForm">Basic Search</a></span>
  </div>
</template>

<script>
export default {
  name: "AdvancedSearch",
  data() {
    return {
      query: "",
      assembly: "GRCh38",
      validated: false,
      errorMessage: "",
      errorTooltip: false,
      variantTypes: [
        "DEL:ME",
        "INS:ME",
        "DUP:TANDEM",
        "DUP",
        "DEL",
        "INS",
        "INV",
        "CNV",
        "SNP",
        "MNP"
      ]
    };
  },
  props: {},
  methods: {
    changeSearchForm: function() {
      this.$emit("changeSearchForm");
    }
  }
};
</script>

<style scoped></style>
