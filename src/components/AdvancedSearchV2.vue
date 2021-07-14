<template>
  <div class="container content">
    <h2>V2 search</h2>
    <form
      @submit.prevent="advancedSearchV2"
      title="Advanced Search Options for beaconv2"
    >
      <div v-for="(v2, index) of listV2" :key="index">
        <component :is="v2" ref="search"></component>
        <b-button v-if="checkListLenght()" v-on:click="removeInputfield(index)">
          Delete</b-button
        >
      </div>
      <b-message
        data-testid="errorMessage"
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
        <b-button
          @click="addComponent"
          data-testid="resetButton"
          type="is-secondary"
          title="Empty all form fields and reset the view to its initial state"
          >Add more search parameters</b-button
        >
        <b-button
          @click="resetForm"
          data-testid="resetButton"
          type="is-secondary"
          class="reset-button"
          title="Empty all form fields and reset the view to its initial state"
          >Reset Form</b-button
        >
        <b-button
          @click="advancedSearch"
          type="is-primary"
          class="search-button"
          id="searchButton"
          data-testid="searchTest"
          >Search</b-button
        >
      </div>
    </form>
    <div class="search-footer">
      <span id="example" v-if="$route.path === '/'">
        <b-button
          data-testid="exampleButton"
          @click="exampleSearch"
          title="Insert example search parameters to the form"
          >Example range query</b-button
        ></span
      >
      <span id="BeaconV1Search"
        ><b-button
          data-testid="beaconV1Advanced"
          @click="setV2()"
          title="Switch to the advanced search form which has more options"
          >BeaconV1 Search</b-button
        ></span
      >
      <span id="basicSearch"
        ><b-button
          data-testid="basic"
          @click="changeSearchForm"
          title="Switch back to the basic search bar"
          >Basic Search</b-button
        ></span
      >
    </div>
  </div>
</template>

<script>
import advancedv2Search from "./searchComponents/beaconV2Search.vue";
export default {
  name: "AdvancedSearch",
  components: {
    advancedv2Search
  },
  data() {
    return {
      listV2: [advancedv2Search],
      errorMessages: [],
      errorTooltip: false,
      componentRefs: {}
    };
  },
  methods: {
    setV2: function() {
      this.$emit("setV2");
    },
    changeSearchForm: function() {
      this.$emit("changeSearchForm");
    },
    validateInput: function() {},
    advancedSearch: function() {
      // add fucntionality when backend is implemented
      // Change view to results and send GET query string
      this.$router.push(
        {
          path: "results",
          query: queryObj
        },
        undefined,
        () => {}
      );
    },
    exampleSearch: function() {
      Object.keys(this.$refs).forEach(el => {
        this.$refs[el].forEach(element => {
          element.searchInInput = "Individulas";
          element.searchByInput = "Biosamples";
        });
      });
    },
    resetForm: function() {
      Object.keys(this.$refs).forEach(el => {
        this.$refs[el].forEach(element => {
          element.resetForm();
        });
      });
    },
    addComponent: function() {
      this.listV2.push(advancedv2Search);
    },
    checkListLenght: function() {
      if (this.listV2.length > 1) {
        return true;
      }
      return false;
    },
    removeInputfield(input) {
      var array = this.listV2;
      const index = input;
      if (index > -1) {
        array.splice(index, 1);
      }

      this.listV2 = array;
    }
  }
};
</script>

<style scoped>
span#BeaconV1Search {
  margin-left: auto;
}
span#basicSearch {
  margin-left: auto;
}
.stretch {
  width: 100%;
}
.search-footer {
  margin-top: 12px;
  font-size: 0.9em;
  display: flex;
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
.column-top-margin {
  margin-top: 20px;
}
/* fix safari bug https://github.com/jgthms/bulma/issues/2626 */
.select select {
  text-rendering: auto !important;
}
.form-label {
  color: #363636;
  display: block;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5em;
}
</style>
