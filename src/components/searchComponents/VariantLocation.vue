<template>
  <form @submit.prevent="VariantLocation">
    <div>
      <h2>Variant Location</h2>
      <div class="columns">
        <div class="column" v-if="isBeaconV2">
          <label class="form-label" for="searchInInput"> Dataset</label>
          <b-select
            id="searchInInput"
            data-testid="inInput"
            v-model="searchInInput"
            expanded
          >
            <option
              data-testid="inputOption"
              v-for="(input1, index) in searchInInputs"
              :value="input1"
              :key="index"
            >
              {{ input1 }}
            </option>
          </b-select>
        </div>
        <div class="column">
          <label class="form-label" for="assembly">Assembly</label>
          <b-input
            data-testid="assemblyInput"
            list="assembly"
            v-model="assembly"
          ></b-input>
          <datalist id="assembly">
            <option
              data-testid="assemblyOption"
              v-for="asm in assemblies"
              :value="asm"
              :key="asm"
              :title="'Assembly ID ' + asm"
            >
              {{ asm }}
            </option>
          </datalist>
        </div>
        <div class="column">
          <label class="form-label" for="chromosome">Chromosome</label>
          <b-select
            title="Chromosome"
            data-testid="chromosome"
            v-model="referenceName"
            expanded
          >
            <option
              data-testid="chromosomeOption"
              v-for="ref in referenceNames"
              :value="ref"
              :key="ref"
              :title="'Chromosome ' + ref"
            >
              {{ ref }}
            </option>
          </b-select>
        </div>
        <div class="column">
          <fieldset>
            <legend><b>Coordinates</b></legend>
            <b-radio
              data-testid="coordTypeExact"
              style="margin-top: 15px"
              v-model="coordType"
              name="coordType"
              native-value="exact"
              >Exact</b-radio
            >
            <b-radio
              data-testid="coordTypeRange"
              v-model="coordType"
              name="coordType"
              native-value="range"
              >Range</b-radio
            >
          </fieldset>
        </div>
        <div class="column">
          <label class="form-label" for="start" v-if="coordType === 'exact'"
            >Start</label
          >
          <b-input
            data-testid="start"
            v-if="coordType === 'exact'"
            type="number"
            v-model="start"
            controls-position="compact"
            min="0"
            title="Exact start coordinate"
          ></b-input>
          <label class="form-label" for="minStart" v-if="coordType === 'range'"
            >Minimum Start</label
          >
          <b-input
            data-testid="minStart"
            v-if="coordType === 'range'"
            type="number"
            v-model="startMin"
            controls-position="compact"
            min="0"
            title="Minimum start coordinate of range"
          ></b-input>
          <label class="form-label" for="maxStart" v-if="coordType === 'range'"
            >Maximum Start</label
          >
          <b-input
            data-testid="maxStart"
            v-if="coordType === 'range'"
            type="number"
            v-model="startMax"
            controls-position="compact"
            min="0"
            title="Maximum start coordinate of range"
          ></b-input>
        </div>
        <div class="column">
          <label class="form-label" for="end" v-if="coordType === 'exact'"
            >End</label
          >
          <b-input
            data-testid="end"
            v-if="coordType === 'exact'"
            type="number"
            v-model="end"
            min="0"
            title="Exact end coordinate"
          ></b-input>
          <label class="form-label" for="minEnd" v-if="coordType === 'range'"
            >Minimum End</label
          >
          <b-input
            data-testid="minEnd"
            v-if="coordType === 'range'"
            type="number"
            v-model="endMin"
            controls-position="compact"
            min="0"
            title="Minimum end coordinate of range"
          ></b-input>
          <label class="form-label" for="maxEnd" v-if="coordType === 'range'"
            >Maximum End</label
          >
          <b-input
            data-testid="maxEnd"
            v-if="coordType === 'range'"
            type="number"
            v-model="endMax"
            controls-position="compact"
            min="0"
            title="Maximum end coordinate of range"
          ></b-input>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
export default {
  props: ["isBeaconV2"],
  name: "VariantLocation",
  data() {
    return {
      start: 0,
      coordType: "exact",
      startMin: 0,
      startMax: 0,
      end: 0,
      endMin: 0,
      endMax: 0,
      assembly: "",
      assemblies: ["GRCh38", "GRCh37.p1", "hg19"],
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
        "MT",
      ],
      searchInInput: "individuals",
      searchInInputs: [
        "individuals",
        "biosamples",
        "g_variants",
        "runs",
        "analyses",
        "interactors",
        "cohorts",
      ],
    };
  },
  methods: {
    exampleSearch: function () {
      if (this.$props.isBeaconV2) {
        this.searchInInput = "g_variants";
        this.assembly = "GRCh37.p1";
        this.referenceName = "21";
        this.coordType = "range";
        this.startMin = 42809490;
        this.startMax = 42809491;
        this.endMin = 42809491;
        this.endMax = 42809492;
      } else {
        this.assembly = "GRCh38";
        this.referenceName = "MT";
        this.coordType = "range";
        this.startMin = 190;
        this.startMax = 200;
        this.endMin = 200;
        this.endMax = 210;
      }
    },
    resetForm: function () {
      this.assembly = "";
      this.referenceName = "1";
      this.coordType = "exact";
      this.start = 0;
      this.end = 0;
      this.startMin = 0;
      this.startMax = 0;
      this.endMin = 0;
      this.endMax = 0;
    },
  },
  beforeMount: function () {
    if (this.$route.query.searchType == "advanced") {
      this.assembly = this.$route.query.assemblyId;
      this.referenceName = this.$route.query.referenceName;
      this.coordType = this.$route.query.coordType;
      this.start = parseInt(this.$route.query.start) + 1;
      this.end = parseInt(this.$route.query.end) + 1;
      this.startMin = parseInt(this.$route.query.startMin) + 1;
      this.startMax = parseInt(this.$route.query.startMax) + 1;
      this.endMin = parseInt(this.$route.query.endMin) + 1;
      this.endMax = parseInt(this.$route.query.endMax) + 1;
    }
  },
};
</script>
