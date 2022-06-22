<template>
  <b-dropdown>
    <template #trigger="{ active }">
      <b-button
        size="is-medium"
        type="is-secondary"
        :icon-right="active ? 'menu-up' : 'menu-down'"
      >
        <p v-if="ageOpt.length == 0">Select</p>
        <p v-else>{{ ageOpt[0] }}</p>
      </b-button>
    </template>
    <b-dropdown-item aria-role="list-item" :focusable="false" custom>
      <div class="modal-card" style="width: 265px">
        <section class="modal-card-body">
          <b-switch v-model="toggleAgeLess" @input="toggleSwitch('less')"
            >Age less than
          </b-switch>
          <b-button v-if="ageLess == 0" disabled size="is-small">-</b-button>
          <b-button v-if="ageLess > 0" @click="ageLess--" size="is-small"
            >-</b-button
          >
          {{ ageLess }}
          <b-button v-if="toggleAgeLess" @click="ageLess++" size="is-small"
            >+</b-button
          >
          <b-button v-else @click="ageLess++" size="is-small" disabled
            >+</b-button
          >
        </section>
        <section class="modal-card-body">
          <b-switch v-model="toggleAgeMore" @input="toggleSwitch('more')"
            >Age more than
          </b-switch>
          <b-button v-if="ageMore == 0" disabled size="is-small">-</b-button>
          <b-button v-if="ageMore > 0" @click="ageMore--" size="is-small"
            >-</b-button
          >
          {{ ageMore }}
          <b-button v-if="toggleAgeMore" @click="ageMore++" size="is-small"
            >+</b-button
          >
          <b-button v-else @click="ageMore++" size="is-small" disabled
            >+</b-button
          >
        </section>
        <section class="modal-card-body">
          <div>
            <b-switch
              v-model="toggleAgeBetween"
              @input="toggleSwitch('between')"
              >Age between
            </b-switch>
            <div style="padding-top: 20px">
              <b-button v-if="ageFrom == 0" disabled size="is-small"
                >-</b-button
              >
              <b-button v-if="ageFrom > 0" @click="ageFrom--" size="is-small"
                >-</b-button
              >
              {{ ageFrom }}
              <b-button
                v-if="toggleAgeBetween"
                size="is-small"
                @click="ageFrom++"
                >+</b-button
              >
              <b-button v-else disabled size="is-small" @click="ageFrom++"
                >+</b-button
              >
              to
              <b-button v-if="ageTo == 0" disabled size="is-small">-</b-button>
              <b-button v-if="ageTo > 0" @click="ageTo--" size="is-small"
                >-</b-button
              >
              {{ ageTo }}
              <b-button v-if="toggleAgeBetween" @click="ageTo++" size="is-small"
                >+</b-button
              >
              <b-button v-else @click="ageTo++" size="is-small" disabled
                >+</b-button
              >
              <p v-if="ageFrom >= ageTo">
                Starting age needs to be less than equal
              </p>
            </div>
          </div>
        </section>

        <footer class="modal-card-foot">
          <b-button label="Clear" type="is-secondary" @click="clearAgeForm" />
          <b-button label="Save" type="is-primary" @click="saveForm" />
        </footer>
      </div>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  props: {
    ageOptions: Array,
  },
  data() {
    return {
      ageOpt: this.ageOptions,
      ageLess: 0,
      ageMore: 0,
      ageFrom: 0,
      ageTo: 0,
      toggleAgeLess: false,
      toggleAgeMore: false,
      toggleAgeBetween: false,
      open: false,
    };
  },
  methods: {
    saveForm: function () {
      if (this.toggleAgeLess) {
        this.ageOpt = [];
        this.ageOpt.push("Less than " + this.ageLess);
        this.$emit("updateageOpt", this.ageOpt);
      } else if (this.toggleAgeMore) {
        this.ageOpt = [];
        this.ageOpt.push("More than " + this.ageMore);
        this.$emit("updateageOpt", this.ageOpt);
      } else if (this.toggleAgeBetween) {
        if (this.ageFrom < this.ageTo) {
          this.ageOpt = [];
          this.ageOpt.push("Age between " + this.ageFrom + " - " + this.ageTo);
          this.$emit("updateageOpt", this.ageOpt);
        }
      } else {
        this.ageOpt = [];
        this.$emit("updateageOpt", this.ageOpt);
      }
    },
    clearAgeForm: function () {
      this.open = false;
      this.ageOpt = [];
      this.ageFrom = 0;
      this.ageLess = 0;
      this.ageMore = 0;
      this.ageTo = 0;
      this.toggleAgeLess = false;
      this.toggleAgeMore = false;
      this.toggleAgeBetween = false;
    },
    toggleSwitch: function (toggle) {
      if (toggle == "less") {
        this.toggleAgeMore = false;
        this.toggleAgeBetween = false;

        this.ageLess = 0;
        this.ageMore = 0;
        this.ageTo = 0;
        this.ageFrom = 0;
      } else if (toggle == "more") {
        this.toggleAgeLess = false;
        this.toggleAgeBetween = false;

        this.ageLess = 0;
        this.ageMore = 0;
        this.ageTo = 0;
        this.ageFrom = 0;
      } else if (toggle == "between") {
        this.toggleAgeLess = false;
        this.toggleAgeMore = false;

        this.ageLess = 0;
        this.ageMore = 0;
        this.ageTo = 0;
        this.ageFrom = 0;
      }
    },
  },
  beforeMount() {},
};
</script>

<style></style>
