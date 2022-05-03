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
          :hover="true"
          @details-open="(row) => $buefy.toast.open(`Expanded ${row.id}`)"
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
                v-if="checkForPublicDatasets(results)"
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
                  <!-- 1st table -->
                  <b-table
                    :data="objectToArray(parsedResults)"
                    ref="table"
                    class="column details-table"
                    detailed
                    @details-open="
                      (row) => $buefy.toast.open(`Expanded ${row.id}`)
                    "
                  >
                    <b-table-column v-slot="props">
                      <b>{{ props.row[0] }}</b>
                    </b-table-column>

                    <template #detail="props">
                      <!-- 2nd table -->
                      <div
                        v-if="
                          typeof props.row[1] == 'string' ||
                          typeof props.row[1] == 'number'
                        "
                      >
                        {{ props.row[1] }}
                      </div>

                      <div
                        v-if="
                          props.row[1] != null &&
                          typeof props.row[1] == 'object'
                        "
                      >
                        <ul v-for="(prop, index) in props.row[1]" :key="index">
                          <div v-if="typeof prop != 'object'">
                            <b>{{ index }}: {{ prop }}</b>
                          </div>
                        </ul>

                        <b-table
                          v-if="
                            props.row[1] != null &&
                            props.row[1][0] != undefined &&
                            props.row[1][0].sampleOriginType != null
                          "
                          :data="props.row[1]"
                          :columns="columns"
                        >
                        </b-table>
                        <b-table
                          v-if="
                            props.row != null && props.row[0] === 'handovers'
                          "
                          :data="props.row[1]"
                        >
                          <b-table-column label="Url" v-slot="props">
                            <a :href="props.row.url">{{
                              parseUrl(props.row.url)
                            }}</a>
                          </b-table-column>
                          <b-table-column label="Note" v-slot="props">
                            {{ props.row.note }}
                          </b-table-column>
                        </b-table>
                        <!-- 3rd table -->
                        <ul
                          v-for="(prop, index) in props.row[1]"
                          :key="index + 1432"
                        >
                          <template
                            v-if="
                              prop != null && prop.sampleOriginType != undefined
                            "
                          >
                          </template>
                          <div
                            v-if="
                              typeof prop == 'object' &&
                              prop != null &&
                              prop.sampleOriginType == null &&
                              props.row != null &&
                              props.row[0] !== 'handovers'
                            "
                          >
                            <b-table
                              :data="[{ key: index, value: prop }]"
                              ref="table"
                              class="column details-table"
                              detailed
                              @details-open="
                                (row) => $buefy.toast.open(`Expanded ${row.id}`)
                              "
                            >
                              <b-table-column v-slot="props">
                                <b v-if="typeof props.row.key != 'number'">
                                  {{ props.row.key }}
                                </b>
                                <b v-else>{{ getResultId(props.row.value) }}</b>
                              </b-table-column>
                              <template #detail="props">
                                <b
                                  v-if="
                                    props.row.value === null ||
                                    props.row.value.length == 0
                                  "
                                  >No data</b
                                >
                                <ul
                                  v-for="(value, index) in props.row.value"
                                  :key="index"
                                >
                                  <b-table
                                    v-if="
                                      typeof value == 'object' && value != null
                                    "
                                    :data="[{ key: index, value: value }]"
                                    ref="table"
                                    class="column details-table"
                                    detailed
                                    @details-open="
                                      (row) =>
                                        $buefy.toast.open(`Expanded ${row.id}`)
                                    "
                                  >
                                    <b-table-column v-slot="props">
                                      <b>{{ props.row.key }}</b>
                                    </b-table-column>

                                    <template #detail="props">
                                      <b-table
                                        v-if="
                                          props.row.key != null &&
                                          props.row.key === 'handovers'
                                        "
                                        :data="props.row.value"
                                      >
                                        <b-table-column
                                          label="Url"
                                          v-slot="props"
                                        >
                                          <a :href="props.row.url">{{
                                            parseUrl(props.row.url)
                                          }}</a>
                                        </b-table-column>
                                        <b-table-column
                                          label="Note"
                                          v-slot="props"
                                        >
                                          {{ props.row.note }}
                                        </b-table-column>
                                      </b-table>
                                      <div v-else>
                                        <ul
                                          v-for="(item, index) in props.row
                                            .value"
                                          :key="index"
                                        >
                                          {{
                                            index
                                          }}:
                                          {{
                                            item
                                          }}
                                        </ul>
                                      </div>
                                    </template>
                                  </b-table>
                                  <b v-else-if="value != null"
                                    >{{ index }}: {{ value }}</b
                                  >
                                  <b v-else>{{ index }}: No data</b>
                                </ul>
                              </template>
                            </b-table>
                          </div>
                        </ul>
                      </div>

                      <div
                        v-if="props.row[1] == null || props.row[1].length == 0"
                      >
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

      display: false,
      columns: [
        { field: "sampleOriginType", label: "Sample Origin Type" },
        { field: "sampleOriginDetail", label: "Sample Origin Detail" },
      ],
      columnsForHandovers: [
        { field: "url", label: "Url" },
        { field: "note", label: "Note" },
      ],
    };
  },
  computed: {},
  methods: {
    getResultId(results) {
      for (var result in results) {
        if (result.includes("Id")) {
          return result + ": " + results[result];
        }
      }
      return "No id";
    },
    parseUrl(url) {
      const urlSplit = url.split("/");
      return urlSplit[2];
    },

    getId: function (results) {
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

    checkIfObject: function (item) {
      if (typeof item === "object" && item !== null) {
        return false;
      }
      return true;
    },
    displayResults: function () {
      if (this.display) this.display = false;
      else this.display = true;
    },
    checkForPublicDatasets: function (result) {
      if (result.row != null) {
        if (
          result.row.info &&
          result.row.info.accessType &&
          result.row.info.accessType == "PUBLIC"
        )
          return true;
      }
      return false;
    },
    checkForRegisteredDatasets: function (result) {
      if (result.row != null) {
        if (
          result.row.info &&
          result.row.info.accessType &&
          result.row.info.accessType == "REGISTERED"
        )
          return true;
      }
      return false;
    },
    checkForControlledDatasets: function (result) {
      if (result.row != null) {
        if (
          result.row.info &&
          result.row.info.accessType &&
          result.row.info.accessType == "CONTROLLED"
        )
          return true;
      }
      return false;
    },
    parseResultsToArray: function () {
      this.parsedResults = JSON.parse(JSON.stringify(this.$props.results));
    },
    objectToArray: function (object) {
      return Object.entries(object.row);
    },
  },
  beforeMount() {
    this.parseResultsToArray();
  },
};
</script>

<style scoped>
.listOfItems {
  margin-left: 50px;
}

#resultContent {
  border-bottom: 1px solid black;
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
