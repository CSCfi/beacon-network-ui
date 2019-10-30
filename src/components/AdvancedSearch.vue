<template>
  <div class="container content advanced-form">
    <form @submit.prevent="onSubmit">
      <h4>Target</h4>
      <hr />
      <div class="columns">
        <b-field label="Assembly">
          <b-select v-model="assembly" class="input-spacer">
            <option v-for="a in assemblies" :value="a" :key="a">
              {{ a }}
            </option>
          </b-select>
        </b-field>
        <b-field label="Chromosome">
          <b-select v-model="chromosome" class="input-spacer">
            <option v-for="c in chromosomes" :value="c" :key="c">
              {{ c }}
            </option>
          </b-select>
        </b-field>
      </div>

      <h4>Coordinates</h4>
      <hr />
      <div class="columns">
        <b-radio v-model="coordBase" name="coordBase" native-value="0"
          >0-based</b-radio
        >
        <b-radio v-model="coordBase" name="coordBase" native-value="1"
          >1-based</b-radio
        >
      </div>
      <div class="columns" style="margin-top: 10px;">
        <b-field label="Start">
          <b-numberinput
            v-model="start"
            controls-position="compact"
            min="0"
            class="input-spacer"
          ></b-numberinput>
        </b-field>
        <b-field label="Minimum Start">
          <b-numberinput
            v-model="startMin"
            controls-position="compact"
            min="0"
            class="input-spacer"
          ></b-numberinput>
        </b-field>
        <b-field label="Maximum Start">
          <b-numberinput
            v-model="startMax"
            controls-position="compact"
            min="0"
            class="input-spacer"
          ></b-numberinput>
        </b-field>
      </div>

      <div class="columns">
        <b-field label="End">
          <b-numberinput
            v-model="end"
            controls-position="compact"
            min="0"
            class="input-spacer"
          ></b-numberinput>
        </b-field>
        <b-field label="Minimum End">
          <b-numberinput
            v-model="endMin"
            controls-position="compact"
            min="0"
            class="input-spacer"
          ></b-numberinput>
        </b-field>
        <b-field label="Maximum End">
          <b-numberinput
            v-model="endMax"
            controls-position="compact"
            min="0"
            class="input-spacer"
          ></b-numberinput>
        </b-field>
      </div>

      <h4>Variant Transformation</h4>
      <hr />
      <div class="columns">
        <b-field label="Reference Base(s)">
          <b-tooltip animated position="is-bottom" label="A, T, C, G, N">
            <b-input pattern="[ATCGN]+" class="input-spacer"></b-input>
          </b-tooltip>
        </b-field>
        <b-field label="Alternate Base(s)">
          <b-tooltip animated position="is-bottom" label="A, T, C, G, N">
            <b-input pattern="[ATCGN]+" class="input-spacer"></b-input>
          </b-tooltip>
        </b-field>
        <b-field label="Variant Type">
          <b-select v-model="variantType" class="input-spacer">
            <option v-for="vt in variantTypes" :value="vt" :key="vt">
              {{ vt }}
            </option>
          </b-select>
        </b-field>
      </div>

      <div class="search-footer">
        <b-button
          v-on:click="basicSearch"
          type="is-primary"
          class="searchButton"
          >Search</b-button
        >
      </div>
    </form>
    <div class="search-footer">
      <span id="example" v-if="$route.path === '/'"
        ><strong>Quickstart: </strong>
        <a v-on:click="exampleSearch">Example variant query</a></span
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
      query: "",
      validated: false,
      errorMessage: "",
      errorTooltip: false,
      coordBase: 0,
      coords: { start: 0 },
      assembly: "GRCh38",
      assemblies: ["GRCh38", "GRCh37", "hg19"],
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
      chromosome: "1",
      chromosomes: [
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
.searchButton {
  margin-left: auto;
}
.input-spacer {
  padding: 0 20px 0 0;
}
.advanced-form {
  width: 65%;
}
</style>
