<template>
  <div class="container content advanced-form">
    <form @submit.prevent="advancedSearch">
      <h4>Variant Location</h4>
      <div class="columns">
        <div class="column">
          <b-field label="Assembly">
            <b-select v-model="assembly" expanded>
              <option v-for="asm in assemblies" :value="asm" :key="asm">
                {{ asm }}
              </option>
            </b-select>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Chromosome">
            <b-select v-model="referenceName" class="input-spacer" expanded>
              <option v-for="ref in referenceNames" :value="ref" :key="ref">
                {{ ref }}
              </option>
            </b-select>
          </b-field>
        </div>
        <div class="column">
          <h6 style="margin-top:5px">Coordinates</h6>
          <b-radio v-model="coordType" name="coordType" native-value="exact"
            >Exact</b-radio
          >
          <b-radio v-model="coordType" name="coordType" native-value="range"
            >Range</b-radio
          >
        </div>
        <div class="column">
          <b-field label="Start" v-if="coordType === 'exact'">
            <b-numberinput
              v-model="start"
              controls-position="compact"
              min="0"
              class="input-spacer"
            ></b-numberinput>
          </b-field>
          <b-field label="Minimum Start" v-if="coordType === 'range'">
            <b-numberinput
              v-model="startMin"
              controls-position="compact"
              min="0"
              class="input-spacer"
            ></b-numberinput>
          </b-field>
          <b-field label="Maximum Start" v-if="coordType === 'range'">
            <b-numberinput
              v-model="startMax"
              controls-position="compact"
              min="0"
              class="input-spacer"
            ></b-numberinput>
          </b-field>
        </div>
        <div class="column">
          <b-field label="End" v-if="coordType === 'exact'">
            <b-numberinput
              v-model="end"
              controls-position="compact"
              min="0"
              class="input-spacer"
            ></b-numberinput>
          </b-field>
          <b-field label="Minimum End" v-if="coordType === 'range'">
            <b-numberinput
              v-model="endMin"
              controls-position="compact"
              min="0"
              class="input-spacer"
            ></b-numberinput>
          </b-field>
          <b-field label="Maximum End" v-if="coordType === 'range'">
            <b-numberinput
              v-model="endMax"
              controls-position="compact"
              min="0"
              class="input-spacer"
            ></b-numberinput>
          </b-field>
        </div>
      </div>

      <h4>Variant Transformation</h4>
      <hr />
      <div class="columns">
        <div class="column">
          <b-field label="Reference Base(s)">
            <b-input
              v-model="refBases"
              pattern="[ATCGN]+"
              placeholder="ATCGN"
              expanded
            ></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Alternate Base(s)">
            <b-input
              v-model="altBases"
              v-on:input="resetVariantType"
              pattern="[ATCGN]+"
              placeholder="ATCGN"
              expanded
            ></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Variant Type">
            <b-select v-model="variantType" v-on:input="resetAltBases" expanded>
              <option v-for="vt in variantTypes" :value="vt" :key="vt">
                {{ vt }}
              </option>
            </b-select>
          </b-field>
        </div>
      </div>

      <b-message
        v-if="errorTooltip"
        type="is-danger"
        aria-close-label="Close notification"
        role="alert"
      >
        Form errors:
        <ol>
          <li v-for="err in errorMessages" :value="err" :key="err">
            {{ err }}
          </li>
        </ol>
      </b-message>

      <div class="search-footer">
        <b-button @click="resetForm" type="is-secondary" class="reset-button"
          >Reset</b-button
        >
        <b-button
          @click="advancedSearch"
          type="is-primary"
          class="search-button"
          >Search</b-button
        >
      </div>
    </form>
    <div class="search-footer">
      <span id="example" v-if="$route.path === '/'"
        ><strong>Quickstart: </strong>
        <a @click="exampleSearch">Example variant query</a></span
      >
      <span id="basicSearch"
        ><a @click="changeSearchForm">Basic Search</a></span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "AdvancedSearch",
  data() {
    return {
      errorMessage: "",
      errorMessages: [],
      errorTooltip: false,
      coordType: "exact",
      start: 0,
      startMin: 0,
      startMax: 0,
      end: 0,
      endMin: 0,
      endMax: 0,
      assembly: "GRCh38",
      assemblies: ["GRCh38", "GRCh37", "hg19"],
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
        "MNP"
      ],
      referenceName: "1",
      referenceNames: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "X",
        "Y",
        "MT"
      ]
    };
  },
  props: {},
  methods: {
    changeSearchForm: function() {
      this.$emit("changeSearchForm");
    },
    validateInput: function() {
      this.errorMessage = "";
      this.errorMessages = [];
      this.errorTooltip = false;
      // Validate referenceBases field
      if (!this.refBases) {
        this.validated = false;
        this.errorMessage =
          "Reference Base(s) must be given, possible values are: A, T, C, G, N.";
        this.errorMessages.push(
          "Reference Base(s) must be given, possible values are: A, T, C, G, N."
        );
        this.errorTooltip = true;
      }
      // Validate alternateBases field if variantType is unspecified
      if (this.altBases === "" && this.variantType == "Unspecified") {
        this.errorMessage =
          "Alternate Base(s) must be given if Variant Type is unspecified, possible values are: A, T, C, G, N.";
        this.errorMessages.push(
          "Alternate Base(s) must be given if Variant Type is unspecified, possible values are: A, T, C, G, N."
        );
        this.errorTooltip = true;
      }
      // Validate exact coords
      if (this.coordType === "exact") {
        if (this.start >= this.end && this.end != 0) {
          this.errorMessage =
            "End coordinate must be greater than Start coordinate.";
          this.errorMessages.push(
            "If End coordinate is set, it must be greater than Start coordinate."
          );
          this.errorTooltip = true;
        }
      }
      // Validate range coords
      if (this.coordType === "range") {
        if (this.startMin >= this.endMin) {
          this.errorMessages.push(
            "Minimum End coordinate must be greater than Minimum Start coordinate."
          );
          this.errorTooltip = true;
        }
        if (this.startMax >= this.endMax) {
          this.errorMessages.push(
            "Maximum End coordinate must be greater than Maximum Start coordinate."
          );
          this.errorTooltip = true;
        }
      }
    },
    advancedSearch: function() {
      this.validateInput();
      if (this.errorMessages.length === 0) {
        // Base query string
        var queryObj = {
          includeDatasetResponses: "HIT",
          assemblyId: this.assembly,
          referenceName: this.referenceName,
          referenceBases: this.refBases
        };
        // Handle the other params
        if (this.coordType === "exact") {
          queryObj.start = this.start;
          if (this.end != 0 && this.end > this.start) queryObj.end = this.end;
        }
        if (this.coordType === "range") {
          queryObj.startMin = this.startMin;
          queryObj.startMax = this.startMax;
          queryObj.endMin = this.endMin;
          queryObj.endMax = this.endMax;
        }
        if (this.altBases) {
          queryObj.alternateBases = this.altBases;
          this.variantType = "Unspecified";
        } else {
          queryObj.variantType = this.variantType;
          this.altBases = "";
        }
        // Change view to results and send GET query string
        this.$router.push(
          {
            path: "results",
            query: queryObj
          },
          undefined,
          () => {}
        );
      }
    },
    exampleSearch: function() {
      this.assemblyId = "GRCh38";
      this.referenceName = "MT";
      this.coordType = "range";
      this.startMin = 190;
      this.startMax = 200;
      this.endMin = 200;
      this.endMax = 210;
      this.refBases = "TTACTAAAGT";
      this.variantType = "MNP";
    },
    resetAltBases: function() {
      this.altBases = "";
    },
    resetVariantType: function() {
      this.variantType = "Unspecified";
    },
    resetForm: function() {
      this.assembly = "GRCh38";
      this.referenceName = "1";
      this.coordType = "exact";
      this.start = 0;
      this.end = 0;
      this.startMin = 0;
      this.startMax = 0;
      this.endMin = 0;
      this.endMax = 0;
      this.refBases = "";
      this.altBases = "";
      this.variantType = "Unspecified";
    }
  }
};
</script>

<style scoped>
span#basicSearch {
  margin-left: auto;
}
.stretch {
  width: 100%;
}
.search-footer {
  margin-top: 12px;
  margin-right: 5px;
  font-size: 0.9em;
  display: flex;
}
.search-footer span#example {
  margin-left: 5px;
}
.search-footer span#advancedSearch {
  margin-left: auto;
}
.search-button {
  margin-left: 10px;
}
.reset-button {
  margin-left: auto;
}
.input-spacer {
  padding: 0 20px 0 0;
}
.advanced-form {
  width: 65%;
}
.column-top-margin {
  margin-top: 20px;
}
</style>
