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
          :data="results"
          :striped="true"
          ref="table"
          class="column details-table"
          detailed
          @details-open="row => $buefy.toast.open(`Expanded ${row.id}`)"
        >
          <b-table-column label="Id" field="id" v-slot="results">
            <b-tag
              class="accessibility-green-tag"
              title="Dataset is in public access"
              ><b>{{ getId(results) }}</b></b-tag
            >
          </b-table-column>
          <b-table-column label="Access">
            <template v-slot:default="results">
              <b-tag
                class="accessibility-green-tag"
                v-if="checkForPublicDatasets(results)"
                title="Dataset is in public access"
                ><b>Public</b></b-tag
              >
              <b-tag
                class="accessibility-yellow-tag"
                v-else-if="checkForRegisteredDatasets(results.row)"
                title="Dataset requires ELIXIR Bona Fide status to access"
                ><b>Registered</b></b-tag
              >
              <b-tag
                class="accessibility-red-tag"
                v-else-if="checkForControlledDatasets(results.row)"
                title="Dataset requires permissions from data owner to access"
                ><b>Controlled</b></b-tag
              >
              <b-tag class="access-tag" type="is-light" v-else>Unknown</b-tag>
            </template>
          </b-table-column>
          <template #detail="results">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <ul v-for="(result, index) in results" :key="index">
                    <ul
                      id="resultContent"
                      v-for="(content, index) in result"
                      :key="index"
                    >
                      {{
                        index + ": "
                      }}
                      <span v-if="checkIfObject(content)">
                        {{ content }}
                      </span>
                      <ul v-else v-for="(content, indx) in content" :key="indx">
                        <span v-if="checkIfObject(content)">
                          {{ indx + ": " }}
                          {{ content }}
                        </span>
                        <div v-else v-for="(cont, ind) in content" :key="ind">
                          <span v-if="checkIfObject(cont)">
                            {{ ind + ": " + cont }}
                          </span>
                          <div v-else v-for="(con, inx) in cont" :key="inx">
                            <span v-if="checkIfObject(con)">
                              {{ inx + ": " + con }}
                            </span>
                            <div v-else v-for="(co, ix) in con" :key="ix">
                              <span v-if="checkIfObject(co)">
                                {{ ix + ": " + co }}
                              </span>
                              <div v-else v-for="(c, i) in co" :key="i">
                                {{ i + ": " + c }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </ul>
                    </ul>
                  </ul>
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
  watch: {},
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
      if (
        result.info &&
        result.info.accessType &&
        result.info.accessType == "PUBLIC"
      )
        return true;
    },
    checkForRegisteredDatasets: function(result) {
      if (
        result.info &&
        result.info.accessType &&
        result.info.accessType == "REGISTERED"
      )
        return true;
    },
    checkForControlledDatasets: function(result) {
      if (
        result.info &&
        result.info.accessType &&
        result.info.accessType == "CONTROLLED"
      )
        return true;
    }
  },
  beforeMount() {}
};
</script>

<style scoped>
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
