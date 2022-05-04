<template>
  <section title="History of searches in current session">
    <nav class="panel">
      <p class="panel-heading">Search history</p>
      <div v-if="!isNotEmpty">
        We could not find any previous queries. Please try searching something.
        <router-link to="/">
          <a> Return to front page</a>
        </router-link>
      </div>
      <b-table
        v-if="isNotEmpty"
        :data="searches"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple"
        :pagination-position="paginationPosition"
        :default-sort-direction="defaultSortDirection"
        :pagination-rounded="isPaginationRounded"
        :sort-icon="sortIcon"
        :sort-icon-size="sortIconSize"
        :bordered="isBordered"
      >
        <b-table-column
          field="searches.url"
          label="URL "
          width="100"
          v-slot="props"
        >
          <router-link :to="parseUrl(props.row.url)">
            <a class="panel-block is-active" data-testid="beaconButton">
              <span
                v-if="urlIsBasic(props.row.url)"
                class="tag is-success is-light"
              >
                {{ parseUrl(props.row.url) }}
              </span>

              <span
                id="tooltip-target-1"
                v-if="!urlIsBasic(props.row.url)"
                class="tag is-danger is-light"
              >
                <b-tooltip :label="parseAdvancedEnd(props.row.url)">
                  {{ parseAdvanced(parseUrl(props.row.url)) }}
                </b-tooltip>
              </span>
            </a>
          </router-link>
        </b-table-column>
        <b-table-column
          data-testid="dateButton"
          field="date"
          label="Date"
          sortable
          v-slot="props"
        >
          <span class="tag is-info">
            {{ props.row.date }}
          </span>
        </b-table-column>
      </b-table>
    </nav>
  </section>
</template>

<script>
export default {
  data() {
    return {
      searches: [],
      isNotEmpty: false,
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: "bottom",
      defaultSortDirection: "asc",
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      currentPage: 1,
      perPage: 5,
      isBordered: true,
      isHoverable: true,
      isNarrowed: true,
    };
  },
  beforeMount() {
    this.searches = JSON.parse(localStorage.getItem("searches"));
    if (this.searches != null) {
      this.isNotEmpty = true;
    }
  },
  methods: {
    parseAdvanced: function (url) {
      var splitUrl = url.split("&");
      return (
        splitUrl[0] +
        "&" +
        splitUrl[1] +
        "&" +
        splitUrl[2] +
        "&" +
        splitUrl[3] +
        "&" +
        splitUrl[4] +
        "&" +
        splitUrl[5] +
        "&" +
        splitUrl[6]
      );
    },
    parseAdvancedEnd: function (url) {
      var splitUrl = url.split("&");
      var end = "";
      for (let index = 6; index <= splitUrl.length; index++) {
        end += splitUrl[index];
      }
      return end;
    },
    parseUrl: function (url) {
      var splitUrl = url.split("/");
      return splitUrl[3];
    },
    urlIsBasic: function (url) {
      if (url.includes("basic")) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
