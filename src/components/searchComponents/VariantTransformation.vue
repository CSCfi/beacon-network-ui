<template>
  <form @submit.prevent="VariantTrasformation">
    <div>
      <h2>Variant Transformation</h2>
      <div class="columns">
        <div class="column">
          <label class="form-label" for="referenceBases"
            >Reference Base(s)</label
          >
          <b-input
            data-testid="referenceBases"
            v-model="refBases"
            pattern="[ATCGN]+"
            placeholder="ATCGN"
            expanded
            title="Sequence of reference bases"
          ></b-input>
        </div>
        <div class="column">
          <label class="form-label" for="alternateBases"
            >Alternate Base(s)</label
          >
          <b-input
            data-testid="alternateBases"
            v-model="altBases"
            v-on:input="resetVariantType"
            pattern="[ATCGN]+"
            placeholder="ATCGN"
            expanded
            title="Sequence of alternate bases"
          ></b-input>
        </div>
        <div class="column">
          <label class="form-label" for="variantType">Variant Type</label>
          <b-select
            data-testid="variantType"
            v-model="variantType"
            v-on:input="resetAltBases"
            expanded
            title="Variant type"
          >
            <option
              data-testid="variantOption"
              v-for="vt in variantTypes"
              :value="vt"
              :key="vt"
              :title="'Variant type ' + vt"
            >
              {{ vt }}
            </option>
          </b-select>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
export default {
  props: ["isBeaconV2"],
  name: "VariantTrasformation",
  data() {
    return {
      refBases: "",
      altBases: "",
      variantType: "Unspecified",
      variantTypes: [
        "Unspecified",
        "DEL:ME",
        "INS:ME",
        "DUP:TANDEM",
        "DUP",
        "DEL",
        "INS",
        "INV",
        "CNV",
        "SNP",
        "MNP",
      ],
    };
  },
  methods: {
    exampleSearch: function () {
      if (this.$props.isBeaconV2) {
        this.variantType = "DEL";
      } else {
        this.refBases = "TTACTAAAGT";
        this.variantType = "MNP";
      }
    },
    resetForm: function () {
      this.refBases = "";

      this.variantType = "Unspecified";
    },
    resetAltBases: function () {
      this.altBases = "";
    },
    resetVariantType: function () {
      this.variantType = "Unspecified";
    },
  },
  beforeMount: function () {
    if (this.$route.query.searchType == "advanced") {
      this.refBases = this.$route.query.referenceBases;
      this.altBases = this.$route.query.alternateBases;
      this.variantType = this.$route.query.variantType;
    }
  },
};
</script>
