<template>
  <section>
    <div class="results-section">
      <b-button
        :data-testid="beaconId"
        @click="displayResults"
        class="show-more"
        type="is-primary"
        :title="!display ? 'Show detailed response' : 'Hide detailed response'"
      >
        {{
          !display
            ? "Display " + results.length + " result(s)"
            : "Hide result(s)"
        }}
      </b-button>
      <div v-if="display" class="details-rows">
        <b-table
          :data="parsedResults"
          :striped="true"
          ref="table"
          class="column details-table"
          detailed
          @details-open="row => $buefy.toast.open(`Expanded ${row.id}`)"
        >
          <b-table-column label="Id" field="id" v-slot="props">
            <b-tag class="accessibility-green-tag"
              ><b>{{ getId(props) }}</b></b-tag
            >
          </b-table-column>
          <b-table-column label="Access">
            <template v-slot:default="parsedResults">
              <b-tag
                class="accessibility-green-tag"
                v-if="checkForPublicDatasets(parsedResults)"
                title="Dataset is in public access"
                ><b>Public</b></b-tag
              >
              <b-tag
                class="accessibility-yellow-tag"
                v-else-if="checkForRegisteredDatasets(parsedResults)"
                title="Dataset requires ELIXIR Bona Fide status to access"
                ><b>Registered</b></b-tag
              >
              <b-tag
                class="accessibility-red-tag"
                v-else-if="checkForControlledDatasets(parsedResults)"
                title="Dataset requires permissions from data owner to access"
                ><b>Controlled</b></b-tag
              >
              <b-tag class="access-tag" type="is-light" v-else>Unknown</b-tag>
            </template>
          </b-table-column>
          <template #detail="parsedResults">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <b-table
                    :data="objectToArray(parsedResults)"
                    ref="table"
                    class="column details-table"
                    detailed
                    @details-open="
                      row => $buefy.toast.open(`Expanded ${row.id}`)
                    "
                  >
                    <b-table-column v-slot="props">
                      <b>{{ props.row[0] }}</b>
                    </b-table-column>
                    <template #detail="props">
                      <div v-if="typeof props.row[1] == 'string'">
                        {{ props.row[1] }}
                      </div>
                      <div v-if="typeof props.row[1] == 'object'">
                        <ul v-for="(prop, index) in props.row[1]" :key="index">
                          <b v-if="typeof index == 'string'"> {{ index }}: </b>
                          <b v-if="prop == null">
                            No data
                          </b>
                          <b v-if="typeof prop != 'object'">
                            {{ prop }}
                          </b>
                          <div v-else class="listOfItems">
                            <li v-for="(item, index) in prop" :key="index">
                              {{ index }}:
                              <b v-if="typeof item != 'object'">
                                {{ item }}
                              </b>
                              <div v-else class="listOfItems">
                                <li v-for="(it, index) in item" :key="index">
                                  {{ index }}: {{ it }}
                                </li>
                              </div>
                            </li>
                          </div>
                        </ul>
                      </div>
                      <div v-if="props.row[1] == null">
                        No data
                      </div>
                    </template>
                  </b-table>
                </div>
              </div>
            </article>
          </template>
        </b-table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["results", "beaconId"],
  data() {
    return {
      showDetailIcon: true,
      display: false
    };
  },
  computed: {},
  methods: {
    getId: function(results) {
      if (Object.keys(results.row)[0] != "variant") {
        const id = Object.keys(results.row)[0];
        const spacedId =
          id.substring(0, id.length - 2) +
          "s " +
          id.substring(id.length - 2, id.length);
        return spacedId + ": " + results.row[Object.keys(results.row)[0]];
      } else {
        return "variants id: " + results.row.variant.variantId;
      }
    },
    getIndexById(id) {},
    checkObjectLenght: function(item) {
      if (item == null || item.lenght == 0) {
        return false;
      }
      if (item.lenght == 0) {
        return false;
      }
      return true;
    },
    checkIfObject: function(item) {
      if (typeof item === "object" && item !== null) {
        return false;
      }
      return true;
    },
    displayResults: function() {
      if (this.display) this.display = false;
      else this.display = true;
    },
    checkForPublicDatasets: function(result) {
      // commented to reduce error messages FIX LATER
      /*       console.log(result);
      if (result.row != null) {
        if (
          result.row.info &&
          result.row.info.accessType &&
          result.row.info.accessType == "PUBLIC"
        )
          return true;
      }
      return false; */
    },
    checkForRegisteredDatasets: function(result) {
      /*       if (result.row != null) {
        if (
          result.row.info &&
          result.row.info.accessType &&
          result.row.info.accessType == "REGISTERED"
        )
          return true;
      }
      return false; */
    },
    checkForControlledDatasets: function(result) {
      /* if (result.row != null) {
        if (
          result.row.info &&
          result.row.info.accessType &&
          result.row.info.accessType == "CONTROLLED"
        )
          return true;
      }
      return false; */
    },
    parseResultsToArray: function() {
      this.parsedResults = JSON.parse(JSON.stringify(this.$props.results));
    },
    objectToArray: function(object) {
      return Object.entries(object.row);
    }
  },
  beforeMount() {
    this.parseResultsToArray();
  }
};
</script>

<style scoped>
.listOfItems {
  margin-left: 50px;
}
#resultContent {
  border-bottom: 1px solid black;
}
.results-section {
  /* text-align: center; */
}
.show-more {
  display: block;
  margin: 0 auto;
  margin-right: 30px;
  margin-top: -60px;
  margin-bottom: 25px;
  /* width: 95%; */
  /* border-top: none; */
  /* border-top-left-radius: 0; */
  /* border-top-right-radius: 0; */
  /* background: rgb(224,224,224);
  background: linear-gradient(0deg, rgba(224,224,224,1) 0%, rgba(255,255,255,1) 10%);  */
  /* border-bottom: 5px solid #047eaa; */
}
/* .show-more:hover {
  background-color: #e0e0e0;
} */
.narrow-column {
  width: 15%;
}
.detail-row-vertical {
  padding-top: 5px;
  padding-bottom: 0;
}
.details-rows {
  margin: 10px 20px;
}
.hide-long-name {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.details-table {
  background: rgb(247, 247, 247);
  background: linear-gradient(
    180deg,
    rgba(247, 247, 247, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  margin-top: -10px;
}
.accessibility-green-tag {
  background-color: #29852a;
  color: #fff;
}
.accessibility-yellow-tag {
  background-color: #ffcc00;
  color: #000;
}
.accessibility-red-tag {
  background-color: #e90000;
  color: #fff;
}
</style>
