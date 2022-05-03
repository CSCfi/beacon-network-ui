<template>
  <section>
    <div v-if="dataset != 'Unable to connect' && dataset != 'No datasets'">
      <b-table
        :data="dataset"
        :striped="true"
        ref="table"
        class="column details-table"
        detailed
        :hover="true"
        @details-open="(row) => $buefy.toast.open(`Expanded ${row.id}`)"
      >
        <b-table-column field="name" label="Dataset" v-slot="props">
          {{ props.row.name }}
        </b-table-column>
        <b-table-column field="id" label="Dataset id" v-slot="props">
          {{ props.row.id }}
        </b-table-column>

        <template #detail="props">
          <article class="media">
            <figure class="media-left"></figure>
            <div class="media-content">
              <div
                class="content"
                v-for="(row, index) in props.row"
                v-bind:key="index"
              >
                <b>{{ index }}:</b>
                {{ row }}
              </div>
            </div>
          </article>
        </template>
      </b-table>
    </div>
    <div v-else>
      <article class="media">
        <figure class="media-left"></figure>
        <div class="media-content">{{ dataset[0] }}</div>
      </article>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  props: ["dataset"],
  methods: {},
};
</script>
